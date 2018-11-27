"use strict";
const LX = window.LX || {}; if (!window.LX) window.LX = LX;
const LV = window.LV || {}; if (!window.LV) window.LV = LV;



//----------------------------------------------------------------------------
LV.EventEmitter = require("event-emitter-es6");
LV.Vue = require("vue");
LV.Moment = require("moment");
LV.ShortID = require("shortid");
LV.GraphDB = require("gun");
LV.GraphDBTag = require("gun-tag");
LV.SEA = require("sea");
LV.VueGraphDB = require("vue-gun");



//----------------------------------------------------------------------------
Array.prototype.getIndexForObjectWithKey = function(key, value) {
    for (var idx in this) {
        var item = this[idx];
        if (item.hasOwnProperty(key) && item[key] == value) {
           return idx;
        }
    }
}

Array.prototype.removeByValue = function(value) {
    for (var idx in this) {
        var item = this[idx];
        if (item == value) {
            return this.splice(idx,1);
        }
    }
}


//----------------------------------------------------------------------------
LX.Config = (() => {
    let self = {};

    self.db = {
        namespace: "lx"
    }

    self.leaflet_map = {
        zoomDelta: 1.5,
        wheelPxPerZoomLevel: 100,
        contextmenu: true,
        contextmenuWidth: 140,
    };
    
    self.leaflet_tiles = {
        attribution: false,
        dbName: "lx-tiles",
        minZoom: 3,
        maxZoom: 20,
        useCache:  true,
        useOnlyCache: false,
        cacheMaxAge: 365*24*3600*1000,
        crossOrigin: true
    };

    self.leaflet_locatecontrol = {
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

    self.fetch = {
        mode: "cors",
        cache: "no-cache",
        headers: {
           "Content-Type": "application/json; charset=utf-8"
        }
    };

    return self;
})();