"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;

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
        this.map = L.map("map", LC.leaflet_map);

        // setup collections for markers to control layering 
        let collections = ["private", "shared"];
        collections.forEach((item) => {
            this.markers[item] = new LX.MarkerCollection(item, this.map);
        });

        // layer in hosted map tiles
        L.tileLayer(this.tile_uri, LC.leaflet_tiles).addTo(this.map);
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

    loadOneSharedMarker(db, data, id) {
        // this runs continuously and for every update to the node
        if (!data) {
            // item was most likely deleted
            if (db.objects.hasOwnProperty(id) && db.objects[id]) {
                console.log("[Atlas] Requesting Marker Remove,", id);
                db.objects[id].hide();
                db.unlink(db.objects[id]);
            }
            return;
        }

        if (data.g && data.t) {
            // do we have the marker already?
            let marker = new LX.Marker(id);
            marker.importWithData(data);

            if (db.objects.hasOwnProperty(id)) {
                // allow geohash updates
                if (db.objects[id].geohash != marker.geohash) {

                    db.objects[id].geohash = marker.geohash;
                    console.log("[Atlas] Updating geohash for marker:", marker.id);
                    return;
                }
                else {

                    console.log("[Atlas] Known marker at location. Skipping...", marker);
                    return;
                }
            }
            else {
                db.link(marker);
                // this is a valid marker we can potentially display
                this.markers.shared.add(marker);
            }
            
        }
    }

    loadSharedMarkers(db) {
        db.get("marker").map()
            .on((data,id) => {
                this.loadOneSharedMarker(db,data,id);
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