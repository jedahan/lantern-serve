"use strict";
const LX = window.LX || {}; if (!window.LX) window.LX = LX;
LX.Vendor = LX.Vendor || {};



//----------------------------------------------------------------------------
const Vue = LX.Vendor.Vue = require("vue");



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
LX.Director = (() => {
    let self = {};

    self.app = new Vue({
        el: '#app-container',
        data: {
            mask: true,
            profile: {}
        }
    });
    
    return self;
})();
