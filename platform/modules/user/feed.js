"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;


LX.Feed = class Feed extends LV.EventEmitter {

	constructor(user) {
		super();
        this.user = user;
		this.db = user.db;    
		this.packages = {};  // only watch these
		this.topics = {}; // only watch these
		this._watching = {}; // keep track of what we're already watching to avoid duplicates

	}
    


    //-------------------------------------------------------------------------
    get log_prefix() {
    	return `[f:${this.user.username}]`.padEnd(20, " ");
    }



    //-------------------------------------------------------------------------
  	addManyPackages(packages) {
    	packages.forEach(this.addOnePackage.bind(this));
    }

    addOnePackage(name) {
    	if (this.packages[name]) {
            console.log(`${this.log_prefix} already watching package ${name}`);
            return;
        }

    	console.log(`${this.log_prefix} add package ${name}`)
    	this.packages[name] = true;

        let package_node = this.db.get("pkg").get(name);

        // use latest version of data
        package_node.get("version")
            .then((version,k) => {
                package_node.get("data").get(version).map()
                .on((v,k) => {
                    let data = v;

                    if (v !== null && typeof(v) == "object") {
                        data = {};
                        Object.keys(v).forEach(key => {
                            if (key != "_") {
                                data[key] = v[key];
                            }
                        });
                    }

                	this.emit("update", {
                        id: k,
                        data: data
                    });
                });
            });
    }


    removeManyPackages(packages) {
    	packages.forEach(this.removeOnePackage.bind(this));
    }

    removeOnePackage(name) {
    	console.log(`${this.log_prefix} remove package ${name}`)    	
    	this.packages[name] = false;
    }




    //-------------------------------------------------------------------------
    addManyTopics(topics) {
    	topics.forEach(this.addOneTopic.bind(this));
    }

    addOneTopic(name) {    	
    	console.log(`${this.log_prefix} add topic ${name}`)
    	this.topics[name] = true;
    }


    removeManyPackages(topics) {
    	topics.forEach(this.removeOneTopic.bind(this));
    }
    removeOnePackage(name) {
    	console.log(`${this.log_prefix} remove topic ${name}`)
    	this.topics[name] = false;
    }
}