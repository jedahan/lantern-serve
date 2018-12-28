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
    }

    

    //-------------------------------------------------------------------------
    get log_prefix() {
        return `[db:${this.namespace}]`.padEnd(20, " ")
    }
    


    //-------------------------------------------------------------------------
    /**
    * Ensures a valid database exists and is ready to work with
    */
    load() {
        this.check(this.namespace)
            .then((root) => {
                if (!root) {
                    this.initialize(this.namespace, {force: true}).then(() => {
                        this.emit("load");
                    })
                }
                else {
                    this.emit("load");
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
        return new Promise((resolve, reject) => {
            // do we have good structure in the database?
            let top_level_node = this.stor.get(namespace);
            top_level_node
                .once((v,k) => {
                    let invalid_keys = [];

                    if (typeof(v) != "object") {
                        // database does not exist yet
                         return resolve();
                    }

                    // compare to our template for the node to make sure nodes are expected
                    Object.keys(v).forEach(key => {
                        if (key != "_" && !this.template.hasOwnProperty(key)) {
                            if ( v[key] === null) {
                                // already nullified
                                return;
                            }
                            // nullify bad value
                            top_level_node.get(key).put(null);
                            console.log(`${this.log_prefix} Nullify bad value for key: ${key}`);
                            invalid_keys.push(key);
                        }
                        else if (this.template.hasOwnProperty(key) && v[key] === null) {
                            console.log(`${this.log_prefix} Value ${key} is null but should not be. Resetting...`);
                            top_level_node.get(key).put(this.template[key]);
                        }
                    });
                            
                    if (invalid_keys.length > 0) {
                        reject(`${this.log_prefix}  Cleared unexpected keys at root of node ${namespace}: ${invalid_keys.join(", ")}`);
                    }
                    // expected all nodes. good to go!
                    this.root_node = top_level_node;
                    //console.log(`${this.log_prefix} verified basic database integrity`);
                    this.emit("check");
                    resolve(this.root_node);
                });
        });
    }

    /**
    * Create entirely new database at our selected root
    */
    initialize(namespace, opts) {
        console.log(`${this.log_prefix} initializing database...`);
        opts = opts || {};
        return new Promise((resolve, reject) => {
            let root = this.stor.get(namespace);
            root.once((v,k) => {
                // caution: forced initialization is possible here but will reset entire database
                if (v == undefined || opts.force) {

                    console.log(this.template);

                    this.stor.get(namespace)
                        .put(this.template)
                        .once((v,k) => {

                            if (!v) {
                                return reject("initializing_failed");
                            }
                            console.log(`${this.log_prefix}  created root node`);
                            this.root_node = root;
                            this.emit("initialize");
                            resolve(namespace);
                        });
                }
                else {
                    console.log(`${this.log_prefix} existing root node found`);                       
                    this.root_node = root;
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
                console.log(`${this.log_prefix}  ${path} = `, v);
            }
        });
        return split.length;
    }


    /**
    * Output basic node on .once or .map
    */
    log(v,k) {
        console.log(`${this.log_prefix}  Key ${k} =`, v);
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