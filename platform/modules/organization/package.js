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