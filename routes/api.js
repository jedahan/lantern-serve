var index = require("../index");
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");

var updateDeviceDoc = require("../lib/updateDeviceDoc");
var updateWebInterface = require("../lib/updateWebInterface");
var index = require("../index");
var log = index.Logger;

/*
* Allows user to easily load latest web assets onto the server
*/
module.exports = function routeAPI(serv) {


    function getDeviceIdentifier() {
        var file_path = path.join(__dirname, "..", "config.json");
        var obj = JSON.parse(fs.readFileSync(file_path, "utf8"));
        return obj.id;
    }

    serv.get("/api/version", function(req, res) {
        var file_path = path.join(__dirname, "..", "package.json");
        var obj = JSON.parse(fs.readFileSync(file_path, 'utf8'));
        res.status(200).json({"name":"Lantern (JavaScript)","version": obj.version});
    });

    serv.post("/api/name", bodyParser.json(), function(req, res) {
        if (req.body.name && typeof(req.body.name) == "string") {

            if (req.body.name.length != 3) {
                return res.status(409).json({"success": false, "message": "Name must be 3 characters in length"});
            }
            log.info("setting name of host to: " + req.body.name);
            var file_path = path.join(__dirname, "..", "config.json");
            var obj = JSON.parse(fs.readFileSync(file_path, "utf8"));
            obj.name = req.body.name;
            fs.writeFileSync(file_path, JSON.stringify(obj), "utf8");
            updateDeviceDoc(getDeviceIdentifier(), obj.name);
            return res.status(201).json({"success": true, "name": req.body.name});
        }
        else {
            return res.status(409).json({"success": false, "message": "Required parameter not found: name"});
        }
    });


    serv.get("/api/name", function(req, res) {
        var file_path = path.join(__dirname, "..", "config.json");
        var obj = JSON.parse(fs.readFileSync(file_path, "utf8"));
        res.status(200).send({"name": obj.name});
    });



    serv.get("/api/id", function(req, res) {
        res.status(200).send({"id": getDeviceIdentifier()});
    });


    serv.post("/api/ui", function(req, res) {
        updateWebInterface(function() {
            res.status(201).json({success: true});
        });
    });
};