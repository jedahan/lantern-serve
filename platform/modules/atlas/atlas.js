"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;

class Atlas extends LV.EventEmitter {
    
    constructor() {
        super();
        this.map = null;
        this.center = null;
        this.user_location = null;
        this.markers = {
        }
        this.precision = {
            user_max: 4,
            center_max: 10
        };
        this.tile_uri = ["https://maps.tilehosting.com/c/" , LC.maptiler.id, "/styles/", 
                LC.maptiler.map, "/{z}/{x}/{y}.png?key=", LC.maptiler.key
            ].join("");
        this.tile_db = new LV.PouchDB(LC.leaflet_tiles.dbName, {auto_compaction: true});
        this.user_db = new LV.PouchDB("lx-user", {auto_compaction: true});
        this.render();
    }

    render() {
        this.setupMap();

        // find current map cache size...
        this.tile_db.info().then((result) => {
            console.log(`${this.log_prefix} cached tiles: ${result.doc_count}`);
        });
        this.setViewFromCenterLocationCache();
        // map event for when location is found...
        this.map.on("locationfound", this.cacheUserLocation.bind(this));

        // map event for when location changes...
        this.map.on("dragend", (e) => {
            this.calculateZoomClass();
            this.cacheCenterLocation(e);
        });

        this.map.on("zoomend", (e) => {
            this.calculateZoomClass();
            this.cacheCenterLocation(e);
        });
    }


    get log_prefix() {
        return "[atlas]".padEnd(20, " ");
    }


    //------------------------------------------------------------------------
    setupMap() {

        // bind dom element for leaflet
        this.map = L.map("map", LC.leaflet_map);

        // layer in hosted map tiles
        L.tileLayer(this.tile_uri, LC.leaflet_tiles).addTo(this.map);


        // stop map from going off-world
        var sw = L.latLng(-89.98155760646617, -180),
        ne = L.latLng(89.99346179538875, 180);
        var bounds = L.latLngBounds(sw, ne);
        this.map.setMaxBounds(bounds);
        this.map.on('drag', function() {
            this.map.panInsideBounds(bounds, { animate: false });
        }.bind(this));

    }

    centerMap(e) {
        this.map.flyTo(e.latlng, Math.limit(this.map.getZoom()+2, 1, LC.leaflet_map.maxZoom), {
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
        let new_geo = LX.Location.toGeohash(e.latlng, this.precision.user_max);
        if (new_geo != this.user_location) {
            this.user_location = new_geo;
            console.log(`${log_prefix} New user location found: ${this.user_location}`);    
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
        let precision = Math.round(this.precision.center_max * (doc.zoom/20))
        let gh = LX.Location.toGeohash(doc, precision);
        //console.log(`${this.log_prefix} center geohash: ${gh}`);
        this.center = gh;

        // only save to database if user has paused on this map for a few seconds
        setTimeout(() => {
            if (this.map.getZoom() == doc.zoom 
                && this.map.getCenter().lat == doc.lat
                && this.map.getCenter().lng == doc.lng
                ) {   
                this.user_db.get("atlas_view").then((old_doc) => {

                    if (JSON.stringify(doc) == JSON.stringify(old_doc)) {
                        // skip save for same location
                    }
                    else {
                        this.user_db.remove(old_doc).then(() => {
                            this.user_db.put(doc).then(() => {
                                console.log(`${this.log_prefix} re-saved center for user`, this.center);
                            });
                        });   
                    }
                })
                .catch((e) => {
                    this.user_db.put(doc).then(() => {
                        console.log(`${this.log_prefix} saved center for user`, this.center);
                    });
                });
            }
        }, 10000);
    }

    setViewFromCenterLocationCache() {
        this.user_db.get("atlas_view").then((doc) => {
            this.map.setView([doc.lat, doc.lng], doc.zoom-2);
        }).catch((e) => {
            this.map.setView([38.42, -12.79], 3);
            // fine if we don't have context or can't retrieve...
        });
    }



    //------------------------------------------------------------------------
    addToMap(marker) {
        if (this.markers[marker.id]) {
            console.log(`${this.log_prefix} ${marker.id} already added to map. skipping...`);
            return;
        }

        marker.layer.addTo(this.map);
        this.markers[marker.id] = marker;
        marker.layer.on("click", (e) => {
            this.emit("marker-click", marker);
        });
        this.emit("marker-add", marker);
    }

    removeFromMap(marker) {
        marker.layer.remove();
        this.markers[marker.id] = null;
        this.emit("marker-remove", marker);
    }

    getMarkerCount() {
        let count = 0;
        Object.keys(this.markers).forEach(id => {
            if (this.markers[id] !== null) count++;
        });
        return count;
    }

    fitMapToAllMarkers() {
        let all_layers = [];

        Object.keys(this.markers).forEach((key) => {
            let marker = this.markers[key];
            // markers can include null objects from past deleted markers, so ignore those...
            if (marker !== null && marker.hasOwnProperty("layer")) {            
                let layer = marker.layer;
                all_layers.push(layer);
            }
        });

        if (all_layers.length) {
            let group = new L.featureGroup(all_layers);
            this.map.fitBounds(group.getBounds());
        }
    }


   
};

LX.Atlas = new Atlas();