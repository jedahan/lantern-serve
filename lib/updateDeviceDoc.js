var index = require("../index");
var db = new index.PouchDB("http://localhost/db/lantern");
var log = index.Logger;
    
/**
* Update the device document to match this Lantern server
* References both Raspberry Pi and cloud-hosted devices
*/
module.exports = function updateDeviceDoc(id, name, status, geohash) {
     
    var now = new Date();
    var geo = (geohash ? [geohash] : []);
    status = (typeof(status) == "number" ? status : 0);
    var tag = [];
    
    if (process.env.CLOUD == "true") {
        tag.push("cloud");
    }
    else if(process.env.DEV == "true") {
        tag.push("dev");
    }

    return db.get("d:"+id)
        .then(function(existing_doc) {
            existing_doc.$ua = now;

            if (name) {
                existing_doc.tt = name;
            }
            if (geohash) {
                // avoid storing duplicate geohash
                if (typeof(existing_doc.gp) == "object") {
                    if (existing_doc.gp[existing_doc.gp.length-1] != geohash) {
                        existing_doc.gp.push(geohash);
                    }
                }
                else {
                    existing_doc.gp = geo;
                }
            }
            if (typeof(status) == "number") {
                existing_doc.st = status;
            }

            existing_doc.tg = tag;

            console.log(existing_doc);

            return db.post(existing_doc)
                .then(function(res) {
                    log.info("[db] device updated ", res.rev);
                    return res;
                })
                .catch(function(err) {
                    log.error(err);
                });
        })
        .catch(function(err) {
            if (err.error == "not_found") {
                return db.put({
                        "_id": "d:"+id,
                        "tt": name,
                        "st": status,
                        "gp": geo,
                        "tg": tag,
                        "$ca": now,
                        "$ua": now
                    })
                    .then(function(res) {
                        log.info("[db] device registered ", res.rev);
                        return res;
                    })
                    .catch(function(err) {
                        log.error(err);
                    });
            }
            else {
                log.error(err);
            }
        });
};
    