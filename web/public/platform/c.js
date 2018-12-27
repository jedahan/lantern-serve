(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
Math.limit = function(val, min, max) {
  return val < min ? min : (val > max ? max : val);
}
},{}],3:[function(require,module,exports){
String.prototype.truncate = function (strLen, separator) {
    if (this.length <= strLen) return this;

    separator = separator || '...';

    var sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow/2),
        backChars = Math.floor(charsToShow/2);

    return this.substr(0, frontChars) + 
           separator + 
           this.substr(this.length - backChars);
};
},{}],4:[function(require,module,exports){
"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;


LX.MarkerItem = class MarkerItem extends LX.SharedItem {
    
    constructor(id, data) {



        // now set defaults for key compression
        super(id, data, {
           "geohash": ["g"],
            "tags": ["t", []],
            "owner": ["o"]
        });

        this._icon = null;
        this._set = null;
        this.layer = null;


        this.on("remove", () => {
            this.hide();
        });

        this.on("mode", (mode) => {
            if (this.layer) {
                // keep dom updated to reflect mode
                this.layer.setIcon(this.getDivIcon());
                //console.log(`${this.log_prefix} mode = `, mode);
            }
        });

        // intercept to see if we have a cached version in our atlas already
        if (LT.atlas.markers[id]) {
            console.warn(`${this.log_prefix} using cached marker from atlas`);
            return LT.atlas.markers[id];
        }
    }



    //-------------------------------------------------------------------------
    /**
    * Defines geographic position on map
    *
    * Automatically create a new map layer if not already defined
    */
    set geohash(val) {
        if (val) {

            let starting_val = this._data.geohash;

            try {

                if (val == starting_val) {
                    return;
                }

                this._data.geohash = val;
                //console.log(`${this.log_prefix} location = ${this.geohash}`);


                if (this.layer) {
                    this.layer.setLatLng(this.latlng);
                }
                if (starting_val) {
                    this.emit("move", val);
                }
            }
            catch(e) {
                console.error(`${this.log_prefix} error with geohash`, e);
            }
        }
    }

    get latlng() {
        return LV.Geohash.decode(this._data.geohash);
    }

    get geohash() {
        return this._data.geohash;
    }

 
 
    //-------------------------------------------------------------------------
    /**
    * Show on map
    */
    show() {

        if (this.layer !== null) {
            return;
        }
        else if (!this.latlng) {
            console.error(`${this.log_prefix} cannot show marker with missing geolocation`);
            return;
        }

        //console.log(`${this.log_prefix} showing marker`, this);

        let self = this;
        this.layer = L.marker(this.latlng, {
            icon: this.getDivIcon(),
            draggable: false,
            autoPan: true
        });

        LT.atlas.addToMap(this);

        //console.log(`${this.log_prefix} Show`, this.layer);

        this.layer.on("dragend", function(e) {
            let latlng = e.target._latlng;
            self.geohash = LV.Geohash.encode(latlng.lat, latlng.lng); 
        });
        this.emit("show", self);
    }

    /**
    * Hide from the map without altering stored data
    */
    hide() {
        //console.log(`${this.log_prefix} Hide`);
        if (this.layer && this.layer._map) {
            LT.atlas.removeFromMap(this);
            this.emit("hide", this);            
        }
    }



    //-------------------------------------------------------------------------
    getDivIcon() {
        let cls = "fa";
        if (this._icon) {
            cls += " fa-"+this._icon;
        }
        return L.divIcon({
            html: `<i class="${cls}"></i>`,
            className: `lx-marker lx-marker-${this.mode} ${this.tags.join(" ")}`
        });
    }
    

    getIcon() {
        return this._icon;
    }

    setIcon(value) {
        if (!this.layer) {
            console.error(`${this.log_prefix} marker must have layer before icon can be set`);
            return;
        }

        if (value) {
            // console.log(`${this.log_prefix} icon = ${value}`);
        }
        else {
            // console.log(`${this.log_prefix} clearing icon`); 
        }
        this._icon = value;
        this.layer.setIcon(this.getDivIcon());
    }

    /**
    * Display custom icon based on marker class names
    */
    setIcons(map) {
        this.tags.forEach((tag) => {
            if (map.hasOwnProperty(tag)) {
                this.setIcon(map[tag]);
            }
        });
    }



}
},{}],5:[function(require,module,exports){
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
        return `[i:${this.id}]`.padEnd(20, " ")
    }

    get data() {
        return this._data;
    }

    set tags(val) {
        if (!val || val.length == 0 ) return;

        if (typeof(val) == "object") {
            val.forEach(this.tag.bind(this));
        }
    }

    get tags() {
        return this._data.tags || [];
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
        console.log(`${this.log_prefix} data = ${JSON.stringify(this._data)}`);
    }




    //-------------------------------------------------------------------------
    /**
    * Add tag for data filtering and user interface display
    */
    tag(tag) {
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
        for (var idx in new_data) {
            if (JSON.stringify(this[idx]) != JSON.stringify(new_data[idx])) {
                if (this[idx]) {
                    /*if (typeof(this[idx]) == "object") {
                        console.log(`${this.log_prefix} updating ${idx} object to ${new_data[idx]}`);
                    }
                    else {
                        console.log(`${this.log_prefix} updating ${idx} from ${this[idx]} to ${new_data[idx]}`);
                    }*/
                }
                this[idx] = new_data[idx];
            }
        }
        this.emit("update");
    }




    //-------------------------------------------------------------------------
    /**
    * Stores the composed item into a decentralized database
    */
    save(package_name, field, version) {

        return new Promise((resolve, reject) => {

            if (!LT.db) {
                console.log(`${this.log_prefix} Requires database to publish to`);
                return reject("db_required");
            }

            if (!package_name) {
                console.log(`${this.log_prefix} Requires package to publish to`);
                return reject("name_required");
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

            const completeSave = (version) => {
                this.node = package_node.get("data")
                    .get(version)
                    .get(this.id);

                this.node.put(data)
                    .once((v,k) => {
                        this.mode = "shared"; // shared mode
                        this.emit("save");
                        return resolve();
                    });
            }


            package_node.get("version").then(completeSave);
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

            let package_node = LT.db.get("pkg")
                .get(package_name);

            const completeDrop = (version) => {
                let original_data = {};
                package_node
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
                        resolve();
                    });
            }

            if (version) {
                completeDrop(version);
            }
            else {
                package_node.get("version").then(completeDrop); 
            }

        });
    }
}

},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;

LX.Package =  class Package extends LV.EventEmitter {

	constructor(name, org) {
		super();

		if (!name) {
            console.error(`${this.log_prefix} please name your package to publish`);
            throw new Error("missing_name")
        }	

        if (!org || !org.db) {
            console.error(`${this.log_prefix} please identify a valid organization for this package`);
            throw new Error("missing_org");  	
        }

		this.db = org.db;
		this.organization = org;
		this.node = this.db.get("pkg").get(name);
		this._data = {
			"name": name,
			"public": true, // only supporting public packages, for now
			"version": "0.0.1", // default version number
			//"organization": org.node // reference link to owning organization
		}
	}



    //-------------------------------------------------------------------------
    get log_prefix() {
    	return `[p:${this.name || "new package"}@${this.version}]`.padEnd(20, " ");
    }

	get name() {
		return this._data.name;
	}

	set name(val) {
		this._data.name = val;
	}


	get version() {
		return this._data.version;
	}

	set version(val) {
		this._data.version = val;
	}

	get id() {
		return this._data.name +"@"+this._data.version;
	}


    //-------------------------------------------------------------------------
    /**
    * Find latest version of data
    */
    getNodeForVersion(version) {
    	return this.node.get("data").get(version);
    }

    /**
    * Ensures we have a valid package node to work with
    */
    ensureNode() {
    	return new Promise((resolve, reject) => {
	    	this.node.get("name").once((v,k) => {
	    		if (v) {
	    			resolve(this.node);
	    		}
	    		else {
	    			console.log(`${this.log_prefix} creating node`, this._data);
	    			this.node.put(this._data, (ack) => {
	    				if (ack.err) {
	    					reject(ack.err)
	    				}
	    				else {
	    					resolve(this.node)
	    				}
	    			});
	    		}
	    	})
    	});
    }

    /**
    * Defines the owning organization for this package
    */
    linkOrganization(node) {
    	this.node.get("organization").put(node);
    	node.get("packages").get(this.name).put(this.node);
    }


    /**
    * Saves object data directly to a desired version
    */
    saveVersionData(version, data, force) {
    	if (typeof(data) != "object") {
    		return console.warn(
    			`${this.log_prefix} data to save for ${version} must have object format`
    		);
    	}
		return new Promise((resolve, reject) => {
	    	// identify target data node to write to
		    let version_node = this.getNodeForVersion(version);
	    	version_node.once((v,k) => {
	    		// do not over-write pre-existing version
	    		if (v && !force) {
	                console.log(`${this.log_prefix} version ${version} already published`);
	                resolve(version_node)
	    		}
	    		else {
			    	version_node.put(data, (ack) => {
		    		    if (ack.err) {
		                    reject(ack.err);
		                }
		                else {
		                    console.log(`${this.log_prefix} published version ${version}`);
		                    this.emit("publish", name);
		                    resolve(version_node);
		                }
			    	});
			    }
			});
		});
    }

    //-------------------------------------------------------------------------
	/**
    * Publish a new data package to the network
    */
    publish(version, data) {
    	version = version || this._data.version; // allow default version
		// make sure we have a package node to work with
		return this.ensureNode().then((node) => {
			this.linkOrganization(this.organization.node);
			return this.saveVersionData(version, data || {});
		});
	}

    /*
    * Unpublish removes a data package from the network
    */
    unpublish(version) {
        return new Promise((resolve, reject) => {

            const cb = (v,k) => {
                this.emit("unpublish", name);
                return resolve();
            }
            if (!version) {
                // unpublish all versions
                this.node.put(null, cb);
            }
            else {
            	let version_node = this.getNodeForVersion(version);
            	version_node.put(null, () => {
            		node.get("version").put(null);
            	});
            } 
        });
    }
}
},{}],8:[function(require,module,exports){
"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;


LX.Feed = class Feed extends LV.EventEmitter {

	constructor(user) {
		super();
        this.user = user;
		this.db = user.db;    
		this.packages = {};  // only watch these
		this.topics = {}; // only watch these

	}
    


    //-------------------------------------------------------------------------
    get log_prefix() {
    	return `[f:${this.user.username}]`.padEnd(20, " ");
    }


    onDataUpdate(val, id, pkg_id) {
        var data;

        if (val !== null && typeof(val) == "object") {
            data = {};
            Object.keys(val).forEach(k => {
                if (k != "_") {
                    data[k] = val[k];
                }
            });
        }

        let event = {
            id: id,
            package: pkg_id,
            data: data
        };

        if (this.packages[pkg_id]) {
            this.emit("update", event);
        }
        else {
            console.log("skipping", event)
        }
    }

    /**
    * Allows for manual refresh of data from the feed
    */
    refreshData() {
        Object.keys(this.packages).forEach(id => {
            if (this.packages[id] == false) {
                return;
            }

            console.log(`${this.log_prefix} refreshing data for:`, id)
            let parts = id.split("@");
            let name = parts[0];
            let version = parts[1];
            let package_node = this.db.get("pkg").get(name)
            package_node.get("data")
                .get(version).once((v,k) => {
                    Object.keys(v).forEach((item) => {
                        package_node.get("data").get(version).get(item)
                        .once((v,k) => {
                            this.onDataUpdate(v,k, id);
                        });
                    });

                });
        });
    }



    //-------------------------------------------------------------------------
  	addManyPackages(packages) {
    	packages.forEach(this.addOnePackage.bind(this));
    }

    addOnePackage(id) {
        var parts,name,version;
        try {
            parts = id.split("@");
            name = parts[0];
            version = parts[1];            
        }
        catch(e) {
            console.error(`${this.log_prefix} invalid identifier provided to add package:`, id);
            return;
        }

    	if (this.packages[id]) {
            console.log(`${this.log_prefix} already watching package:`, id);
            return;
        }

    	console.log(`${this.log_prefix} watching changes for package:`, id)


        if (!this.packages.hasOwnProperty(id)) {

            this.packages[id] = true;
            let package_node = this.db.get("pkg").get(name);
            package_node.get("data")
                .get(version).map()
                .on((v,k) => {
                    this.onDataUpdate(v,k,id);
                });
   
        }
        else {
            this.packages[id] = true;
        }

    }


    removeManyPackages(packages) {
    	packages.forEach(this.removeOnePackage.bind(this));
    }

    removeOnePackage(id) {
         try {
            let parts = id.split("@");         
        }
        catch(e) {
            console.error(`${this.log_prefix} invalid identifier provided to remove package ${id}`);
            return;
        }

    	console.log(`${this.log_prefix} unwatch changes for ${id}`)    	
    	this.packages[id] = false;
    }




    //-------------------------------------------------------------------------
    addManyTopics(topics) {
    	topics.forEach(this.addOneTopic.bind(this));
    }

    addOneTopic(name) {    	
    	console.log(`${this.log_prefix} add topic ${name}`)
    	this.topics[name] = true;
    }


    removeManyTopics(topics) {
    	topics.forEach(this.removeOneTopic.bind(this));
    }
    removeOneTopic(name) {
    	console.log(`${this.log_prefix} remove topic ${name}`)
    	this.topics[name] = false;
    }
}
},{}],9:[function(require,module,exports){
"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;

LX.User = class User extends LV.EventEmitter {

    constructor(db) {
        super();
        this.local_db = new LV.PouchDB("lx-user");
        this.db = db;
        this.node = this.db.stor.user();
        this.pair = null;
        this.feed = new LX.Feed(this);

        this.on("auth", () => {
            this.listPackages().then((packages) => {
                this.feed.addManyPackages(packages);
            });
        });

    }

    get log_prefix() {
        return `[u:${this.username || "anonymous" }]`.padEnd(20, " ");
    }


    //-------------------------------------------------------------------------


    authOrRegister(skip_check) {
        if (skip_check) {
            console.log(`${this.log_prefix} make new credentials by explicit request`)
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
                            console.log(`${this.log_prefix} existing saved credentials missing required key: ${key}`);
                        }
                    });
                    if (is_valid) {
                        this.authenticate(creds.username, creds.password)
                            .catch(err => {
                                console.log(`${this.log_prefix}  removing invalid creds from storage`);
                                this.local_db.remove(creds).then(() => { 
                                    this.register();
                                });
                            });
                    }
                    else {
                        console.log(`${this.log_prefix}  removing invalid creds from storage`);
                        this.local_db.remove(creds).then(() => { 
                            this.register();
                        });
                    }
                })
                .catch((e) => {
                    if (e.name == "not_found") {
                        this.register()
                    }
                    else {
                        console.log(`${this.log_prefix} error getting creds`, e);
                    }
                });
        }
    }
    
    /**
    * Authenticates the user with decentralized database
    */
    authenticate(username, password) {
        return new Promise((resolve, reject) => {
            this.node.auth(username, password, (ack) => {
                if (ack.err) {
                    console.log(`${this.log_prefix} bad auth`, ack.err);
                    reject(ack.err);
                }
                else {
                    this.username = username;
                    console.log(`${this.log_prefix} good auth`);
                    SEA.pair().then((pair) => {
                        this.pair = pair;
                        this.emit("auth", this.pair);
                        resolve(this.pair);
                    });
                }
            });
        });
    }


    /**
    * Registers first-time user into the decentralized database
    */
    register() {
        return new Promise((resolve, reject) => {

            let username = LV.ShortID.generate();
            let password = LV.ShortID.generate();
            this.username = username;
            console.log(`${this.log_prefix} create user with username: ${username}`);
            this.node.create(username, password, (ack) => {
                if (ack.err) {
                    console.log(`${this.log_prefix} unable to save`, ack.err);
                    return reject(ack.err);
                }

                console.log(`${this.log_prefix} saved to browser`);

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
                        console.log(`${this.log_prefix}unable to save`, e);
                    });


                this.emit("registered");
                resolve();
            });
        });
    }


    //-------------------------------------------------------------------------

    /**
    * List packages which are installed for this user
    */
    listPackages() {
        return new Promise((resolve, reject) => {
            let node = this.node.get("packages");
            node.once((v,k) => {
                let packages = [];
                if (!v) {
                    return resolve(packages);
                }
                Object.keys(v).forEach((pkg) => {
                    if (pkg == "_"  || pkg == "#" || v[pkg] == null) return;
                    if (typeof(v[pkg]) != "string") {
                        console.warn(`${this.log_prefix} Nullifying non-string value for ${pkg} package:`, v[pkg]);
                        node.get(pkg).put(null);
                    }
                    else {
                        packages.push(pkg + "@" + v[pkg]);
                    }
                });
                resolve(packages);
            });
        });

    }
    /**
    * Installs a package for a given user and thereby makes available to end-user device
    */
    install(pkg) {
        return new Promise((resolve, reject) => {
            let node_to_install = this.node.get("packages").get(pkg.name)

            node_to_install.once((v, k) => {
                    if (v) {
                        console.log(`${this.log_prefix} ${pkg.name}@${pkg.version} package already installed`);
                        resolve(pkg);
                    }
                    else {
                        console.log("package not yet installed", this.node.get("packages"), pkg.name);

                        // does not erase other key/value pairs here
                        this.node.get("packages").get(pkg.name).put(pkg.version, (ack) => {
                            if (ack.err) {
                                reject(ack.err)
                            }
                            else {
                                // id is name@version combined
                                console.log(`${this.log_prefix} ${pkg.id} installed`);
                                this.feed.addOnePackage(pkg.id);
                                this.emit("install", pkg.id);                            
                                resolve(pkg);
                            }
                        });
                    }
                });
        });
    }

     /**
    * Removes a package for a given user and cleans up references to related data
    */
    uninstall(pkg) {
        return new Promise((resolve, reject) => {
             this.node.get("packages").get(pkg.name)
                .put(null)
                .once((v,k) => {
                        console.log(`${this.log_prefix} uninstalled package ${pkg.name}`);
                        this.node.get("packages").get(pkg.name).put(null);
                        this.feed.removeOnePackage(pkg.name);
                        this.emit("uninstall", pkg.name);
                        resolve();
                    });
            });

    }




    //-------------------------------------------------------------------------

    /**
    * List topics the user has subscribed to and wants to receive data for
    */
    listTopics() {
        this.node.get("topics").once((v,k) => {
            if (!v) return;
            Object.keys(v).forEach((pkg) => {
                if (pkg == "_" || v[pkg] == null) return;
                console.log(`${this.log_prefix} subscribed topics ${pkg}:`, v[pkg]);
            });
        });
    }

    /**
    * Explicitly gather data on a given topic from available packages
    */
    subscribe(topic) {
        this.node.get("topics").get(topic).set(true).once(() => {
            console.log(`${this.log_prefix} subscribe to topic ${topic}`);
            this.emit("subscribe", name);
        });
    }
    
    /**
    * Remove and stop watching for data on a given topic
    */
    unsubscribe(topic) {
        this.node.get("topics").get(topic).set(false).once(() => {
            console.log(`${this.log_prefix} unsubscribe from topic ${topic}`);        
            this.emit("subscribe", name);
        });
    }

}

},{}]},{},[1,3,2,5,4,8,9,6,7]);
