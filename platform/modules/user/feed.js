"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;


LX.Feed = class Feed extends LV.EventEmitter {

	constructor(db) {
		super();
		this.db = db;    
		this.packages = {};  // only watch these
		this.topics = {}; // only watch these
		this._watching = {}; // keep track of what we're already watching to avoid duplicates

	}
    


    //-------------------------------------------------------------------------
    get log_prefix() {
    	return "[Feed]";
    }



    //-------------------------------------------------------------------------
  	addManyPackages(packages) {
    	packages.forEach(this.addOnePackage.bind(this));
    }

    addOnePackage(name) {
    	if (this.packages[name]) {
            console.log(`${this.log_prefix} Already watching package ${name}`);
            return;
        }

    	console.log(`[Feed] Add Package ${name}`)
    	this.packages[name] = true;

        let package_node = this.db.get("pkg").get(name);            
        // use latest version of data
        package_node.get("version")
            .then((version,k) => {
                package_node.get("data").get(version).map()
                .on((v,k) => {
                	this.emit("update", v);
                });
            });
    }


    removeManyPackages(packages) {
    	packages.forEach(this.removeOnePackage.bind(this));
    }

    removeOnePackage(name) {
    	console.log(`[Feed] Remove Package ${name}`)    	
    	this.packages[name] = false;
    }




    //-------------------------------------------------------------------------
    addManyTopics(topics) {
    	topics.forEach(this.addOneTopic.bind(this));
    }

    addOneTopic(name) {    	
    	console.log(`[Feed] Add Topic ${name}`)
    	this.topics[name] = true;
    }


    removeManyPackages(topics) {
    	topics.forEach(this.removeOneTopic.bind(this));
    }
    removeOnePackage(name) {
    	console.log(`[Feed] Remove Topic ${name}`)
    	this.topics[name] = false;
    }
}