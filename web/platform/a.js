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
        this.components = [];
        this.pages = [];
        this.data = {};
        this.loadAll(); 
    }



    createComponent(page_id, body, config) {
        let cmp = {
            template: body
        };

        let component_id = ["lx", "app", this.name, page_id].join("-");

        let self = this;

        if (config) {

             if (config.data) {
                // keep multiple components in same app together with same data
                self.data = config.data;
                cmp.data = function() {
                    return self.data;
                }
            }
            if (config.methods) {
                cmp.methods = config.methods;
            }
        }

        let component = Vue.component(component_id, cmp);

        self.pages.push(page_id);
        self.components.push(component);
        self.emit("load", component_id);


        if (config.hasOwnProperty("page") && config.page.hasOwnProperty(page_id)) {
            if (config.page[page_id].autostart) {
                self.emit("start", component_id);
            }
        }
        else if (config.autostart) {
            self.emit("start", component_id);
        }

    }

    loadPages(config) {
        let files = {};
        this.children.forEach((child) => {
            // only load html pages
            if (child.extension != ".html") return;
            let filename = ["/app", this.name, child.name].join("/");
            let page_id = child.name.split(".")[0];
            fetch(filename)
                .then((result) => {
                    return result.text();
                })
                .then((body) => {
                    return this.createComponent(page_id, body, config);
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

    const loadApp = (app) => {
        let obj = new LX.App(app);
        self.apps.push(obj);
        obj.on("load", (component_id) => {
            console.log("[Director] App loads component: ", component_id );
        });

        obj.on("start", (component_id) => {
            self.vue.app_components.push(component_id);
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
                json.forEach(loadApp);
            });

        // get or create a unique profile for this user / device
        self.profile = new LX.Profile();
        self.profile.on("load", () => {
            self.vue.profile_address = self.profile.address;
        });

    }
    
    return self;
})();
