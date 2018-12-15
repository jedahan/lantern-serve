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


    onDataUpdate(v,k) {
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
    }

    /**
    * Allows for manual refresh of data from the feed
    */
    refreshData() {
        Object.keys(this.packages).forEach(name => {
            if (this.packages[name] == false) {
                return;
            }

            let package_node = this.db.get("pkg").get(name)

            package_node.get("version")
                .once((version,k) => {
                    console.log(`${this.log_prefix} refreshing data for ${name} version ${version}...`)
                    package_node.get("data")
                        .get(version).map()
                        .once(this.onDataUpdate.bind(this));
                });
        });
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

    	console.log(`${this.log_prefix} watching changes for package ${name}`)

        let package_node = this.db.get("pkg").get(name);

        // use latest version of data
        package_node.get("version")
            .once((version,k) => {
                this.packages[name] = version;
                package_node.get("data")
                    .get(version).map()
                    .on(this.onDataUpdate.bind(this));
            });
    }


    removeManyPackages(packages) {
    	packages.forEach(this.removeOnePackage.bind(this));
    }

    removeOnePackage(name) {
    	console.log(`${this.log_prefix} unwatch changes for ${name}`)    	
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