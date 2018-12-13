"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;

LX.User = class User extends LV.EventEmitter {

    constructor(db, skip_check) {
        super();
        this.local_db = new LV.PouchDB("lx-user");
        this.db = db;
        this.node = this.db.stor.user();
        this.pair = null;
        if (skip_check) {
            console.log("[User] Make new credentials by explicit request")
            this.register();
        }
        else {
            // check browser for known credentials for this user
            this.local_db.get("creds")
                .then((creds) => {
                    let requirements = ["username", "password"];
                    let is_valid = true;
                    requirements.forEach((key) =>  {
                        if (!creds.hasOwnProperty(key)) {
                            is_valid = false;
                            console.log("[User] Existing saved credentials missing required key: " + key);
                        }
                    });
                    if (is_valid) {
                        console.log("[User] Known creds from storage: " + creds.username);
                        this.authenticate(creds.username, creds.password);
                    }
                    else {
                        console.log("[User] Removing invalid creds from storage");
                        this.local_db.remove(creds).then(() => { 
                            this.register();
                        });
                    }
                })
                .catch((e) => {
                    if (e.name == "not_found") {
                        console.log("[User] No user discovered. Created anonymous guest user...")
                        this.register()
                    }
                    else {
                        console.log("[User] Error getting creds", e);
                    }
                });
        }
    }

    get log_prefix() {
        return `[${this.username}]`;
    }


    //-------------------------------------------------------------------------
    /**
    * Authenticates the user with decentralized database
    */
    authenticate(username, password) {
        this.node.auth(username, password, (ack) => {
            if (ack.err) {
                console.log("[User] Authorize failed:", ack.err);
                this.register();
            }
            else {
                this.username = username;
                console.log("[User] Authorized:", this.username);
                SEA.pair().then((pair) => {
                    this.pair = pair;
                    this.emit("authenticated", this.pair);
                });
            }
        });
    }


    /**
    * Registers first-time user into the decentralized database
    */
    register() {
        let username = LV.ShortID.generate();
        let password = LV.ShortID.generate();
        console.log("[User] Create user with username:", username);
        this.node.create(username, password, (ack) => {
            if (ack.err) {
                console.log("[User] Unable to save", ack.err);
                return;
            }
            console.log("[User] Saved to browser");
            this.emit("registered");

            let doc = {
                "_id" : "creds",
                "username": username,
                "password": password
            }
            this.local_db.put(doc)
                .then(() => {
                    this.authenticate(username, password);
                })
                .catch((e) => {
                    console.log("[User] Unable to save", e);
                });
        });
    }


    //-------------------------------------------------------------------------

    /**
    * List packages which are installed for this user
    */
    listPackages() {
        this.node.get("packages").once((v,k) => {
            if (!v) return;
            Object.keys(v).forEach((pkg) => {
                if (pkg == "_" || v[pkg] == null) return;
                console.log(`${this.log_prefix} Installed Package ${pkg}:`, v[pkg]);
            });
        });
    }

    /**
    * Installs a package for a given user and thereby makes available to end-user device
    */
    install(name) {
        this.db.get("pkg").get(name)
            .once((v,k) => {
                if (!v) {
                    console.log(`${this.log_prefix} Unable to find package ${name} to install...`);
                }
                else {
                    console.log(`${this.log_prefix} Installed package ${name}`);
                    this.node.get("packages").get(name).put(v);
                    this.emit("install", name);
                }
            });
    }

     /**
    * Removes a package for a given user and cleans up references to related data
    */
    uninstall(name) {
         this.node.get("packages").get(name)
            .put(null)
            .once((v,k) => {
                    console.log(`${this.log_prefix} Uninstalled package ${name}`);
                    this.node.get("packages").get(name).put(null);
                    this.emit("uninstall", name);
                });

    }




    //-------------------------------------------------------------------------

    /**
    * List topics the user has subscribed to and wants to receive data for
    */
    listTopics() {
        this.node.get("topics").once((v,k) => {
            if (!v) return;
            Object.keys(v).forEach((pkg) => {
                if (pkg == "_" || v[pkg] == null) return;
                console.log(`${this.log_prefix} Subscribed Topics ${pkg}:`, v[pkg]);
            });
        });
    }

    /**
    * Explicitly gather data on a given topic from available packages
    */
    subscribe(topic) {
        this.node.get("topics").get(topic).set(true).once(() => {
            console.log(`${this.log_prefix} Subscribe to topic ${topic}`);
            this.emit("subscribe", name);
        });
    }
    
    /**
    * Remove and stop watching for data on a given topic
    */
    unsubscribe(topic) {
        this.node.get("topics").get(topic).set(false).once(() => {
            console.log(`${this.log_prefix} Unsubscribe from topic ${topic}`);        
            this.emit("subscribe", name);
        });
    }

}
