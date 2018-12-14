"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;

LX.User = class User extends LV.EventEmitter {

    constructor(db, skip_check) {
        super();
        this.local_db = new LV.PouchDB("lx-user");
        this.db = db;
        this.user_node = this.db.stor.user();
        this.pair = null;
        this.feed = new LX.Feed(this.db);


        if (skip_check) {
            console.log(`${this.log_prefix} make new credentials by explicit request`)
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
                            console.log(`${this.log_prefix} existing saved credentials missing required key: ${key}`);
                        }
                    });
                    if (is_valid) {
                        this.authenticate(creds.username, creds.password);
                    }
                    else {
                        console.log(`${this.log_prefix}  removing invalid creds from storage`);
                        this.local_db.remove(creds).then(() => { 
                            this.register();
                        });
                    }
                })
                .catch((e) => {
                    if (e.name == "not_found") {
                        console.log(`${this.log_prefix} no user discovered. Created anonymous guest user...`)
                        this.register()
                    }
                    else {
                        console.log(`${this.log_prefix} error getting creds`, e);
                    }
                });
        }


        this.on("authenticated", () => {
            this.listPackages().then((packages) => {
                this.feed.addManyPackages(packages);
            });
        });

    }

    get log_prefix() {
        return `[u:${this.username || "anonymous" }]`;
    }


    //-------------------------------------------------------------------------
    /**
    * Authenticates the user with decentralized database
    */
    authenticate(username, password) {
        this.user_node.auth(username, password, (ack) => {
            if (ack.err) {
                console.log(`${this.log_prefix} bad auth`, ack.err);
                this.register();
            }
            else {
                this.username = username;
                console.log(`${this.log_prefix} good auth`);
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
        console.log(`${this.log_prefix} create user with username: ${username}`);
        this.user_node.create(username, password, (ack) => {
            if (ack.err) {
                console.log(`${this.log_prefix} unable to save`, ack.err);
                return;
            }
            console.log(`${this.log_prefix} saved to browser`);
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
                    console.log(`${this.log_prefix}unable to save`, e);
                });
        });
    }


    //-------------------------------------------------------------------------

    /**
    * List packages which are installed for this user
    */
    listPackages() {
        return new Promise((resolve, reject) => {
            let packages = [];
            this.user_node.get("packages").once((v,k) => {
                if (!v) return;
                Object.keys(v).forEach((pkg) => {
                    if (pkg == "_" || v[pkg] == null) return;
                    packages.push(pkg);
                });
                resolve(packages);
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
                    console.log(`${this.log_prefix} unable to find package ${name} to install...`);
                }
                else {
                    console.log(`${this.log_prefix} installed package ${name}`);
                    this.user_node.get("packages").get(name).put(v);
                    this.emit("install", name);
                }
            });
    }

     /**
    * Removes a package for a given user and cleans up references to related data
    */
    uninstall(name) {
         this.user_node.get("packages").get(name)
            .put(null)
            .once((v,k) => {
                    console.log(`${this.log_prefix} uninstalled package ${name}`);
                    this.user_node.get("packages").get(name).put(null);
                    this.emit("uninstall", name);
                });

    }




    //-------------------------------------------------------------------------

    /**
    * List topics the user has subscribed to and wants to receive data for
    */
    listTopics() {
        this.user_node.get("topics").once((v,k) => {
            if (!v) return;
            Object.keys(v).forEach((pkg) => {
                if (pkg == "_" || v[pkg] == null) return;
                console.log(`${this.log_prefix} subscribed topics ${pkg}:`, v[pkg]);
            });
        });
    }

    /**
    * Explicitly gather data on a given topic from available packages
    */
    subscribe(topic) {
        this.user_node.get("topics").get(topic).set(true).once(() => {
            console.log(`${this.log_prefix} subscribe to topic ${topic}`);
            this.emit("subscribe", name);
        });
    }
    
    /**
    * Remove and stop watching for data on a given topic
    */
    unsubscribe(topic) {
        this.user_node.get("topics").get(topic).set(false).once(() => {
            console.log(`${this.log_prefix} unsubscribe from topic ${topic}`);        
            this.emit("subscribe", name);
        });
    }

}
