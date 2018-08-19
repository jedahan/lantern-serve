var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");

var util = require("../util");
var log = util.Logger;
var db = util.CoreDatabase;

/*
* Allows user to easily load latest web assets onto the server
*/
module.exports = function routeAPI(serv) {

  
    serv.get("/api/version", function(req, res) {
        var package_file_path = path.join(__dirname, "..", "package.json");
        var obj = JSON.parse(fs.readFileSync(package_file_path, 'utf8'));
        res.status(200).json({"name":"Lantern (JavaScript)","version": obj.version});
    });

    serv.post("/api/name", bodyParser.json(), function(req, res) {
        var id = util.getDeviceIdentifier();
        if (req.body.name && typeof(req.body.name) == "string") {
            if (req.body.name.length != 3) {
                return res.status(409).json({"ok": false, "message": "Name must be 3 characters in length"});
            }
            log.info("setting name of host to: " + req.body.name);
            
            util.saveDeviceName(req.body.name);

            return res.status(201).json({"ok": true, "id": id, "name": req.body.name});
        }
        else {
            return res.status(409).json({"ok": false, "id": id, "message": "Required parameter not found: name"});
        }
    });


    serv.get("/api/info", function(req, res) {
        var id = util.getDeviceIdentifier();
        util.getDeviceName().then(function(name) {
            res.status(200).send({
                "id": id, 
                "name": name,
                "cloud": (process.env.CLOUD == "true")
            });
        });
    });


    serv.get("/api/name", function(req, res) {
        var id = util.getDeviceIdentifier();
        util.getDeviceName().then(function(name) {
            res.status(200).send({
                "id": id, 
                "name": name
            });
        });
    });


    serv.get("/api/geo", function(req, res) {
        var id = util.getDeviceIdentifier();
        db.get("d:"+ id)
            .then(function(doc) {
                if (doc.gp && doc.gp.length) {
                    res.status(200).send({"id":id, "geo": doc.gp[doc.gp.length-1]});
                }
                else {
                    // return most recent geolocation
                    res.status(200).send({"id":id, "geo": null});
                }
            })
            .catch(function(err) {
                log.error(err);
                res.status(500).send();
            });
    });

    serv.post("/api/geo", bodyParser.json(), function(req, res) {
        var id = util.getDeviceIdentifier();
        if (req.body.geo && typeof(req.body.geo) == "string") {
            util.saveDeviceLocation(req.body)
                .then(function() {
                    res.status(201).send({"ok": true, "id": id, "geo": req.body.geo});
                });
        }        
        else {
            return res.status(409).json({"ok": false, "id": id, "message": "Required parameter not found: geo"});
        }
    });


    serv.get("/api/id", function(req, res) {
        res.status(200).send({"id": util.getDeviceIdentifier()});
    });


    serv.post("/api/ui", function(req, res) {
        require("../bin/refresh")(function() {
            res.status(201).json({"ok": true});
        });
    });
};