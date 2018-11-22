"use strict";
const LX = window.LX || {}; if (!window.LX) window.LX = LX;
LX.Vendor = LX.Vendor || {};



//----------------------------------------------------------------------------
const PouchDB = LX.Vendor.PouchDB = require("pouchdb-browser");
LX.Vendor.Geohash = require("latlon-geohash");
require('geohash-distance');
require("leaflet");
require("leaflet.locatecontrol");



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


//----------------------------------------------------------------------------
LX.Atlas = (() => {
    
    let self = {};
    var last_geo;

    self.render = () => {

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

        self.map.on("load", (e) => {
            if (LX.Director) {
                LX.Director.start();
            }
                
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
                console.log("[Atlas] Map moved")
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
        });

    }


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

    self.render();
    return self;
})();

