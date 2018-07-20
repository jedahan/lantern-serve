/**
* Lantern HTTP Server
*
* We serve web applications and the PouchDB at the same origin.
* This allows easy access to the database through javascript.
* Useful for hosting on a Raspberry Pi or cloud environment.
*
**/
var shortid = require("shortid");
var http = require("http");
var https = require("https");
var path = require("path");
var fs = require("fs");
var express = require("express");
var compression = require("compression");
var index = require("./index");
var serv, http_port, https_port;


// @todo handle in-full the PouchDB leaflet / first certificate errors
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

//----------------------------------------------------------------------------

/**
* Initialize database buckets immediately once HTTP server is ready
*/
function onServerStarted(config) {

    console.log("##############################################");
    console.log(" Lantern App Server (" + config.id + ")");
    console.log("##############################################");

    var db = new index.PouchDB("https://localhost/db/lantern");
    
    /*
    * Set up lantern database bucket
    */
    db.info()
        .then(function(response) {
            console.log("[db] starting doc count: " + response.doc_count);
            console.log("[db] update sequence: " + response.update_seq);


        var maps_db = new index.PouchDB("https://localhost/db/lantern-maps");
        maps_db.info();

        saveDeviceDoc(db, config.id, config.name);
        
    })
    .catch(function(err) {
        console.log(err);
        throw new Error(err);
    });
}

/**
* Make sure we have the device registered in our database pool
*/
function saveDeviceDoc(db, id, name) {

    var now = new Date();

    db.get("d:"+id)
        .then(function(existing_doc) {
            existing_doc.$ua = now;
            existing_doc.st = 0;
            db.post(existing_doc)
                .then(function(res) {
                    console.log("[db] device updated", res.rev);
                })
                .catch(function(err) {
                    console.log(err);
                });
        })
        .catch(function(err) {

            if (err.error == "not_found") {
                db.put({
                        "_id": "d:"+id,
                        "tt": name, 
                        "st": 0,
                        "gp": null,
                        "$ca": now,
                        "$ua": now
                    })
                    .then(function(res) {
                        console.log("[db] device registered", res.rev);
                    });    
            }
            else {
                console.log(err);
            }

        });



}



//----------------------------------------------------------------------------
/*
* Set up application server and routing
*/
serv = express();
serv.disable("x-powered-by");
serv.use(compression());

/*
* Auto-load middleware
*/
var middleware_files = fs.readdirSync("./middleware");
middleware_files.forEach(function(file)  {
    console.log("[middleware] " + file);
    serv.use(require("./middleware/" + file));
});

/*
* Auto-load routes
*/
var route_files = fs.readdirSync("./routes");
route_files.forEach(function(file) {
    console.log("[route] " + file);
    require("./routes/" + file)(serv);
});

/*
* Check for additional routes (e.g. device-specific controls)
*/
if (fs.existsSync("../../routes")) {
    var extra_route_files = fs.readdirSync("../../routes");
    extra_route_files.forEach(function(file) {        
        console.log("[route] " + file);
        require("../../routes/" + file)(serv);
    });   
}

/*
* Final routes are for any static pages and binary files
*/
var static_path = path.resolve(__dirname + "/public/");
serv.use("/", express.static(static_path));

/*
* Unpack latest static web assets
*/
index.WebUpdate();

//----------------------------------------------------------------------------
/*
* Start web server
*/
http_port = (process.env.TERM_PROGRAM ? 8080 : 80);
https_port = (process.env.TERM_PROGRAM ? 8443 : 443);
var private_key  = fs.readFileSync('/opt/lantern/sslcert/privkey1.pem', 'utf8');
var certificate = fs.readFileSync('/opt/lantern/sslcert/cert1.pem', 'utf8');
var credentials = {key: private_key, cert: certificate};
var httpServer = http.createServer(serv);
var httpsServer = https.createServer(credentials, serv);


var config_file_path = path.join("config.json");
var obj = JSON.parse(fs.readFileSync(config_file_path, "utf8"));
if (!obj.id || typeof(obj.id) != "string") {

    obj.id = shortid.generate();

    if (!obj.name) {
        obj.name = obj.id.substr(0, 3);
    }
    fs.writeFileSync(config_file_path, JSON.stringify(obj), "utf8");
}

httpsServer.listen(https_port, function() {
    httpServer.listen(http_port, function() {
        onServerStarted(obj);
    });
});