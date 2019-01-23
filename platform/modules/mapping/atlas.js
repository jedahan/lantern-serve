LX.Atlas = class Atlas extends LV.EventEmitter {
    
    constructor(use_cloud) {
        super();
        this.map = null; // leaflet map
        this.pointer = null; // leaflet location pointer
        this.center = null;
        this.user_location = null;
        this.markers = {
        }
        this.precision = {
            user_max: 4,
            center_max: 10
        };

        this.setTileHost(use_cloud);
        this._map_clicked = 0; // used to distinguish between click and double-click

    }


    setTileHost (use_cloud) {
        let uri_parts = window.location.href.split('/').slice(0, 3);

        if (use_cloud) {            
            uri_parts[2] = "{s}.tile.lantern.link";
        }

        this.tile_host = uri_parts.join("/");
        this.tile_uri = [this.tile_host +"/c/", LC.maptiler.id, "/styles/", 
                LC.maptiler.map, "/{z}/{x}/{y}.png?key=", LC.maptiler.key
            ].join("");
    }

    render() { 

        this.setupMap();
        this.setViewFromCenterLocationCache();

        // map event for when location is found...
        this.map.on("locationfound", this.cacheUserLocation.bind(this));

        // map event for when location changes...
        this.map.on("dragend", (e) => {
            this.calculateZoomClass();
            this.cacheCenterLocation();
        });

        this.map.on("zoomend", (e) => {
            this.calculateZoomClass();
            this.cacheCenterLocation();
        });

        this.map.on('click', (e) => {
            this.emit("map-click-start", e);
            this._map_clicked+=1;
            setTimeout(() => {
                if (this._map_clicked == 1) {
                    this._map_clicked = 0;
                    this.emit("map-click", e);
                }
            }, 250);
        });

        this.map.on("dblclick", (e) => {
            this._map_clicked = 0;
            this.emit("map-double-click", e);
        });
        this.calculateZoomClass();
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

    /**
    * Fly in while zooming
    */
    zoomToPoint(latlng) {
        this.map.flyTo(latlng, Math.limit(this.map.getZoom()+2, 1, LC.leaflet_map.maxZoom), {
            pan: {
                animate: true,
                duration: 1.5
            },
            zoom: {
                animate: true
            }
        });


        this.map.once("moveend", () => {
            this.removePointer();
        });
        
    }

    /**
    * Assign a semantic value we can use for styling similar to mobile breakpoints
    */
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

    /**
    * Preserves user geolocation in-memory for future use
    */
    cacheUserLocation(e) {
        let new_geo = LX.Location.toGeohash(e.latlng, this.precision.user_max);
        if (new_geo != this.user_location) {
            this.user_location = new_geo;
            console.log(`${log_prefix} New user location found: ${this.user_location}`);    
        }
    }


    getCenterAsString() {
        return [this.map.getCenter().lat, this.map.getCenter().lng, this.map.getZoom()].join("/");
    }


    /**
    * Preserves center map location with browser-based storage
    */
    cacheCenterLocation(timeout) {

        return new Promise((resolve, reject) => {

            let orig_ctr = this.getCenterAsString();
            // http://www.bigfastblog.com/geohash-intro
            let precision = Math.round(this.precision.center_max * (this.map.getZoom()/20))
            let gh = LX.Location.toGeohash(this.map.getCenter(), precision);
            //console.log(`${this.log_prefix} center geohash: ${gh}`);
            this.center = gh;
            // only save to database if user has paused on this map for a few seconds
            setTimeout(() => {
                let new_ctr = this.getCenterAsString();
                if (orig_ctr == new_ctr) {
                    localStorage.setItem("lx-ctr", new_ctr);
                }
            }, timeout || 7000);
        })
    }

    /**
    * Use saved per-user location to center map
    */
    setViewFromCenterLocationCache() {
        let ctr = localStorage.getItem("lx-ctr");
        try {
            let parts = ctr.split("/");
            this.map.setView([parts[0], parts[1]], parts[2]);
        }
        catch(e) {
            this.map.setView([38.42, -12.79], 3);
            // fine if we don't have context or can't retrieve...
            // if we have markers, let's now zoom in on these...
            if (this.markers.length) {
                this.fitMapToAllMarkers();
            }
        }
    }



    //------------------------------------------------------------------------
    /**
    * Add marker to map
    */
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

    /**
    * Remove marker from map
    */
    removeFromMap(marker) {
        marker.layer.remove();
        this.markers[marker.id] = null;
        this.emit("marker-remove", marker);
    }


    /**
    * Add small dot based on cursor or tap position
    */
    addPointer(latlng) {
        if (this.pointer) return;
        this.pointer = L.circle(latlng, {radius: 1}).addTo(this.map);
        this.emit("pointer-add", {"latlng":latlng});
    }

    /**
    * Remove small dot
    */
    removePointer() {
        if (!this.pointer) return;
        this.pointer.remove();
        this.pointer = null;;
        this.emit("pointer-remove");
    }


    /**
    * Gets count of total number of markers on the map
    */
    getMarkerCount() {
        let count = 0;
        Object.keys(this.markers).forEach(id => {
            if (this.markers[id] !== null) count++;
        });
        return count;
    }

    /**
    * Looks for all markers on map and adjusts view so all are visible
    */
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

    /**
    * Ensures map target is not too close to edge of screen
    */
    moveFromEdge(latlng) {
        let map = this.map;
        let margin = 90;

        return new Promise((resolve, reject) => {
            // are we too close to the edge for our menu?
            let pos = map.latLngToContainerPoint(latlng);
            let dimensions = document.getElementById("map").getBoundingClientRect()
            let center_point = map.getSize().divideBy(2);

            if (pos.x < margin || pos.x > dimensions.width-margin) {
                let direction = (pos.x < margin ? "subtract" : "add");
                let target_point = center_point[direction]([margin, 0]);
                let target_latlng = map.containerPointToLatLng(target_point);
                map.panTo(target_latlng);
                map.once("moveend", () => {
                    resolve(latlng);
                });
            } 
            else if (pos.y < margin || pos.y > dimensions.height-margin) {
                let direction = (pos.y < margin ? "subtract" : "add");
                let target_point = center_point[direction]([0,margin]);
                let target_latlng = map.containerPointToLatLng(target_point);
                map.panTo(target_latlng);
                map.once("moveend", () => {
                    resolve(latlng);
                });
            } 
            else {
                resolve(latlng);
            }
        });
    }    

};