"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;

LX.User = class User extends LV.EventEmitter {

    constructor(db, skip_check) {
        super();
        this.local_db = new LV.PouchDB("lx-user");
        this.node = db.stor.user();
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
    * Installs a package for a given user and thereby makes available to end-user device
    */
    install(pkg_id) {
        this.emit("install", path);
    }

     /**
    * Removes a package for a given user and cleans up references to related data
    */
    uninstall(pkg_id) {
        this.emit("publish", path);

    }




    //-------------------------------------------------------------------------
    /**
    * Explicitly gather data on a given topic from available packages
    */
    subscribe(topic) {

    }
    
    /**
    * Remove and stop watching for data on a given topic
    */
    unsubscribe(topic) {

    }

}
