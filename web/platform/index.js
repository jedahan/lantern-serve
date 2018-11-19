"use strict";
const LX = window.LX || {}; if (!window.LX) window.LX = LX;


//----------------------------------------------------------------------------
LX.Config = (() => {
    let self = {};

    self.leaflet = {
        attribution: false,
        dbName: "lx-tiles",
        maxZoom: 16,
        useCache:  true,
        useOnlyCache: false,
        cacheMaxAge: 365*24*3600*1000,
        crossOrigin: true
    };

    self.locatecontrol = {
        returnToPreviousBounds: true,
        cacheLocation: true,
        showCompass: true,
        flyTo: false,
        setView: "untilPanOrZoom",
        position: "bottomright"
    }

    self.maptiler = {
        id: "ade1b05a-496f-40d1-ae23-5d5aeca37da2",
        key: "ZokpyarACItmA6NqGNhr",
        map: "streets"
    };

    return self;
})();



//----------------------------------------------------------------------------
LX.Atlas = (() => {
    
    let self = {};
    var last_geo;


    //------------------------------------------------------------------------
    // bind dom element for leaflet
    self.map = L.map("map");
    self.map.zoomControl.setPosition("bottomright");

    // layer in hosted map tiles
    const tile_uri = [
            "https://maps.tilehosting.com/c/" , LX.Config.maptiler.id, "/styles/", 
            LX.Config.maptiler.map, "/{z}/{x}/{y}.png?key=", LX.Config.maptiler.key
        ].join("");
    L.tileLayer(tile_uri, LX.Config.leaflet).addTo(self.map);
        
    // add locate control
    L.control.locate(LX.Config.locatecontrol).addTo(self.map);



    //------------------------------------------------------------------------
    // find current map cache size...
    const tile_db = new LX.Vendor.PouchDB(LX.Config.leaflet.dbName, {auto_compaction: true});
    tile_db.info().then((result) => {
        console.log("[Atlas] Cached map tiles: " + result.doc_count);
    });


    const user_db = new LX.Vendor.PouchDB("lx-user", {auto_compaction: true});
    user_db.get("atlas_view").then((doc) => {
        console.log("[Atlas] Saved map view:", doc);
        self.map.setView([doc.lat, doc.lng], doc.zoom);
    }).catch((e) => {
        self.map.setView([38.42, -12.79], 3);
        // fine if we don't have context or can't retrieve...
    });




    //------------------------------------------------------------------------
    // map event for when location is found...
    self.map.on("locationfound", (e) => {
        let new_geo = self.toGeohash(e.latlng);
        if (new_geo != last_geo) {
            last_geo = new_geo;
            console.log("[Atlas] New user location found", e, last_geo);            
        }
    });

    // map event for when location changes...
    self.map.on("moveend", (e) => {
        let doc = {
            "_id": "atlas_view",
            "lat": self.map.getCenter().lat,
            "lng": self.map.getCenter().lng,
            "zoom": self.map.getZoom()
        }
        user_db.get("atlas_view").then((old_doc) => {
            user_db.remove(old_doc).then(() => {
                user_db.put(doc);
            });
        })
        .catch((e) => {
            user_db.put(doc);
        });
    })





    //------------------------------------------------------------------------
    /** 
    * Attempt to reduce any type of location into a geohash for storage and processing
    */
    self.toGeohash = (input) => {
        if (typeof(input) == "string") {
            try {
                LX.Vendor.Geohash.decode(input);
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
                    return LX.Vendor.Geohash.encode(input.coords.latitude, input.coords.longitude);
                }
                else if (input.hasOwnProperty("lat") && input.hasOwnProperty("lng")) {
                    return LX.Vendor.Geohash.encode(input.lat, input.lng);
                }
                else {
                    return LX.Vendor.Geohash.encode(input);
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
    self.distanceInKm = (a, b) => {
        let geo_a = self.toGeohash(a);
        let geo_b = self.toGeohash(b); 
        if (geo_a && geo_b) {
            return LX.Vendor.GeohashDistance.inKm(geo_a,geo_b);
        }
    }
    
    /**
    * Calculation distance between two geolocations in miles
    */
    self.distanceInMiles = (a, b) => {
        let geo_a = self.toGeohash(a);
        let geo_b = self.toGeohash(b);
        if (geo_a && geo_b) {
            return LX.Vendor.GeohashDistance.inMiles(geo_a,geo_b);
        }
    }

    return self;
})();


//----------------------------------------------------------------------------