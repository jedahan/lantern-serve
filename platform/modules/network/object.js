"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;

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

    get data() {
        return this._data;
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
