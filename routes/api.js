var index = require("../index");
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");

var updateDeviceDoc = require("../lib/updateDeviceDoc");
var updateWebInterface = require("../lib/updateWebInterface");
var index = require("../index");
var log = index.Logger;
var db = new index.PouchDB("http://localhost/db/lnt");

/*
* Allows user to easily load latest web assets onto the server
*/
module.exports = function routeAPI(serv) {


    function getDeviceIdentifier() {
        var file_path = path.join(__dirname, "..", "conf", "lantern.json");
        var obj = JSON.parse(fs.readFileSync(file_path, "utf8"));
        return obj.id;
    }

    function getDeviceName() {
        var file_path = path.join(__dirname, "..", "conf", "lantern.json");
        var obj = JSON.parse(fs.readFileSync(file_path, "utf8"));
        return obj.name;
    }

    serv.get("/api/version", function(req, res) {
        var file_path = path.join(__dirname, "..", "package.json");
        var obj = JSON.parse(fs.readFileSync(file_path, 'utf8'));
        res.status(200).json({"name":"Lantern (JavaScript)","version": obj.version});
    });

    serv.post("/api/name", bodyParser.json(), function(req, res) {
        var id = getDeviceIdentifier();
        if (req.body.name && typeof(req.body.name) == "string") {
            if (req.body.name.length != 3) {
                return res.status(409).json({"success": false, "message": "Name must be 3 characters in length"});
            }
            log.info("setting name of host to: " + req.body.name);
            var file_path = path.join(__dirname, "..", "conf", "lantern.json");
            var obj = JSON.parse(fs.readFileSync(file_path, "utf8"));
            obj.name = req.body.name;
            fs.writeFileSync(file_path, JSON.stringify(obj), "utf8");
            updateDeviceDoc(id, obj.name);
            return res.status(201).json({"success": true, "id": id, "name": req.body.name});
        }
        else {
            return res.status(409).json({"success": false, "id": id, "message": "Required parameter not found: name"});
        }
    });


    serv.get("/api/name", function(req, res) {
        var id = getDeviceIdentifier();
        var name = getDeviceName();
        res.status(200).send({
            "id": id, 
            "name": name,
            "cloud": (process.env.CLOUD == "true")
        });
    });


    serv.get("/api/geo", function(req, res) {
        var id = getDeviceIdentifier();
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
        var id = getDeviceIdentifier();
        var name = getDeviceName();
        if (req.body.geo && typeof(req.body.geo) == "string") {

            db.get("d:"+ id)
                .then(function(doc) {

                    if (doc.gp[doc.gp.length-1] == req.body.geo) {
                        return res.status(200).json({"success": true, "id": id, "geo": req.body.geo});
                    }
                    else {

                        updateDeviceDoc(id, name, req.body.geo)
                            .then(function() {
                                res.status(201).send({"success": true, "id": id, "geo": req.body.geo});
                            });
                    }
                });
        }        
        else {
            return res.status(409).json({"success": false, "id": id, "message": "Required parameter not found: geo"});
        }

    });


    serv.get("/api/id", function(req, res) {
        res.status(200).send({"id": getDeviceIdentifier()});
    });


    serv.post("/api/ui", function(req, res) {
        updateWebInterface(function() {
            res.status(201).json({"success": true});
        });
    });
};