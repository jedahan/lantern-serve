"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;

LX.Organization = class Organization extends LV.EventEmitter {

    constructor(id, db) {
        super()
        if (!id) {
            return console.error("[Organization] requires id to construct");
        }
        if (!db) {
            return console.error("[Organization] requires database to construct");
        }
        this.id = id;
        this.name = null;

        this.db = db;
        this.node = db.get("org")
            .get(id);

        this.node.on((v,k) => {
            // always keep object up-to-date as data changes
            if (v.hasOwnProperty("name")) {
                console.log("[Organization] name changed to = ", v.name);
                this.name = v.name;
            }
        })
        console.log(`[Organization] id = ${this.id}`)
    }
    


    //-------------------------------------------------------------------------
    /**
    * Publish a new data package to the network
    */
    register(name) {
        if (!name) {
            return console.error("[Organization] please name your organization to register");
        }
        this.node.put({
                "name": name,
                "members": {},
                "packages": {},
            })
            .once(() => {
                this.emit("register");
            })
    }

    unregister() {
        this.node.put(null)
            .once((v,k) => {
                console.log(`[Organization] unregistered`)
                this.emit("unregister");
            });
    }



    //-------------------------------------------------------------------------
    /**
    * Add member user to the organization
    */
    addOneMember(user) {
        this.node.get("members")
            .set(user);
    }

    /**
    * Remove member user from the organization
    */
    removeOneMember(user) {
        this.node.get("members")
            .unset(user);
    }



    //-------------------------------------------------------------------------
    /**
    * Publish a new data package to the network
    */
    publish(name, version, objects) {

        if (!name) {
            return console.error("[Organization] please name your package to publish");
        }

        let data = {};
        version = version || "0.0.1";
        objects = objects || {};

        let publish_package = {
            "name": name,
            "version": version,
        };

        this.db.get("pkg").get(name)
            .put(publish_package)
            .once((v,k) => {

                this.db.get("pkg").get(name)
                    .get("organization")
                    .put(this.node);

                this.db.get("pkg").get(name).get("data").get(version)
                    .put(objects)
                    .once((v,k) => {
                        console.log(v,k);
                        this.emit("publish", name);
                    });
            });


    }

    /*
    * Unpublish removes a data package from the network
    */
    unpublish(name, version) {
        
        if (!name) {
            return console.error("[Organization] please input name of package to unpublish (this is a destructive action)");
        }

        const cb = (v,k) => {
            this.emit("unpublish", name);
        }

        let node = this.db.get("pkg").get(name);

        if (!version) {
            // unpublish all versions
            node.put(null).once(cb);
        }
        else {
            node.get("version").once((v,k) => {
                if (v == version) {
                    node.get("version").put(null);
                }
                node.get("data").get(version).put(null).once(cb);
            });
        }
    }

}