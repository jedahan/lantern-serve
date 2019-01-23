LX.Director = class Director extends LV.EventEmitter {

    constructor() {
        super();
        this.ready = false;
        this.apps = {};
        this.view = new LX.View();
        this.atlas = new LX.Atlas();
        // define database and user to work with decentralized network
        this.db = new LX.Database(window.location.origin + "/gun");
        this.user = new LX.User(this.db);
    }

    withUser(fn) {
        if (this.user && this.user.username) {
            fn(this.user);
        }
        else {
            this.user.once("auth", function() {
                fn(this.user);
            }.bind(this));
        }
    }

    loadApps() {
        return new Promise((resolve, reject) => {

            // info that may be useful to the browser or environment
            let info = {
                apps: [],
                online: null,
                cloud: null
            };

            // load in dynamic apps
            fetch("/api/apps", {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((result) => {
                    if (result.status == 200) {
                        info.online = result.headers.get("X-Lantern-Online");
                        info.cloud = result.headers.get("X-Lantern-Cloud");
                        return result.json()
                    }
                    else {
                        reject(result);
                    }
                })
                .then((json) => {
                    json.forEach(item => {
                        this.createApp(item);
                        info.apps.push(item.name);
                    });
                    resolve(info);
                })
                .catch((err) => {
                    console.warn("[Direct] No available apps to work with");
                });
        });
    }

    loadStylesheet(uri) {
      var el = document.createElement('link');
      el.rel = 'stylesheet';
      el.href = uri;
      el.type = 'text/css';
      document.head.appendChild(el);
    }



    //------------------------------------------------------------------------
    createApp(item) {
        if (!item.children) {
            console.warn("[Direct] Ignoring app directory with no children:", item.name);
            return;
        }

        if (!this.apps.hasOwnProperty(item.name)) {
            let obj = this.apps[item.name] = new LX.App(item);

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