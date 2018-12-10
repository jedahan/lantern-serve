"use strict";

/***
* PLATFORM CORE
*
* User and database classes provide a base. Includes configuration,
* base classes, and access to requisite third-party libraries.
*/

const LX = window.LX || {}; if (!window.LX) window.LX = LX;
const LV = window.LV || {}; if (!window.LV) window.LV = LV;



//----------------------------------------------------------------------------
LV.EventEmitter = require("event-emitter-es6");
LV.Moment = require("moment");
LV.ShortID = require("shortid");
LV.GraphDB = require("gun");
LV.SEA = require("sea");



//----------------------------------------------------------------------------
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

Array.prototype.getIndexForObjectWithKey = function(key, value) {
    for (var idx in this) {
        var item = this[idx];
        if (item.hasOwnProperty(key) && item[key] == value) {
           return idx;
        }
    }
}

Math.limit = function(val, min, max) {
  return val < min ? min : (val > max ? max : val);
}




//----------------------------------------------------------------------------
LX.Config = (() => {
    let self = {};

    self.db = {
        namespace: "lx"
    }

    self.leaflet_map = {
        zoomDelta: 1.4,
        wheelPxPerZoomLevel: 100,
        contextmenu: true,
        contextmenuWidth: 140,
        zoomControl: false,
        maxZoom: 18
    };
    
    self.leaflet_tiles = {
        attribution: false,
        dbName: "lx-tiles",
        minZoom: 3,
        maxZoom: 20,
        useCache:  true,
        useOnlyCache: false,
        cacheMaxAge: 365*24*3600*1000,
        crossOrigin: true
    };

    self.leaflet_locatecontrol = {
        returnToPreviousBounds: true,
        cacheLocation: true,
        showCompass: true,
        flyTo: false,
        showPopup: false,
        setView: "untilPanOrZoom",
        position: "bottomright"
    }

    self.maptiler = {
        id: "ade1b05a-496f-40d1-ae23-5d5aeca37da2",
        key: "ZokpyarACItmA6NqGNhr",
        map: "streets"
    };

    self.fetch = {
        mode: "cors",
        cache: "no-cache",
        headers: {
           "Content-Type": "application/json; charset=utf-8"
        }
    };

    return self;
})();



//----------------------------------------------------------------------------
LX.Database = class Database extends LV.EventEmitter {

    constructor() {
        super();

        this.stor = LV.GraphDB(document.baseURI + "gun");
        this.root = this.stor.get(LX.Config.db.namespace);

        this.packages = {}; // keep track of a subset of overall database

        this.objects = {};

        this.root.once((v,k) => {
            if (v == undefined) {
                let obj = {
                    "marker": {}
                }
                this.stor.get(LX.Config.db.namespace).put(obj).once((v,k) => {
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


//----------------------------------------------------------------------------
LX.SharedObject = class SharedObject extends LV.EventEmitter {
    constructor(id, defaults) {
        super();
        this.id = id || LV.ShortID.generate();
        this._mode = "draft";

        // create data space for data we allow to be exported to shared database
        this._data = {};
        for (var idx in defaults) {
            this._data[idx] = defaults[idx][1] || null;
        }

        this._key_table = {};
        this._key_table_reverse = {};
        for (var idx in defaults) {
            this._key_table[idx] = defaults[idx][0];
            this._key_table_reverse[defaults[idx][0]] = idx;
        }
        return this;
    }



    //-------------------------------------------------------------------------
    get log_prefix() {
        return `[${this.id}]`
    }

    /**
    * Defines tags for data filtering and user interface display
    */
    set tags(val) {
        if (!val || val.length == 0 ) return;

        if (typeof(val) == "object") {
            val.forEach(this.tag.bind(this));
        }
    }

    get tags() {
        return this._data.tags;
    }


    set mode(val) {
        this._mode = val;
        this.emit("mode", val);
    }

    get mode() {
        return this._mode;
    }



    //-------------------------------------------------------------------------
    _sanitizeTag(tag) {
        return tag.toLowerCase().replace(/[^a-z0-9\-]+/g, '');
    }

    tag(tag) {
        tag = this._sanitizeTag(tag);
        //console.log(`${this.log_prefix} tag = `, tag);

        // don't allow duplicate tags
        if(this._data.tags.indexOf(tag) > -1) {
            return;
        }

        this._data.tags.push(tag);
        this.emit("tag", tag);
        return this.tags;
    }

    untag(tag) {
        tag = this._sanitizeTag(tag);
        this._data.tags.remove(tag);
        this.emit("untag", tag);
        return this.tags;
    }

    untagAll() {
        this._data.tags.forEach((tag) => {
            this.emit("untag", tag);
        });
        this._data.tags = [];
        return this.tags;
    }



    //-------------------------------------------------------------------------
    /**
    * Compresses and formats data for storage in shared database
    *
    * Requires that all data variables are pre-defined in our map for safety
    */
    pack(obj) {
        let new_obj = {};
        for (var idx in obj) {
            let v = obj[idx];
            if (this._key_table.hasOwnProperty(idx)) {
                let k = this._key_table[idx];
                if (v.constructor === Array) {
                    new_obj[k] = "Å"+v.join(",");
                }
                else {
                    new_obj[k] = v;
                }

            }
        }
        //console.log(`${this.log_prefix} Packed:`, obj, new_obj);
        return new_obj;
    }


    /**
    * Extracts data from shared database and places back in javascript object
    *
    * Requires that all data variables are pre-defined in our map for safety
    */
    unpack(obj) {
        let new_obj = {};

        for (var idx in obj) {
            let v = obj[idx];

            if (this._key_table_reverse.hasOwnProperty(idx)) {
                let k = this._key_table_reverse[idx];
                if (v[0] == "Å") {
                    // this is an array. expand it...
                    v = v.replace("Å", "").split(",");
                }
                new_obj[k] = v;
            }
        }
        //console.log(`${this.log_prefix} Unpacked:`, obj, new_obj);
        return new_obj; 
    }



    //-------------------------------------------------------------------------
    /**
    * Export to shared database
    */
    export(db) {

        if (!db) {
            return console.log(`${this.log_prefix} Requires database to export to`);
        }

        this.mode = "locked"; // lock mode


        // record owner when item is first exported...
        if (!this._data["owner"]) {
            this._data["owner"] = LT.user.username;
        }

        let data = this.pack(this._data);
    
        // save to our shared database...
        db.get("marker")
            .get(this.id)
            .put(data)
            .once((v,k) => {
                this.mode = "shared"; // shared mode
                db.link(this);
                this.emit("export");
            });

    }

    exportPartial(field, db) {

        if (!db) {
            return console.log(`${this.log_prefix} Requires database to export field to`);
        }
        else if (!this._data.hasOwnProperty(field)) {
            return console.log(`${this.log_prefix} Missing field so cannot export: ${field}`);
        }

        this.mode = "locked"; // lock mode

        let data = {};
        data[field] = this._data[field];

        data = this.pack(data);

        // save to our shared database...
        db.get("marker")
            .get(this.id)
            .put(data)
            .once((v,k) => {
                db.link(this);
                this.emit("export");
            });
    }


    /**
    * Import from shared database
    */
    import(db) {
        if (!db) {
            return console.log(`${this.log_prefix} Requires database to import from`);
        }

        db.get("marker")
            .get(this.id)
            .once((v,k) => {
                this.importWithData(v);
                db.link(this);
            });
    }

    /**
    * Complete an import given database content
    *
    * May be used separately from import(),
    * for example during a database map()
    */
    importWithData(data) {

        this.mode = "shared";
        data = this.unpack(data);

        // only access approved data keys from our map
        for (var idx in data) {
            this[idx] = this._data[idx] = data[idx];
        }
        this.emit("import");
    }


    remove(db) {

        if (!db) {
            return console.log(`${this.log_prefix} Requires database to remove from`);
        }
        else if (this.mode == "removed") {
            // already removed... skip...
            return;
        }

        console.log(`${this.log_prefix} Remove`);
        
        this.mode = "removed";
        db.get("marker")
            .get(this.id)
            .put(null)
            .once((v,k) => {
                this.emit("remove");
                db.unlink(this);
            });
    }
}



//----------------------------------------------------------------------------
LX.User = class User extends LV.EventEmitter {

    constructor(db, skip_check) {

        super();

        this.db = db;
        this.local_db = new LV.PouchDB("lx-user");
        this.user = this.db.stor.user();
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

    authenticate(username, password) {
        this.user.auth(username, password, (ack) => {
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

    register() {
        let username = LV.ShortID.generate();
        let password = LV.ShortID.generate();
        console.log("[User] Create user with username:", username);
        this.user.create(username, password, (ack) => {
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
}
