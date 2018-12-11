"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;

LX.Database = class Database extends LV.EventEmitter {

    constructor() {
        super();

        this.stor = LV.GraphDB(document.baseURI + "gun");
        this.root = this.stor.get(LC.db.namespace);

        this.packages = {}; // keep track of a subset of overall database

        this.objects = {};

        this.root.once((v,k) => {
            if (v == undefined) {
                let obj = {
                    "marker": {}
                }
                this.stor.get(LC.db.namespace).put(obj).once((v,k) => {
                    //console.log("[DB] Created root node:", k, v)
                });
            }
            else {
                //console.log("[DB] Existing root node:", k, v)
            }
        });

    }

    /**
    * Get node from within root namespace
    */
    get() {
        return this.root.get.apply(this.root, arguments);
    }

    /**
    * Sets value from within root namespace
    */
    put() {
        return this.root.put.apply(this.root, arguments);
    }


    /**
    * Keeps track of shared objects
    */

    link(shared_obj) {
        this.objects[shared_obj.id] = shared_obj;
    }

    unlink(shared_obj) {
        this.objects[shared_obj.id] = null;
    }


}