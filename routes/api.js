var index = require("../index");
var fs = require("fs");
var path = require("path");


/*
* Allows user to easily load latest web assets onto the server
*/
module.exports = function routeUpdates(serv) {

    serv.get("/api/version", function(req, res) {
        var file_path = path.join(__dirname, "..", "package.json");
        var obj = JSON.parse(fs.readFileSync(file_path, 'utf8'));
        res.status(200).json({"name":"Lantern (JavaScript)","version": obj.version});
    });

    serv.post("/api/name", function(req, res) {
        if (req.body.name && typeof(req.body.name) == "string") {
            console.log("setting identity of host to: " + req.body.name);
            var file_path = path.join(__dirname, "..", "config.json");
            var obj = JSON.parse(fs.readFileSync(file_path, "utf8"));
            obj.name = req.body.name;
            fs.writeFileSync(file_path, JSON.stringify(obj), "utf8");
            return res.status(201).json({"success": true, "name": req.body.name});
        }
    });


    serv.get("/api/name", function(req, res) {
        var file_path = path.join(__dirname, "..", "config.json");
        var obj = JSON.parse(fs.readFileSync(file_path, "utf8"));
        res.status(200).send({"name": obj.name});
    });



    serv.get("/api/id", function(req, res) {
        var file_path = path.join(__dirname, "..", "config.json");
        var obj = JSON.parse(fs.readFileSync(file_path, "utf8"));
        res.status(200).send({"id": obj.id});
    });


    serv.post("/api/ui", function(req, res) {
        index.WebUpdate(function() {
            res.status(201).json({success: true});
        });
    });
};