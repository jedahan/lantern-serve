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
require("leaflet-contextmenu");



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
        this.setupControls();
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


        let opts = {
            contextmenuItems: [
            {
                text: 'Add marker',
                callback: this.addMarkerToMap.bind(this)
            }, 
            {
                text: 'Center map here',
                callback: this.centerMap.bind(this)
            }, {
                text: 'Inspect area',
                callback: this.inspectArea.bind(this)
            }, '-', {
                text: 'Zoom in',
                iconCls: 'fa fa-search-plus',
                callback: this.zoomIn.bind(this)
            }, {
                text: 'Zoom out',
                iconCls: 'fa fa-search-minus',
                callback: this.zoomOut.bind(this)
            }]
        }

        this.map = L.map("map", Object.assign(opts, LX.Config.leaflet_map));

        this.markers.private = new LX.MarkerCollection("private", this.map);
        this.markers.shared = new LX.MarkerCollection("shared", this.map);

        // layer in hosted map tiles
        L.tileLayer(this.tile_uri, LX.Config.leaflet_tiles).addTo(this.map);
    }

    setupControls() {
        // add locate control
        L.control.locate(LX.Config.leaflet_locatecontrol).addTo(this.map);

        // create custom zoom icons
        let zoom_in = document.getElementsByClassName("leaflet-control-zoom-in")[0];
        let elem = document.createElement('span');
        elem.className = "fa fa-plus";
        zoom_in.innerHTML = "";
        zoom_in.appendChild(elem);


        let zoom_out = document.getElementsByClassName("leaflet-control-zoom-out")[0];
        let elem2 = document.createElement('span');
        elem2.className = "fa fa-minus";
        zoom_out.innerHTML = "";
        zoom_out.appendChild(elem2);

        this.map.zoomControl.setPosition("bottomright");
    }

    calculateZoomClass() {
        let distance = "close";
        let zoom = this.map.getZoom();

        // map scale breakpoints
        if (zoom < 6) {
            distance = "very-far";
        }
        else if (zoom < 7) {
            distance = "far";
        }
        else if (zoom < 12) {
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
                            console.log("[Atlas] Re-saved map view:", [doc.lat, doc.lng], doc.zoom);
                        });
                    });
                })
                .catch((e) => {
                    this.user_db.put(doc).then(() => {
                        console.log("[Atlas] Saved map view:", [doc.lat, doc.lng], doc.zoom);
                    });
                });
            }
        }, 8000);
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
    inspectArea(e) {
        alert(e.latlng);
    }

    addMarkerToMap(e) {
        let marker = new LX.Marker();
        marker.geohash = LV.Geohash.encode(e.latlng.lat, e.latlng.lng);
        // keep all user-created markers in a collection of temporary items
        // not saved to database yet
        this.markers.private.once("add", () => { 
            this.markers.private.once("add", (new_marker) => {
                if (marker.mode == "draft") {
                    // we never did anything with first marker, so get rid of it...
                    marker.hide();
                }
            });
        });

        this.markers.private.add(marker);

    }

    centerMap(e) {
        this.map.flyTo(e.latlng, this.map.getZoom()+1, {
            pan: {
                animate: true,
                duration: 1.5
            },
            zoom: {
                animate: true
            }
        });
    }

    zoomIn(e) {
        this.map.zoomIn();
    }

    zoomOut(e){
        this.map.zoomOut();
    }
    
    //------------------------------------------------------------------------
   loadSharedMarkers(db) {
        db.get("marker").map().on((data,id) => {

            if (!data) {
                // item was most likely deleted
                if (db.objects.hasOwnProperty(id) && db.objects[id]) {
                    console.log(`[${this.id}] Marker removed from elsewhere`);
                    db.objects[id].remove(db);     
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

        // create a seperate layer group for each set for full display control
        sets.forEach((set_id) => {
            this.sets[set_id] = L.layerGroup();
        });
    }



    //------------------------------------------------------------------------
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
        let layer_group = this.sets[set || "default"];
        layer_group.addLayer(marker.layer).addTo(this.map);

        marker.collection = this;
        marker.set = layer_group;
        this.emit("add", marker, this);

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
            "tags": ["t", []]
        });

        this.icon = null;
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

            this.layer.on("click", () => {
                console.log(`${this.log_prefix} Clicked:`, this);
            });

            this.layer.on("dragend", (e) => {
                let latlng = e.target._latlng;
                this.geohash = LV.Geohash.encode(latlng.lat, latlng.lng); 
                console.log(`${this.log_prefix} Dragged to: `,  this.geohash);
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
        if (this.icon) {
            cls += " fa-"+this.icon;
        }
        return L.divIcon({
            html: `<i class="${cls}"></i>`,
            className: `lx-marker lx-marker-${this.mode} ${this.tags.join(" ")}`
        });
    }
    
    setIcon(value) {
        if (!value) return;
        //console.log(`${this.log_prefix} icon = ${value}`);
        this.icon = value;
        this.layer.setIcon(this.getDivIcon());
    }
}
