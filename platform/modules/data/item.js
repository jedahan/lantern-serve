"use strict";
const LX = window.LX || {}; if (!window.LX) window.LX = LX;

LX.Item = class Item extends LV.EventEmitter {
    constructor(id, data, defaults) {
        super();
        this.id = id || LV.ShortID.generate();
        this._mode = "draft";

        // create data space for data we allow to be exported to shared database
        this._data = {};

        // always include these defaults
        let global_defaults = {
            "owner": ["o"],
            "editors": ["e", []],
            "tags": ["t", []]
        }

        defaults = Object.assign(global_defaults, defaults);

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
    inspect() {
        console.log(`${this.log_prefix} data = ${JSON.stringify(this._data)}`);
    }

    get log_prefix() {
        return `[i:${this.id}]`.padEnd(20, " ")
    }

    get data() {
        return this._data;
    }


    //------------------------------------------------------------------- OWNER
    /**
    * User that created this item / has primary control of this item 
    */
    get owner() {
        return this._data.owner;
    }

    /**
    * Defines the owner for this item
    */
    set owner(val) {
        this._data.owner = val;
    }




    //----------------------------------------------------------------- EDITORS
    /**
    * Gets a list of all item editors
    */
    get editors() {
        return this._data.editors;
    }

    /**
    * Sets the entire list of editors for this item
    */
    set editors(val) {
        if (!val || val.length == 0 ) return;

        if (typeof(val) == "object") {
            val.forEach(this.editor.bind(this));
        }
    }


    /**
    * Adds a new editor to the item
    */
    editor(val) {
        if (this._data.editors.indexOf(val) > -1) {
            return;
        }
        this._data.editors.push(val);
        this.emit("editor", val);
    }

    //-------------------------------------------------------------------- MODE
    get mode() {
        return this._mode;
    }
    set mode(val) {
        this._mode = val;
        this.emit("mode", val);
    }



    //-------------------------------------------------------------------- TAGS
    /**
    * Gets a list of all tags, often used to alter per-app display or logic
    */
    get tags() {
        return this._data.tags || [];
    }

    /**
    * Sets the entire list of tags with specified array
    */
    set tags(val) {
        if (!val || val.length == 0 ) return;

        if (typeof(val) == "object") {
            val.forEach(this.tag.bind(this));
        }
    }
    
    /**
    * Add tag for data filtering and user interface display
    */
    tag(tag) {
        if (!tag) return;
        tag = this.sanitizeTag(tag);

        this._data.tags = this._data.tags || [];
        //console.log(`${this.log_prefix} tag = `, tag);

        // don't allow duplicate tags
        if(this._data.tags.indexOf(tag) > -1) {
            return;
        }

        this._data.tags.push(tag);
        this.emit("tag", tag);
        return this.tags;
    }
    
    /**
    * Remove tag
    */
    untag(tag) {
        if (!tag) return;
        tag = this.sanitizeTag(tag);
        this._data.tags.remove(tag);
        this.emit("untag", tag);
        return this.tags;
    }
    

    /**
    * Remove all tags
    */
    untagAll() {
        this._data.tags.forEach((tag) => {
            this.emit("untag", tag);
        });
        this._data.tags = [];
        return this.tags;
    }
    
    /**
    * Keep tags lowercase and with dash seperators
    */
    sanitizeTag(tag) {
        return tag.toLowerCase().replace(/[^a-z0-9\-]+/g, '');
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
                if (v && v.constructor === Array) {
                    new_obj[k] = "Å"+v.join(",");
                }
                else if (v) {
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

    /*
    * Updates the local item with packed data
    */
    update(data) {
        let new_data = this.unpack(data);
        
        // only access approved data keys from our map
        // only listen for changes when we have a getter/setter pair 
        for (var idx in new_data) {
            if (JSON.stringify(this[idx]) != JSON.stringify(new_data[idx])) {
                
                let do_update_field = false;

                if (this[idx]) {
                    if (typeof(this[idx]) == "object") {
                        if (this[idx].length) {
                            do_update_field = true;
                            console.log(`${this.log_prefix} changing ${idx} object to ${new_data[idx]}`);
                        }
                    }
                    else if (this[idx]) {
                        console.log(`${this.log_prefix} changing ${idx} from ${this[idx]} to ${new_data[idx]}`);
                        do_update_field = true;
                    }
                }

                this[idx] = new_data[idx];
                if (do_update_field) {
                    this.emit("update", new_data);                    
                }
            }
        }
    }




    //-------------------------------------------------------------------------
    /**
    * Stores the composed item into a decentralized database
    */
    save(package_name, fields, version) {


        return new Promise((resolve, reject) => {

            if (!LT.db) {
                console.log(`${this.log_prefix} Requires database to publish to`);
                return reject("db_required");
            }

            if (!package_name) {
                console.log(`${this.log_prefix} Requires package to publish to`);
                return reject("name_required");
            }


            // save to our shared database...
            const completeSave = (version) => {

                if (!version) {
                    return reject("missing_version");
                }

                let item = {};
                item[this.id] = data;

                let node = LT.db.get("pkg")
                    .get(package_name)
                    .get("data")
                    .get(version)
                    .get(this.id);

                node.once((v,k) => {
                    if (v) {
                        // update existing node
                        Object.keys(data).forEach((key) => {
                            let val = data[key];
                            node.get(key).put(val, (ack) => {
                                console.log(`${this.log_prefix} saved`, key, val);
                            });
                        });
                        this.emit("save");
                        return resolve();
                    }
                    else {
                        node.put(null).put(data, (ack) => {
                            if (ack.err) {
                                reject(ack.err);
                            }
                            else {
                                // now register the node for our package
                                LT.db.get("pkg")
                                    .get(package_name)
                                    .get("items")
                                    .set(this.id)
                                    .once((v,k) => {

                                        console.log(`${this.log_prefix} saved`, data);
                                        this.mode = "shared"; // shared mode
                                        this.emit("save");
                                        return resolve();
                                    });
                            }
                        });
                    }

                });

            }


            this.mode = "locked"; // lock mode

            // record owner when item is first exported...
            if (!this._data["owner"]) {
                this._data["owner"] = LT.user.username;
            }


            // are we trying to change just a partial?
            let data = {};
            if (fields) {

                let obj = {};
                if (fields.constructor === Array) {
                    fields.forEach((field) => {
                        obj[field] = this._data[field]
                    });
                }
                else if (typeof(fields) == "string") {
                    obj[fields] = this._data[fields];
                }
                data = this.pack(obj);
            }
            else {
                data = this.pack(this._data);
            }


            // save to appropriate package version...
            if (version) {
                completeSave(version);
            }
            else {
                LT.db.get("pkg")
                    .get(package_name)
                    .get("version")
                    .once(completeSave);
            }
        });
    }


    /**
    * Clears the value of the item and nullifies in database (full delete not possible)
    */
    drop(package_name, version) {

        return new Promise((resolve, reject) => {

            if (!LT.db) {
                console.error(`${this.log_prefix} requires database to remove from`);
                return reject("db_required");
            }
            else if (this.mode == "dropped") {
                // already deleted... skip...
                return resolve();
            }
            
            if (!package_name) {
                return console.error(`${this.log_prefix} requires package to remove from`);
            }

            const completeDrop = (version) => {
                let original_data = {};
                    LT.db.get("pkg")
                    .get(package_name)
                    .get("data")
                    .get(version)
                    .get(this.id)
                    .once((v,k) => {
                        original_data = v;
                    })
                    .put(null)
                    .once(() => {
                        console.log(`${this.log_prefix} Dropped`);
                        this.mode = "dropped";
                        this.emit("drop");

                        LT.db.get("pkg")
                            .get(package_name)
                            .get("items")
                            .unset(this.id)
                            .once((v,k) => {
                                this.emit("drop");
                                return resolve();
                            });
                    });
            }

            if (version) {
                completeDrop(version);
            }
            else {
                LT.db.get("pkg")
                    .get(package_name)
                    .get("version")
                    .once(completeDrop); 
            }

        });
    }
}
