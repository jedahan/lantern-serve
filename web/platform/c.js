"use strict";

/***
* MAPS & MARKERS
*
* Enables map-based interactions and display
* for use with all dev-defined apps. 
*/

const LX = window.LX || {}; if (!window.LX) window.LX = LX;
const LV = window.LV || {}; if (!window.LV) window.LV = LV;



//----------------------------------------------------------------------------
LV.Geohash = require("latlon-geohash");
require('geohash-distance');
require("leaflet");
require("leaflet.locatecontrol");



//----------------------------------------------------------------------------
LX.Atlas = class Atlas extends LV.EventEmitter {
    
    constructor() {
        super();
        this.map = null;
        this.center = null;
        this.user = null;
        this.markers = {
        }
        this.precision = {
            user_max: 4,
            center_max: 8
        };
        this.tile_uri = ["https://maps.tilehosting.com/c/" , LX.Config.maptiler.id, "/styles/", 
                LX.Config.maptiler.map, "/{z}/{x}/{y}.png?key=", LX.Config.maptiler.key
            ].join("");
        this.tile_db = new LV.PouchDB(LX.Config.leaflet_tiles.dbName, {auto_compaction: true});
        this.user_db = new LV.PouchDB("lx-user", {auto_compaction: true});
        this.render();
    }

    render() {
        this.setupMap();

        // find current map cache size...
        this.tile_db.info().then((result) => {
            console.log("[Atlas] Cached map tiles: " + result.doc_count);
        });
        this.setViewFromCenterLocationCache();
        // map event for when location is found...
        this.map.on("locationfound", this.cacheUserLocation.bind(this));
        // map event for when location changes...
        this.map.on("moveend", (e) => {
            this.calculateZoomClass();
            this.cacheCenterLocation(e);
        });
    }



    //------------------------------------------------------------------------
    setupMap() {

        // bind dom element for leaflet
        this.map = L.map("map", LX.Config.leaflet_map);

        // setup collections for markers to control layering 
        let collections = ["private", "shared"];
        collections.forEach((item) => {
            this.markers[item] = new LX.MarkerCollection(item, this.map);
        });

        // layer in hosted map tiles
        L.tileLayer(this.tile_uri, LX.Config.leaflet_tiles).addTo(this.map);
    }

    centerMap(e) {
        this.map.flyTo(e.latlng, Math.limit(this.map.getZoom()+2, 1, LX.Config.leaflet_map.maxZoom), {
            pan: {
                animate: true,
                duration: 1.5
            },
            zoom: {
                animate: true
            }
        });
    }


    calculateZoomClass() {
        let distance = "close";
        let zoom = this.map.getZoom();

        // map scale breakpoints
        if (zoom < 6) {
            distance = "very-far";
        }
        else if (zoom < 8) {
            distance = "far";
        }
        else if (zoom < 10) {
            distance = "somewhat-far";
        }
        else if (zoom < 14) {
            distance = "normal";
        }
        else if (zoom < 16) {
            distance = "somewhat-close";
        }
        else if (zoom < 18) {
            distance = "close";
        }
        else if (zoom >= 18) {
            distance = "very-close";
        }
        document.body.className=`lx-map-zoom-${distance}`;
        return distance;
    }



    //------------------------------------------------------------------------
    cacheUserLocation(e) {
        let new_geo = this.toGeohash(e.latlng, this.precision.user_max);
        if (new_geo != this.user) {
            this.user = new_geo;
            console.log("[Atlas] New user location found:", this.user);    
        }
    }


    cacheCenterLocation(e) {
        let doc = {
            "_id": "atlas_view",
            "lat": this.map.getCenter().lat,
            "lng": this.map.getCenter().lng,
            "zoom": this.map.getZoom()
        }

        // http://www.bigfastblog.com/geohash-intro
        let precision = Math.round(this.precision.center_max * (doc.zoom/22))
        let gh = this.toGeohash(doc, precision);
        //console.log("[Atlas] Center point geohash: " + gh );
        this.center = gh;

        // only save to database if user has paused on this map for a few seconds
        setTimeout(() => {
            if (this.map.getZoom() == doc.zoom 
                && this.map.getCenter().lat == doc.lat
                && this.map.getCenter().lng == doc.lng
                ) {   
                this.user_db.get("atlas_view").then((old_doc) => {
                    this.user_db.remove(old_doc).then(() => {
                        this.user_db.put(doc).then(() => {
                            //console.log("[Atlas] Re-saved map view:", [doc.lat, doc.lng], doc.zoom);
                        });
                    });
                })
                .catch((e) => {
                    this.user_db.put(doc).then(() => {
                        //console.log("[Atlas] Saved map view:", [doc.lat, doc.lng], doc.zoom);
                    });
                });
            }
        }, 4000);
    }

    setViewFromCenterLocationCache() {
        this.user_db.get("atlas_view").then((doc) => {
            this.map.setView([doc.lat, doc.lng], doc.zoom);
        }).catch((e) => {
            this.map.setView([38.42, -12.79], 3);
            // fine if we don't have context or can't retrieve...
        });
    }



    //------------------------------------------------------------------------
   loadSharedMarkers(db) {

        db.get("marker").map()
            .on((data,id) => {

                // this runs continuously and for every update to the node


                if (!data) {
                    // item was most likely deleted
                    if (db.objects.hasOwnProperty(id) && db.objects[id]) {
                        db.objects[id].remove(db);     
                        db.objects[id] = null;
                    }
                    return;
                }

                if (data.g && data.t) {
                    let marker = new LX.Marker(id);
                    marker.importWithData(data);
                    db.link(marker);
                    // this is a valid marker we can potentially display
                    this.markers.shared.add(marker);
                }
            });
    }



    //------------------------------------------------------------------------
    getMarkerCount() {
        let tally = 0;
        for (var idx in this.markers) {
            var collection = this.markers[idx];
            tally += collection.getTotalSize();
        }
        return tally;
    }

    fitMapToAllMarkers() {
        let all_layers = [];
        for (var idx in this.markers) {
            var collection = this.markers[idx];
            let layers = collection.getAllLayers();
            layers.forEach((layer) => {
                all_layers.push(layer);
            });
        }
        if (all_layers.length) {
            let group = new L.featureGroup(all_layers);
            this.map.fitBounds(group.getBounds());
        }
    }


    //------------------------------------------------------------------------
    /** 
    * Attempt to reduce any type of location into a geohash for storage and processing
    */
    toGeohash(input, precision) {
        precision = precision || 8;
        if (typeof(input) == "string") {
            try {
                LV.Geohash.decode(input);
                return input;
            }
            catch(e) {
                console.log(e);
                console.log("[Atlas] Sanitize failed for geolocation string", input);
            }
        }
        else if (typeof(input) == "object") {
            try {
                if (input.hasOwnProperty("coords")) {
                    return LV.Geohash.encode(input.coords.latitude, input.coords.longitude);
                }
                else if (input.hasOwnProperty("lat") && input.hasOwnProperty("lng")) {
                    return LV.Geohash.encode(input.lat, input.lng, precision);
                }
                else {
                    return LV.Geohash.encode(input, precision);
                }
            }
            catch(e) {
                console.log("[Atlas] Sanitize failed for geolocation object", input);
            }
        }
    }


    /**
    * Calculation distance between two geolocations in kilometers
    */
    distanceInKm(a, b) {
        let geo_a = this.toGeohash(a);
        let geo_b = this.toGeohash(b); 
        if (geo_a && geo_b) {
            return LV.GeohashDistance.inKm(geo_a,geo_b);
        }
    }
    
    /**
    * Calculation distance between two geolocations in miles
    */
    distanceInMiles(a, b) {
        let geo_a = this.toGeohash(a);
        let geo_b = this.toGeohash(b);
        if (geo_a && geo_b) {
            return LV.GeohashDistance.inMiles(geo_a,geo_b);
        }
    }
}



//----------------------------------------------------------------------------
LX.MarkerCollection = class MarkerCollection extends LV.EventEmitter {

    constructor(id, map, sets) {
        super();
        sets = sets || ["default"];
        this.id = id;
        this.map = map;
        this.sets = {};
        this.markers = {};

        // create a seperate layer group for each set for full display control
        sets.forEach((set_id) => {
            this.sets[set_id] = L.layerGroup();
        });
    }



    //------------------------------------------------------------------------

    getOne(id) {
        return this.markers[id];
    }

    getAll() {
        let all = [];
        for (var idx in this.markers) {
            all.push(this.markers[idx]);
        }
        return all;
    }


    getOneLayer(id) {
        return this.markers[id].layer;
    }

    getAllLayers() {
        let all = [];
        for (var idx in this.markers) {
            all.push(this.markers[idx].layer);
        }
        return all;
    }

    getTotalSize() {
        let tally = 0;
        for (var set in this.sets) {
            let count = this.getSetSize(set);
            tally += count;                
        }
        return tally;
    }

    getSetSize(set_id) {
        set_id = set_id || "default";
        return this.sets[set_id].getLayers().length;
    }

    showSet(set_id) {
        set_id = set_id || "default";
        return this.map.addLayer(this.sets[set_id]);
    } 

    hideSet(set_id) {
        set_id = set_id || "default";
        return this.map.removeLayer(this.sets[set_id]);
    }   



    //------------------------------------------------------------------------

    add(marker, set, data, opts) {

        if (this.markers[marker.id]) {

            // allow geohash updates
            if (this.markers[marker.id].geohash != marker.geohash) {
                this.markers[marker.id].geohash = marker.geohash;
                //console.log("[Collection] Updating geohash for marker", marker);
                return;
            }
            else {
                //console.log("[Collection] Known marker at location. Skipping...", marker);
                return;
            }
        }

        this.markers[marker.id] = marker;

        let layer_group = this.sets[set || "default"];
        layer_group.addLayer(marker.layer).addTo(this.map);

        marker.collection = this;
        marker.set = layer_group;
        this.emit("add", marker, this);

        marker.layer.on("click", (ev) => {
            this.emit("click", marker);
        });

        marker.on("show", () => {
            this.emit("show", marker);
        });

        marker.on("hide", () => {
            this.emit("hide", marker);
        });

        marker.on("remove", () => {
            this.emit("remove", marker);
        });

        marker.show();

        return marker;
    };
}



//----------------------------------------------------------------------------
LX.Marker = class Marker extends LX.SharedObject {
    
    constructor(id) {

        // now set defaults for key compression
        super(id, {
           "geohash": ["g"],
            "tags": ["t", []],
            "owner": ["o"]
        });

        this._icon = null;
        this._collection = null;
        this._set = null;
        this._latlng = null;


        this.on("remove", () => {
            this.hide();
        });

        this.on("mode", (mode) => {
            if (this.layer) {
                // keep dom updated to reflect mode
                this.layer.setIcon(this.getDivIcon());

                // prevent dragging once item is saved
                //console.log(`${this.log_prefix} mode = `, mode);
            }
        });
    }



    //-------------------------------------------------------------------------
    /**
    * Defines geographic position on map
    *
    * Automatically create a new map layer if not already defined
    */
    set geohash(val) {
        if (val) {
            try {
                this._latlng = LV.Geohash.decode(val);

                if (this.layer) {
                    this.layer.setLatLng(this._latlng);
                }
                
                this._data.geohash = val;
                //console.log(`${this.log_prefix} location = ${this.geohash}`);
                this.show();
            }
            catch(e) {
                console.log(`${this.log_prefix} error with geohash`, e);
            }
        }
    }

    get geohash() {
        return this._data.geohash;
    }

 

    //-------------------------------------------------------------------------
    /**
    * Show on map
    */
    show() {
        if (!this.layer) {
            this.layer = L.marker(this._latlng, {
                icon: this.getDivIcon(),
                draggable: false,
                autoPan: true
            });

            this.layer.on("dragend", (e) => {
                let latlng = e.target._latlng;
                this.geohash = LV.Geohash.encode(latlng.lat, latlng.lng); 
                //console.log(`${this.log_prefix} Dragged to: `,  this.geohash);
            });
            this.emit("show", this);
        }
    }

    /**
    * Hide from the map without altering stored data
    */
    hide() {
        if (this.layer && this.layer._map) {
            this.layer.remove();
            this.emit("hide", this);            
        }
    }

    //-------------------------------------------------------------------------
    getDivIcon() {
        let cls = "fa";
        if (this._icon) {
            cls += " fa-"+this._icon;
        }
        return L.divIcon({
            html: `<i class="${cls}"></i>`,
            className: `lx-marker lx-marker-${this.mode} ${this.tags.join(" ")}`
        });
    }
    

    getIcon() {
        return this._icon;
    }

    setIcon(value) {
        if (!value) return;
        //console.log(`${this.log_prefix} icon = ${value}`);
        this._icon = value;
        this.layer.setIcon(this.getDivIcon());
    }



}
