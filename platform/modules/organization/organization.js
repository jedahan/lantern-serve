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
        this.org_node = db.get("org")
            .get(id);

        console.log(`${this.log_prefix} id = ${this.id}`)

        this.org_node.on((v,k) => {
            // always keep object up-to-date as data changes
            if (v.hasOwnProperty("name")) {
                console.log(`${this.log_prefix} name --> ${v.name}`);
                this.name = v.name;
            }
        })
    }
    


    //-------------------------------------------------------------------------
    get log_prefix() {
        return `[o:${this.id || "Organization"}]`
    }

    //-------------------------------------------------------------------------
    /**
    * Publish a new data package to the network
    */
    register(name) {
        if (!name) {
            return console.error(`${this.log_prefix} please name your organization to register`);
        }
    
        this.org_node.get(name).once((v,k) => {
            if (v !== null) {
                return console.log(`${this.log_prefix} organization already exists with name ${name}`);
                return;
            }

            this.org_node.put({
                    "name": name,
                    "members": {},
                    "packages": {},
                })
                .once(() => {
                    this.emit("register");
                })
        });

    }

    unregister() {
        this.org_node.put(null)
            .once((v,k) => {
                console.log(`${this.log_prefix} unregistered`)
                this.emit("unregister");
            });
    }



    //-------------------------------------------------------------------------
    /**
    * Add member user to the organization
    */
    addOneMember(user) {
        this.org_node.get("members")
            .set(user);
    }

    /**
    * Remove member user from the organization
    */
    removeOneMember(user) {
        this.org_node.get("members")
            .unset(user);
    }



    //-------------------------------------------------------------------------
    /**
    * Publish a new data package to the network
    */
    publish(name, objects, version, is_public) {

        if (!name) {
            return console.error(`${this.log_prefix} please name your package to publish`);
        }


        const publishVersion = () => {
            this.db.get("pkg").get(name).get("data").get(version)
                .put(objects)
                .once((v,k) => {
                    console.log(`${this.log_prefix} published ${name} version ${version}`);
                    this.emit("publish", name);
                });
        }


        let data = {};
        version = version || "0.0.1";
        objects = objects || {};

        let publish_package = {
            "name": name,
            "version": version,
            "public": (is_public === true || is_public === null ? true : false)
        };

        let pkg_node = this.db.get("pkg").get(name);

        pkg_node.once((v,k) => {
            if (!v) {
                pkg_node.put(publish_package);

                this.db.get("pkg").get(name)
                    .get("organization")
                    .put(this.org_node);
                publishVersion();
            }
            else {
                pkg_node.get("data").get(version)
                    .once((v,k) => {
                        // publishing a version that does not yet exist
                        if (!v) {
                            publishVersion();
                        }
                        else {
                            console.log(`${this.log_prefix} version ${version} for ${name} already exists`);
                        }
                    });
            }
        });
    }



    /*
    * Unpublish removes a data package from the network
    */
    unpublish(name, version) {
        
        if (!name) {
            return console.error(`${this.log_prefix}please input name of package to unpublish (this is a destructive action)`);
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