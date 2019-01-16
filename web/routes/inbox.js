"use strict"

const util = require("../util");
const log = util.Logger;
const message = require("../middleware/message");

module.exports = (serv) => {
   
    const msg_apply = {};

    /**
    * Add a node to the database
    */
    msg_apply.add = (data, db) => {
        return new Promise((resolve, reject) => {
            let node = getNode(data, db);
            node.once((v,k) => {
                if (v) {
                    // item already exists, do not try adding again...
                    return resolve(false);
                }
                node.put({}, (ack) => {
                    if (ack.err) {
                        return reject("inbox_add_failed");
                    }
                    resolve(true);
                });
            });
        });
    };

    /**
    * Update existing database field
    */
    msg_apply.update = (data, db) => {
        return new Promise((resolve, reject) => {
            let node = getNode(data, db);

            node.once((v,k) => {
                if (v == undefined) {
                    reject("inbox_update_failed_missing_item");
                }
                else {
                    node
                        .get(data.field_key)
                        .put(data.field_value, (ack) => {
                            if (ack.err) {
                                return reject("inbox_update_failed");
                            }
                            resolve(true);
                        });
                }
            })
        });
    }

    /**
    * Drop a node from database
    */
    msg_apply.drop = (data, db) => {
        return new Promise((resolve, reject) => {
            let node = getNode(data, db);
            node.put(null, (ack) => {
                if (ack.err) {
                    return reject("inbox_drop_failed");
                }                   
                resolve(true);
            });
        });
    }

    /**
    * Retrieve the working node for this message
    */
    const getNode = (data, db) => {
        // in some cases package may be unknown to this device
        // receive and store data, anyway... just to be safe...
        return db.get("__LX__")
            .get("pkg")
            .get(data.package_name)
            .get("data")
            .get(data.package_version)
            .get(data.item_id);
    }

    

    //---------------------------------------------------------------------- 

    /**
    * List inbox messages received
    */
    serv.get("/api/inbox", (req, res) => {

        let messages = [];
        Object.keys(res.app.locals.inbox).forEach(key => {
            messages.push(key);
        });
        res.status(200).json({
            "messages": messages
        });
    })

    /**
    * Accept messages to convert into database updates
    */
    // @todo support multi-message inbox inputs
    serv.put("/api/inbox", message, (req, res) => {
        let msg = req.body.message;
        // @todo can make this persistent if needed using a queue
        // log the received messaged for future output
        // also allows us to prevent infinite loops (don't trigger change hooks on incoming messages)
        let msg_key = util.getSimpleMessage(msg);

        let inbox = res.app.locals.inbox;

        inbox[msg_key] =  inbox[msg_key] || {};
        inbox[msg_key][new Date().getTime()] = req.ip;
        log.debug("  inbox >> " + (msg[1] == "|" ? " " : "") + msg);
        let inboxfn = msg_apply[res.locals.message.type]
        inboxfn(res.locals.message, req.app.locals.db)
            .then((success) => {
                res.status(201).json({"ok": success});
            })
            .catch((e) => {
                res.status(500).json({"ok": false, "err": e}) 
            });
    }); 
};

