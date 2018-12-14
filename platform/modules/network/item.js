"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;

LX.SharedItem = class SharedItem extends LV.EventEmitter {
    constructor(id, data, defaults) {
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


        if (data) {
            this.mode = "shared";
            this.update(data);
        }

        return this;
    }



    //-------------------------------------------------------------------------
    get log_prefix() {
        return `[i:${this.id}]`
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


    set owner(val) {
        this._data.owner = val;
    }


    //-------------------------------------------------------------------------
    inspect() {
        console.log(`${this.log_prefix} data = `, this._data);
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

    /*
    * Updates the local item with packed data
    */
    update(data) {
        let new_data = this.unpack(data);
        
        //console.log(`${this.log_prefix} updating data to:`, data, new_data);
        // only access approved data keys from our map
        for (var idx in new_data) {
            this[idx] = new_data[idx];
        }
        this.emit("update");
    }


    /**
    * Export to shared database
    */
    save(package_name, field) {

        if (!LT.db) {
            return console.log(`${this.log_prefix} Requires database to publish to`);
        }

        if (!package_name) {
            return console.log(`${this.log_prefix} Requires package to publish to`);
        }

        this.mode = "locked"; // lock mode

        // record owner when item is first exported...
        if (!this._data["owner"]) {
            this._data["owner"] = LT.user.username;
        }


        // are we trying to change just a partial?
        let val = (field ? this._data[field] : this._data);
        let data = {};

        if (field) {
            if (!val) {
                return console.error(`${this.log_prefix} unable to save missing field`, field);
            }
            let obj = {};
            obj[field] = val;
            data = this.pack(obj);
        }
        else if (val) {
            data = this.pack(val);
        }

        // save to our shared database...
        let package_node = LT.db.get("pkg")
            .get(package_name);

        package_node.get("version").then((version,k) => {

            this.node = package_node.get("data")
                .get(version)
                .get(this.id);

            this.node.put(data)
                .once((v,k) => {
                    this.mode = "shared"; // shared mode
                    this.emit("save");
                });
        });
    }


    drop(package_name, version) {

        if (!LT.db) {
            return console.error(`${this.log_prefix} requires database to remove from`);
        }
        else if (this.mode == "dropped") {
            // already deleted... skip...
            return;
        }
        
        if (!version) {
            return console.error(`${this.log_prefix} must specify a version you want to remove`);
        }
        if (!package_name) {
            return console.error(`${this.log_prefix} requires package to remove from`);
        }

        console.log(`${this.log_prefix} Dropped`);
        
        let package_node = LT.db.get("pkg")
            .get(package_name);


        let original_data = {};

        package_node.get("version").then((version,k) => {
            this.node = package_node
                .get("data")
                .get(version)
                .get(this.id)
                .once((v,k) => {
                    original_data = v;
                })
                .put(null)
                .once(() => {
                    this.mode = "dropped";
                    this.emit("drop");
                });
            });
    }
}
