"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;

LX.SharedDatabase = class SharedDatabase extends LV.EventEmitter {

    constructor(uri) {
        super();

        this.namespace = "__LX__";
        this.root_node = null; // root node
        this.template = {
            "pkg": {},
            "org": {}
        } // template for creating a root node
        this.stor = LV.GraphDB(uri); // database instance

        this.check(this.namespace)
            .then((root) => {
                if (!root) {
                    this.initialize(this.namespace, {force: true});
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    /**
    * Check for integrity of database to make sure we have expected data
    */
    check(namespace) {  
        let self = this;
        return new Promise((resolve, reject) => {
            // do we have good structure in the database?
            let top_level_node = self.stor.get(namespace);
            top_level_node
                .once(function(v,k) {
                    let invalid_keys = [];

                    if (typeof(v) != "object") {
                        // database does not exist yet
                         return resolve();
                    }

                    // compare to our template for the node to make sure nodes are expected
                    Object.keys(v).forEach(key => {
                        if (key != "_" && !self.template.hasOwnProperty(key)) {
                            if ( v[key] === null) {
                                // already nullified
                                return;
                            }
                            // nullify bad value
                            top_level_node.get(key).put(null);
                            console.log("[DB] Nullify bad value for key: " + key);
                            invalid_keys.push(key);
                        }
                        else if (self.template.hasOwnProperty(key) && v[key] === null) {
                            console.log(`[DB] Value ${key} is null but should not be`);
                            top_level_node.get(key).put(self.template[key]);
                        }
                    });
                            
                    if (invalid_keys.length > 0) {
                        reject(`[DB] Cleared unexpected keys at root of node ${namespace}: ${invalid_keys.join(", ")}`);
                    }
                    // expected all nodes. good to go!
                    self.root_node = top_level_node;
                    //console.log("[DB] Check completed successfully for namespace: " + namespace);
                    self.emit("check");
                    self.emit("load");
                    resolve(self.root_node);
                });
        });
    }

    /**
    * Create entirely new database at our selected root
    */
    initialize(namespace, opts) {
        console.log(`[DB] Initializing at namespace: ${namespace}`);
        let self = this;
        opts = opts || {};
        return new Promise((resolve, reject) => {
            let root = self.stor.get(namespace);
            root.once(function(v,k) {
                // caution: forced initialization is possible here but will reset entire database
                if (v == undefined || opts.force) {

                    self.stor.get(namespace)
                        .put(self.template)
                        .once((v,k) => {
                            console.log(`[DB] Created root node: ${namespace}`);
                            self.root_node = root;
                            self.emit("initialize");
                            self.emit("load");
                            resolve(namespace);
                        });
                }
                else {
                    console.log(`[DB] Existing root node found: ${namespace}`);                       
                    self.root_node = root;
                    self.emit("load");
                    resolve(namespace);
                }

            });
        });
    }


    //-------------------------------------------------------------------------
    /**
    * Get node from within root namespace
    */
    get() {
        return this.root_node.get.apply(this.root_node, arguments);
    }

    /**
    * Sets value from within root namespace
    */
    put() {
        return this.root_node.put.apply(this.root_node, arguments);
    }



    //-------------------------------------------------------------------------
   
    /**
    * Prints out value of a node selected by a path/to/node
    */
    print(path,pointer,node) {
        // recursive attempt to narrow down to target node
        if (!pointer) pointer = path;
        if (!node) node = this.root_node;
        let split = pointer.split(".");
        node.get(split[0]).once((v,k) => {
            if (split.length > 1) {
                let new_pointer = split.slice(1).join(".");
                node = node.get(k);
                this.print(path,new_pointer,node);
            }
            else {
                // we reached the target node here
                console.log(`[DB] ${path} = `, v);
            }
        });
        return split.length;
    }



    /**
    *  Print out the graph structure of a specified node
    */
    inspect(show_deleted,json,level) {
        let self = this;
        if (!json) {
            return self.jsonify().then((new_json) => {
                this.inspect(show_deleted, new_json, level);
            });
        }

        level = level || "";
        
        Object.keys(json).forEach(k => {

            if (k == "#") return;

            let v = json[k];

            // printable value
            let vp = v;
            if (typeof(v) == "String") {
                vp = v.truncate(30);
            }

            if (v === null) {
                if (show_deleted) {
                    console.log(`${level}[ø] ${k}`);
                }
            }
            else if (typeof(v) == "object") {
                let length = Object.keys(v).length;
                console.log(`${level}[+] ${k}`);
                self.inspect(show_deleted,v,level+"  ");

            }
            else {
                console.log(`${level}|- ${k} = `, vp);
            }
        });
    }


    /**
    * Exports data structure to a basic JSON object with hierarchy
    */
    jsonify(node, tree, pointer) {

        let self = this;
        node = node || self.root_node;
        tree = tree || {};
        pointer = pointer || tree;

        return new Promise((resolve, reject) => {
            node.once((v,k) => {
                pointer[k] = {};
                let promises = [];
                if (v) {


                    let items = Object.keys(v).filter(key => key != "_");
                    items.forEach((item) => {
                        var promise;
                        let val = v[item];


                        if (item == "organization" || item == "packages") {
                            // special rule for packages to avoid circular display of organization data
                            promise = new Promise((resolve, reject) => {
                                node.get(item).once((val,key) => {
                                    let names = {};
                                    
                                    if (val.name) {
                                        pointer[k][item] = val.name;
                                        return resolve(val.name);
                                    }

                                    Object.keys(val).forEach((name) => {
                                        if (name != "_") names[name] = true;
                                    });
                                    
                                    pointer[k][item] = names;
                                    resolve(names);
                                });
                            });
                        }
                        else if (val !== null && typeof(val) == "object") {
                            promise = self.jsonify.apply(self, [node.get(item), tree, pointer[k]]);
                        }
                        else {
                            promise = pointer[k][item] = val;
                        }
                        promises.push(promise);
                    });
                }
              
                Promise.all(promises).then((val) => {
                    resolve(tree);
                });
            });
        });
    };

}