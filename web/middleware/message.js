"use strict"

const util = require("../util");

//----------------------------------------------------------------------
module.exports = (req, res, next) => {
 

    /**
    * Regular expressions to identify intent of message
    */
    const msg_regex = {
        add: /([0-9]+)\|([a-z]+)@([0-9\.]+)\+([a-zA-Z0-9]+)/,
        update: /([0-9]+)\|([a-z]+)@([0-9\.]+)\^([a-zA-Z0-9]+)\.([a-z]*)\=(\w+)/,
        drop: /([0-9]+)\|([a-z]+)@([0-9\.]+)\-([a-zA-Z0-9]+)/
    }

    /**
    * Convert regular expression match to key/value pairs
    */
    const getObject = (matches, type) => {
        let obj = {
            type: type
        };
        let keys = {
            0: "text",
            1: "seq",
            2: "package_name",
            3: "package_version",
            4: "item_id",
            5: "field_key",
            6: "field_value"
        }
        for (var idx in matches) {
            if (keys[idx]) {
                obj[keys[idx]] = matches[idx];
            }
        }
        return obj;
    } 

    if (!req.body.message) {
        return res.status(403).json({
            "ok": false, 
            "message": "Ignoring empty message"
        });
    }
    else {
        if (typeof(req.body.message) != "string") {
            return res.status(403).json({
                "ok": false,
                "message": "Ignoring invalid message"
            });
        }
        else {
     
            Object.keys(msg_regex).forEach((k) => {
                let exp = msg_regex[k];
                if (exp.test(req.body.message)) {
                    res.locals.message = getObject(req.body.message.match(exp), k);
                }
            });

            if (!res.locals.message) {
                return res.status(403).json({
                    "ok": false,
                    "message": "Ignoring invalid message"
                });                
            }
            else {
                next();
            }
        }
    }

};