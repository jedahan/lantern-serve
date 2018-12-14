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
        return new Promise((resolve, reject) => {
            if (!name) {
                console.error(`${this.log_prefix} please name your organization to register`);
                return reject("name_required");
            }
        
            this.org_node.once((v,k) => {
                if (v) {
                    console.warn(`${this.log_prefix} organization already exists`,v);
                    return resolve(v);
                }

                this.org_node.put({
                        "name": name,
                        "members": {},
                        "packages": {}
                    }, (ack) => {
                        if (ack.err) {
                            reject(ack.err);
                        }
                        else {
                            this.emit("register");
                            return resolve();
                        }
                    });
            });

        });

    }

    unregister(name) {
        return new Promise((resolve, reject) => {

            if (!name) {
               console.error(`${this.log_prefix} please name your organization to register`);
               return reject("name_required");
            }
        
            this.org_node.put(null)
                .once((v,k) => {
                    console.log(`${this.log_prefix} unregistered ${name}`)
                    this.emit("unregister");
                    return resolve();
                });
            });
    }



    //-------------------------------------------------------------------------
    /**
    * Add member user to the organization
    */
    addOneMember(user) {
        return new Promise((resolve, reject) => {
            this.org_node.get("members")
                .set(user)
                .once(resolve);
            });
    }

    /**
    * Remove member user from the organization
    */
    removeOneMember(user) {
        return new Promise((resolve, reject) => {
            this.org_node.get("members")
                .unset(user)
                .once(resolve);
            });
    }



    //-------------------------------------------------------------------------
    /**
    * Publish a new data package to the network
    */
    publish(name, objects, version, is_public) {

        return new Promise((resolve, reject) => {


            if (!name) {
                console.error(`${this.log_prefix} please name your package to publish`);
                return reject("name_required");
            }

            let pkg_node = this.db.get("pkg").get(name);

            const publishVersion = () => {
                this.db.get("pkg").get(name).get("data").get(version)
                    .put(objects, (ack) => {
                        if (ack.err) {
                            reject(ack.err);
                        }
                        else {
                            console.log(`${this.log_prefix} published ${name} version ${version}`);
                            this.emit("publish", name);
                            resolve(pkg_node);
                        }
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

            console.log("package ot publish is", publish_package);

            pkg_node.once((v,k) => {
                if (!v) {
                    pkg_node.put(publish_package).once(() => {

                        // package node created
                        this.org_node.get("packages").get(name).put(pkg_node);

                        this.db.get("pkg").get(name)
                            .get("organization")
                            .put(this.org_node, publishVersion)
                    });
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
                                resolve(pkg_node)
                            }
                        });
                }
            });

        });
    }



    /*
    * Unpublish removes a data package from the network
    */
    unpublish(name, version) {
        return new Promise((resolve, reject) => {

            if (!name) {
                console.error(`${this.log_prefix}please input name of package to unpublish (this is a destructive action)`);
                return reject("name_required");
            }

            const cb = (v,k) => {
                this.emit("unpublish", name);
                return resolve();
            }

            let node = this.db.get("pkg").get(name);

            if (!version) {
                // unpublish all versions
                node.put(null, cb);
            }
            else {
                node.get("version").once((v,k) => {
                    if (v == version) {
                        node.get("version").put(null);
                    }
                    node.get("data").get(version).put(null,cb);
                });
            } 
        });
    }

}