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

        //console.log(`${this.log_prefix} id = ${this.id}`)

        this.node.on((v,k) => {
            // always keep object up-to-date as data changes
            if (v && v.hasOwnProperty("name")) {
                //console.log(`${this.log_prefix} name --> ${v.name}`);
                this.name = v.name;
            }
        })
    }
    


    //-------------------------------------------------------------------------
    get log_prefix() {
        return `[o:${this.id || "Organization"}]`.padEnd(20, " ")
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
        
            this.node.once((v,k) => {
                if (v) {
                    console.warn(`${this.log_prefix} organization already exists`,v);
                    return resolve(v);
                }

                this.node.put({
                        "name": name,
                        "members": {},
                        "packages": {}
                    }, (ack) => {
                        if (ack.err) {
                            reject(ack.err);
                        }
                        else {
                            this.emit("register");
                            return resolve(this.node);
                        }
                    });
            });

        });

    }

    unregister() {
        return new Promise((resolve, reject) => {
            this.node.put(null)
                .once((v,k) => {
                    console.log(`${this.log_prefix} unregistered ${this.id}`)
                    this.emit("unregister");
                    return resolve();
                });
            });
    }


    getOrRegister(name) {
        return new Promise((resolve, reject) => {
            this.node.once((v,k) => {
                if (v) return resolve(v);
                return this.register(name).then(resolve);
            })
        });
    }



    //-------------------------------------------------------------------------
    /**
    * Add member user to the organization
    */
    addOneMember(user) {
        return new Promise((resolve, reject) => {
            this.node.get("members")
                .set(user)
                .once(resolve);
            });
    }

    /**
    * Remove member user from the organization
    */
    removeOneMember(user) {
        return new Promise((resolve, reject) => {
            this.node.get("members")
                .unset(user)
                .once(resolve);
            });
    }

}