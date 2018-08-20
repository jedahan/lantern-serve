var bodyParser = require("body-parser");
var util = require("../util");
var log = util.Logger;
var db = util.CoreDatabase;


//----------------------------------------------------------------------

/**
* Replicate data across two PouchDB/CouchDB Servers
*/
function runSync(direction) {
    var target = "https://lantern.global/db/lnt/";
    log.info("attempting sync with: " + target);

    util.checkInternet()
        .then(function(is_connected) {
            if (!is_connected) {
                return res.status(403).send({
                    "ok": false, 
                    "target": target, 
                    "message": "Unable to reach internet for " + direction
                });
            }

            db[direction || "sync"](target, {
                    live: false,
                    retry: false
                }).then(function(result) {
                    return res.status(201).send({
                        "ok": true, 
                        "target": target, 
                        "data": result
                    });
                });
        });
 }


/**
*. Convert message string into a meaningful JSON document for PouchDB/CouchDB
*/
function makeDocumentFromMessage(msg) {
    // attempt to split message into meaningful parts
    var input = msg.replace(/\^+/, '\x01').split('\x01');
    var version = input[0]; // @todo use real version management vs. revision count
    var parts = input[1].split("?");

    // begin constructing doc based on message
    var doc = {
        "_id": parts[0],
        "$rx": true, // document received by long-range radio, don't push back out
        "$rv": Number(version) // reference version
    };
    var key_parts = parts[1].split("&");
    key_parts.forEach(addKeyValuePair.bind(doc));
    log.info(doc);
    return doc;
}

function addKeyValuePair(part) {
    var doc = this;
    
    var item = part.split("=");
    var k = item[0];
    var v = item[1];
    if (!k || v === undefined ) {
        return;
    }
    // double-check to make sure we don't process $key or _key
    if (k[0] == "$" || k[0] == "_") {
        return;
    }
    v = decodeURIComponent(v);
    // is this a comma-separated list? if so, assume array
    if (v[0] == ",") {
        doc[k] = new Array();
        v.split(",").forEach(function(val) {
            if (val) doc[k].push(val);
        });
    }
    // is this a number?
    else if (v[0] == "#") {
        doc[k] = Number(v.substr(1, v.length-1));
    }
    else {
        doc[k] = v;                
    }
}

function updateDocumentFromMessage(new_doc) {

    // pull specified version message
    // preserved for reference if brand new document is saved to database
    var version = Number(new_doc.$rv);

    // is this document new enough to work with?
    return db.get(new_doc._id)
        .then(function(old_doc) {
            log.info("old doc: ", old_doc);

            var old_version = Number(old_doc.$rv) || Number(old_doc._rev.split("-")[0]);

            log.info("version = " + version + " vs " + old_version);

            if (version <= old_version) {
                throw new Error("Skipping older or same version of document")
            }

            // start by modifying the original document we have stored locally
            var final_doc = old_doc;

            // check for any changes
            var did_change = false;
            for (var idx in new_doc) {
                if (idx[0] != "$") {
                    if (!old_doc.hasOwnProperty(idx) || 
                        JSON.stringify(old_doc[idx]) != JSON.stringify(new_doc[idx])) {
                        final_doc[idx] = new_doc[idx];
                        did_change = true;
                    }
                }
            }

            final_doc.$rv = version;

            if (!did_change) {
                throw new Error("Skipping unchanged document");
            }
            else {
                log.info("final doc: ", final_doc)
                return db.post(final_doc);
            }
        })
}



//----------------------------------------------------------------------
/*
* Simplified sync functionality for common operations 
*/
module.exports = function routeSync(serv) {


    // finds cloud service or connected wifi device according to availability
    serv.post(["/sync/", "sync/sync"], function(req, res) {
        return runSync("sync");
    });

    serv.post("/sync/pull", function(req, res) {
        return runSync("pull");
    });

    serv.post("/sync/push", function(req, res) {
        return runSync("push");
    });

    serv.post("/sync/message",  bodyParser.json(), function(req, res) {
        log.info("------------------")
        log.info("message to sync: " + req.body.message);

        if (!req.body.message || req.body.message.indexOf("?") == -1) {
            return res.status(403).send({
                "ok": false, 
                "message": "Ignoring empty or invalid message"
            });
        }

        var new_doc = makeDocumentFromMessage(req.body.message);
        updateDocumentFromMessage(new_doc)
            .then(function(response) {
                return res.status(201).send(response);
            })
            .catch(function(err) {
                 if (err.error == "not_found") {
                    // if doc is brand new, create here in this database...
                    db.put(new_doc).then(function(response) {
                        return res.status(201).send(response);
                    });
                }
                else {
                    return res.status(403).send({
                            "ok": false, 
                            "message": String(err).replace("Error: ", "")
                        });
                }
            });
    });
};