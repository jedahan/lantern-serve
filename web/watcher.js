/**
* Lantern Database Watcher
*
*/
const log = require("./util").Logger;
const path = require("path");
const spawnSync = require('child_process').spawnSync;

module.exports = (app) => {

    let node = app.locals.db.get("__LX__").get("pkg");
    let packages = {};
    let items = {};
    let change_hooks = {
        "add": null,
        "update": null,
        "drop": null
    };
    let loaded = false;


    /**
    * Check to see if we have any change hooks from environment
    */
    Object.keys(change_hooks).forEach((key) => {
        let env_var = "HOOK_"+key.toUpperCase();
        if (process.env.hasOwnProperty(env_var)) {
            change_hooks[key] = path.resolve(__dirname+"/../"+process.env[env_var]);
        }
    });

    /**
    * Run an executable to process a change on external system
    */
    const runChangeHook = (key,msg) => {
        if (change_hooks.hasOwnProperty(key) && typeof(change_hooks[key]) == "string") {


            if (app.locals.inbox.hasOwnProperty(msg)) {
                log.debug("watcher > skipping echo from inbox");
            }
            else {
                let result = spawnSync(change_hooks[key], [msg]);
                log.debug("watcher > change hook result = ", String(result.stdout));                            
            }
        }
    }


    /**
    * Watch for and announce changes to given package
    */
    const watchPackage = (v,package_name) => {

        if (v === null) {
            log.warn("watcher > package dropped: " + package_name);
            return;
        }

        if (packages[package_name]) {
            log.warn("watcher > already watching: " + package_name);
            return;
        }

        packages[package_name] = true;
        if (v.hasOwnProperty("version")) {
            let package_id = package_name + "@" + v.version;
            // listen for new and existing items
            node.get(package_name).get("data").get(v.version).map().on((item_data, item_id) => {
                watchItem(item_id, item_data, package_id);
            });
        }
    }


    /**
    * Watch for and announce changes to given item
    */
    const watchItem = (item_id, item_data, package_id) => {

        // detected drop
        if (item_data === null) {
            // this can be triggered when an item is first created due to the way we use put(null)
            // therefore, only indicate deletions if we already know about a valid item
            if (loaded && items[item_id]) {

                let msg = `${package_id}-${item_id}`;
                log.debug("watcher > " + msg);
                runChangeHook("drop", msg);
            }
            return;
        }
            
        // detected add
        if (items[item_id]) return;

        items[item_id] = true;
        if (loaded) {
            let msg = `${package_id}+${item_id}`;
            log.debug("watcher > " + msg);
            runChangeHook("add", msg);
        }
        let package_name = package_id.split("@")[0];
        let version = package_id.split("@")[1];

        // watch for field changes
        node.get(package_name)
            .get("data")
            .get(version)
            .get(item_id)
            .map().on((v,field_id) => {
                // @todo identify issue where inbox can trigger this code
                // to run twice for the same database update
                if (loaded) {
                    let msg = `${package_id}^${item_id}.${field_id}=${v}`;
                    log.debug("watcher > " + msg);
                    runChangeHook("update", msg);
                }
            });
    }


    // listen for updates
    node.once(() => {
        // don't output initial data load
        setTimeout(() => {
            log.debug("watcher > waiting for changes...");
            loaded = true;
        }, 300);
    }).map().on(watchPackage);


}