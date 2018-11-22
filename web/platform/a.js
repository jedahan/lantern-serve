"use strict";
const LX = window.LX || {}; if (!window.LX) window.LX = LX;
LX.Vendor = LX.Vendor || {};



//----------------------------------------------------------------------------
const EventEmitter = LX.Vendor.EventEmitter = require("event-emitter-es6");
const Vue = LX.Vendor.Vue = require("vue");



//----------------------------------------------------------------------------
LX.Config = (() => {
    let self = {};

    self.leaflet = {
        attribution: false,
        dbName: "lx-tiles",
        minZoom: 3,
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

    self.fetch = {
        mode: "cors",
        cache: "no-cache",
        headers: {
           "Content-Type": "application/json; charset=utf-8"
        }
    };

    return self;
})();



//----------------------------------------------------------------------------
LX.App = class App extends EventEmitter {
    

    constructor(obj) {
        super();
        this.name = obj.name;
        this.children = obj.children;
        this.component = null;
        this.config = {};
        this.loadAll(); 
    }



    createComponent(body, config) {
        let cmp = {
            template: body
        };

        if (config) {

            if(config.autostart) {
                this.config.autostart = config.autostart;
            }

             if (config.data) {
                cmp.data = function() {
                    return config.data;
                }
            }
            if (config.methods) {
                cmp.methods = config.methods;
            } 
        }
        this.component = Vue.component("lx-app-"+this.name, cmp);
        this.emit("load");
    }

    loadPages(config) {
        let files = {};
        this.children.forEach((child) => {
            // only load html pages
            if (child.extension != ".html") return;
            let filename = ["/app", this.name, child.name].join("/");
            fetch(filename)
                .then((result) => {
                    return result.text();
                })
                .then((body) => {
                    return this.createComponent(body, config);
                });
        });    
    }



    loadAll() {

        // do we have a config?
        let config_file_name = "app.json";
        let has_component_config = false;

        this.children.forEach((child) => {
            if (child.name != config_file_name) return;
            has_component_config = true;
        });

        // load all our pages with config if available
        if (!has_component_config) {
            return this.loadPages();
        }
        else {
            let filename = ["/app", this.name, config_file_name].join("/");  
            fetch(filename)
                .then((result) => {
                    return result.json()
                })
                .then((json) => {
                    this.loadPages(json);
                });
        }
    }

}



//----------------------------------------------------------------------------
LX.Director = (() => {

    let self = {
        apps: [],
        profile: null,
        vue: new Vue({
            el: '#app-container',
            data: {
                app_components: [],
                mask: true,
                profile_address: null
            }
        })
    };

    const parseApp = (app) => {
        let obj = new LX.App(app);
        self.apps.push(obj);
        obj.on("load", () => {
            console.log("[Director] App load: ", obj.name);

            // automatically render apps with autostart activated
            if (obj.config.autostart) {
                self.vue.app_components.push("lx-app-"+obj.name);
            }
        });
    }


    self.start = function() {
        console.log("[Director] Start")
        self.vue.mask = false;

        // load in dynamic apps
        fetch("/api/apps")
            .then((result) => {
                return result.json()
            })
            .then((json) => {
                json.forEach(parseApp);
            });

        // get or create a unique profile for this user / device
        self.profile = new LX.Profile();
        self.profile.on("load", () => {
            self.vue.profile_address = self.profile.address;
        });

    }
    
    return self;
})();
