"use strict";
const LX = window.LX || {}; if (!window.LX) window.LX = LX;


LX.Director = class Director extends LV.EventEmitter {

    constructor() {
        super();
        this.ready = false;
        this.apps = {};
        this.db = null;
        this.view = new LX.View();
        this.atlas = LX.Atlas;
        this.user = null;
    }

    start() {

        // load in dynamic apps
        fetch("/api/apps", {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((result) => {
                if (result.status == 200) {
                    return result.json()
                }
                else {
                    reject(result);
                }
            })
            .then((json) => {
                json.forEach(this.createApp.bind(this));
            })
            .catch((err) => {
                console.warn("[Direct] No available apps to work with");
            });


        this.db = new LX.Database(window.location.origin + "/gun");

        // get or create a unique profile for this user / device
        this.user = new LX.User(this.db);
        this.user.on("auth", function() {
            this.view.data.user.username = this.user.username;
            this.emit("auth");
         }.bind(this));

        this.user.authOrRegister();


        this.emit("start");

    }


    withUser(fn) {
        if (this.user && this.user.username) {
            fn(this.user);
        }
        else {
            this.once("auth", () => {
                fn(this.user);
            });
        }
    }



    //------------------------------------------------------------------------
    createApp(app_files) {
        if (!app_files.children) {
            console.warn("[Direct] Ignoring app directory with no children:", app_files.name);
            return;
        }

        if (!this.apps.hasOwnProperty(app_files.name)) {
            let obj = this.apps[app_files.name] = new LX.App(app_files);

            obj.on("load", (page) => {
                //console.log("[Direct] App loads page: ", page.component_id );
            });

            obj.on("open", (component_id) => {
                //console.log("[Direct] App opens component:", component_id);
                this.view.data.app_components.push(component_id);
            });

            obj.on("close", (component_id) => {
                //console.log("[Direct] App closes component:", component_id);
                this.view.data.app_components.remove(component_id);
            });
        }
    }



    //------------------------------------------------------------------------
    closeOneApp(app_id) {
        if (this.apps.hasOwnProperty(app_id)) {
            this.apps[app_id].unload();
        }
    }
    
    openOneApp(app_id) {
        if (this.apps.hasOwnProperty(app_id)) {
            this.apps[app_id].pages.forEach((page) => {
                this.apps[app_id].open(`lx-app-${app_id}-${page.id}`);
            });
        }
    }
}