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
    var tag = (process.env.CLOUD == 'true' ? ['cloud'] : []);


    db.get("d:"+id)
        .then(function(existing_doc) {
            existing_doc.$ua = now;
            existing_doc.st = status;
            existing_doc.tt = name;
            existing_doc.gp = geo;
            existing_doc.tg = tag;

            db.post(existing_doc)
                .then(function(res) {
                    log.info("[db] device updated ", res.rev);
                })
                .catch(function(err) {
                    log.error(err);
                });
        })
        .catch(function(err) {
            if (err.error == "not_found") {
                db.put({
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
    