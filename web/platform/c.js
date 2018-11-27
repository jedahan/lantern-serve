"use strict";
const LX = window.LX || {}; if (!window.LX) window.LX = LX;
const LV = window.LV || {}; if (!window.LV) window.LV = LV;



//----------------------------------------------------------------------------
const PouchDB = LV.PouchDB = require("pouchdb-browser");
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
                text: 'Create marker',
                callback: this.createMarker.bind(this)
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


        this.markers.usergen = new LX.MarkerCollection(this.map);

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
        if (zoom < 9) {
            distance = "very-far";
        }
        else if (zoom < 12) {
            distance = "far";
        }
        else if (zoom < 15) {
            distance = "normal";
        }
        else if (zoom > 17) {
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
        console.log("[Atlas] Center point geohash: " + gh );
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

    createMarker(e) {
        let marker = this.markers.usergen.add(e.latlng);
        this.emit("marker-add", marker);
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
LX.Marker = class Marker extends LV.EventEmitter {
    constructor(latlng, opts) {
        super();   
        opts = opts || {};

        this.icon = opts.icon || "info-circle";
        this.category = opts.category || "default";
        
        this.layer = L.marker(latlng, {
            icon: this.getDivIcon(),
            draggable: true,
            autoPan: true
        });


        this.data = {
        };
        this.geohash = LV.Geohash.encode(latlng.lat, latlng.lng); 
        console.log(`[Marker] Added at ${this.geohash}`);

        this.layer.on("click", () => {
            console.log("[Marker] Clicked:", this)
        });

        this.layer.on("dragend", (e) => {
            let latlng = e.target._latlng;
            this.geohash = LV.Geohash.encode(latlng.lat, latlng.lng); 
            console.log("[Marker] Dragged to: ",  this.geohash);
        })
    }

    getDivIcon() {
        return L.divIcon({
            html: `<i class="fa fa-${this.icon}"></i>`,
            className: "lx-marker lx-" + this.category
        })
    }
    
    setIcon(value) {
        this.icon = value;
        this.layer.setIcon(this.getDivIcon());
    }


    setCategory(category) {
        this.category = category;
    }

}

LX.MarkerCollection = class MarkerCollection extends LV.EventEmitter {

    constructor(map, sets) {
        super();
        sets = sets || ["default"];

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

    add(latlng, set, data, opts) {
        let marker = new LX.Marker(latlng);
        let layer_group = this.sets[set || "default"];
        layer_group.addLayer(marker.layer).addTo(this.map);
        return marker;
    };
}



//----------------------------------------------------------------------------
/*
Copyright (c) 2015 Iván Sánchez Ortega <ivan@mazemap.no>


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// https://github.com/nikolauskrismer/Leaflet.TileLayer.PouchDBCached/blob/master/L.TileLayer.PouchDBCached.js

L.TileLayer.addInitHook(function() {

    if (!this.options.useCache) {
        this._db     = null;
        this._canvas = null;
        return;
    }

    var dbName = this.options.dbName || 'offline-tiles';
    if (this.options.dbOptions) {
        this._db = new PouchDB(dbName, this.options.dbOptions);
    } else {
        this._db = new PouchDB(dbName);
    }
    this._canvas = document.createElement('canvas');

    if (!(this._canvas.getContext && this._canvas.getContext('2d'))) {
        // HTML5 canvas is needed to pack the tiles as base64 data. If
        //   the browser doesn't support canvas, the code will forcefully
        //   skip caching the tiles.
        this._canvas = null;
    }
});

// 🍂namespace TileLayer
// 🍂section PouchDB tile caching options
// 🍂option useCache: Boolean = false
// Whether to use a PouchDB cache on this tile layer, or not
L.TileLayer.prototype.options.useCache     = false;

// 🍂option saveToCache: Boolean = true
// When caching is enabled, whether to save new tiles to the cache or not
L.TileLayer.prototype.options.saveToCache  = true;

// 🍂option useOnlyCache: Boolean = false
// When caching is enabled, whether to request new tiles from the network or not
L.TileLayer.prototype.options.useOnlyCache = false;

// 🍂option useCache: String = 'image/png'
// The image format to be used when saving the tile images in the cache
L.TileLayer.prototype.options.cacheFormat = 'image/png';

// 🍂option cacheMaxAge: Number = 24*3600*1000
// Maximum age of the cache, in milliseconds
L.TileLayer.prototype.options.cacheMaxAge  = 24*3600*1000;


L.TileLayer.include({

    // Overwrites L.TileLayer.prototype.createTile
    createTile: function(coords, done) {
        var tile = document.createElement('img');

        tile.onerror = L.bind(this._tileOnError, this, done, tile);

        if (this.options.crossOrigin) {
            tile.crossOrigin = '';
        }

        /*
         Alt tag is *set to empty string to keep screen readers from reading URL and for compliance reasons
         http://www.w3.org/TR/WCAG20-TECHS/H67
         */
        tile.alt = '';

        var tileUrl = this.getTileUrl(coords);

        if (this.options.useCache && this._canvas) {
            this._db.get(tileUrl, {revs_info: true}, this._onCacheLookup(tile, tileUrl, done));
        } else {
            // Fall back to standard behaviour
            tile.onload = L.bind(this._tileOnLoad, this, done, tile);
        }

        tile.src = tileUrl;
        return tile;
    },

    // Returns a callback (closure over tile/key/originalSrc) to be run when the DB
    //   backend is finished with a fetch operation.
    _onCacheLookup: function(tile, tileUrl, done) {
        return function(err, data) {
            if (data) {
                this.fire('tilecachehit', {
                    tile: tile,
                    url: tileUrl
                });
                if (Date.now() > data.timestamp + this.options.cacheMaxAge && !this.options.useOnlyCache) {
                    // Tile is too old, try to refresh it
                    //console.log('Tile is too old: ', tileUrl);

                    if (this.options.saveToCache) {
                        tile.onload = L.bind(this._saveTile, this, tile, tileUrl, data._revs_info[0].rev, done);
                    }
                    tile.crossOrigin = 'Anonymous';
                    tile.src = tileUrl;
                    tile.onerror = function(ev) {
                        // If the tile is too old but couldn't be fetched from the network,
                        //   serve the one still in cache.
                        this.src = data.dataUrl;
                    }
                } else {
                    // Serve tile from cached data
                    //console.log('Tile is cached: ', tileUrl);
                    tile.onload = L.bind(this._tileOnLoad, this, done, tile);
                    tile.src = data.dataUrl;    // data.dataUrl is already a base64-encoded PNG image.
                }
            } else {
                this.fire('tilecachemiss', {
                    tile: tile,
                    url: tileUrl
                });
                if (this.options.useOnlyCache) {
                    // Offline, not cached
//                  console.log('Tile not in cache', tileUrl);
                    tile.onload = L.Util.falseFn;
                    tile.src = L.Util.emptyImageUrl;
                } else {
                    //Online, not cached, request the tile normally
//                  console.log('Requesting tile normally', tileUrl);
                    if (this.options.saveToCache) {
                        tile.onload = L.bind(this._saveTile, this, tile, tileUrl, null, done);
                    } else {
                        tile.onload = L.bind(this._tileOnLoad, this, done, tile);
                    }
                    tile.crossOrigin = 'Anonymous';
                    tile.src = tileUrl;
                }
            }
        }.bind(this);
    },

    // Returns an event handler (closure over DB key), which runs
    //   when the tile (which is an <img>) is ready.
    // The handler will delete the document from pouchDB if an existing revision is passed.
    //   This will keep just the latest valid copy of the image in the cache.
    _saveTile: function(tile, tileUrl, existingRevision, done) {
        if (this._canvas === null) return;
        this._canvas.width  = tile.naturalWidth  || tile.width;
        this._canvas.height = tile.naturalHeight || tile.height;

        var context = this._canvas.getContext('2d');
        context.drawImage(tile, 0, 0);

        var dataUrl;
        try {
            dataUrl = this._canvas.toDataURL(this.options.cacheFormat);
        } catch(err) {
            this.fire('tilecacheerror', { tile: tile, error: err });
            return done();
        }

        var doc = {_id: tileUrl, dataUrl: dataUrl, timestamp: Date.now()};
        if (existingRevision) {
          this._db.get(tileUrl).then(function(doc) {
              return this._db.put({
                  _id: doc._id,
                  _rev: doc._rev,
                  dataUrl: dataUrl,
                  timestamp: Date.now()
              });
          }.bind(this)).then(function(response) {
            //console.log('_saveTile update: ', response);
          });
        } else {
          this._db.put(doc).then( function(doc) {
            //console.log('_saveTile insert: ', doc);
          });
        }

        if (done) {
          done();
        }
    },

    // 🍂section PouchDB tile caching options
    // 🍂method seed(bbox: LatLngBounds, minZoom: Number, maxZoom: Number): this
    // Starts seeding the cache given a bounding box and the minimum/maximum zoom levels
    // Use with care! This can spawn thousands of requests and flood tileservers!
    seed: function(bbox, minZoom, maxZoom) {
        if (!this.options.useCache) return;
        if (minZoom > maxZoom) return;
        if (!this._map) return;

        var queue = [];

        for (var z = minZoom; z<=maxZoom; z++) {

            var northEastPoint = this._map.project(bbox.getNorthEast(),z);
            var southWestPoint = this._map.project(bbox.getSouthWest(),z);

            // Calculate tile indexes as per L.TileLayer._update and
            //   L.TileLayer._addTilesFromCenterOut
            var tileSize = this.getTileSize();
            var tileBounds = L.bounds(
                L.point(Math.floor(northEastPoint.x / tileSize.x), Math.floor(northEastPoint.y / tileSize.y)),
                L.point(Math.floor(southWestPoint.x / tileSize.x), Math.floor(southWestPoint.y / tileSize.y)));

            for (var j = tileBounds.min.y; j <= tileBounds.max.y; j++) {
                for (var i = tileBounds.min.x; i <= tileBounds.max.x; i++) {
                    point = new L.Point(i, j);
                    point.z = z;
                    queue.push(this._getTileUrl(point));
                }
            }
        }

        var seedData = {
            bbox: bbox,
            minZoom: minZoom,
            maxZoom: maxZoom,
            queueLength: queue.length
        }
        this.fire('seedstart', seedData);
        var tile = this._createTile();
        tile._layer = this;
        this._seedOneTile(tile, queue, seedData);
        return this;
    },

    _createTile: function () {
        return new Image();
    },

    // Modified L.TileLayer.getTileUrl, this will use the zoom given by the parameter coords
    //  instead of the maps current zoomlevel.
    _getTileUrl: function (coords) {
        var zoom = coords.z;
        if (this.options.zoomReverse) {
            zoom = this.options.maxZoom - zoom;
        }
        zoom += this.options.zoomOffset;
        return L.Util.template(this._url, L.extend({
            r: this.options.detectRetina && L.Browser.retina && this.options.maxZoom > 0 ? '@2x' : '',
            s: this._getSubdomain(coords),
            x: coords.x,
            y: this.options.tms ? this._globalTileRange.max.y - coords.y : coords.y,
            z: this.options.maxNativeZoom ? Math.min(zoom, this.options.maxNativeZoom) : zoom
        }, this.options));
    },

    // Uses a defined tile to eat through one item in the queue and
    //   asynchronously recursively call itself when the tile has
    //   finished loading.
    _seedOneTile: function(tile, remaining, seedData) {
        if (!remaining.length) {
            this.fire('seedend', seedData);
            return;
        }
        this.fire('seedprogress', {
            bbox:    seedData.bbox,
            minZoom: seedData.minZoom,
            maxZoom: seedData.maxZoom,
            queueLength: seedData.queueLength,
            remainingLength: remaining.length
        });

        var url = remaining.pop();

        this._db.get(url, function(err, data) {
            if (!data) {
                tile.onload = function(e) {
                    this._saveTile(tile, url, null);
                    this._seedOneTile(tile, remaining, seedData);
                }.bind(this);
                tile.onerror = function(e) {
                    // Could not load tile, let's continue anyways.
                    this._seedOneTile(tile, remaining, seedData);
                }.bind(this);
                tile.crossOrigin = 'Anonymous';
                tile.src = url;
            } else {
                this._seedOneTile(tile, remaining, seedData);
            }
        }.bind(this));
    }
});