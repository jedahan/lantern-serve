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
// var helmet = require("helmet");

var index = require("./index");
var updateDeviceDoc = require("./lib/updateDeviceDoc");
var updateWebInterface = require("./lib/updateWebInterface");

var serv, http_port, https_port;
var log = index.Logger;

//----------------------------------------------------------------------------

/**
* Initialize database buckets immediately once HTTP server is ready
*/
function onServerStarted(config) {

    log.setLevel(process.env.LOG_LEVEL || "debug");

    log.info("##############################################");
    log.info(" Lantern App Server (" + config.id + ")");
    log.info("##############################################");

    var db = new index.PouchDB("http://localhost/db/lnt");
    
    /*
    * Set up lantern database bucket
    */
    db.info()
        .then(function(response) {
            log.debug("[db] starting doc count: " + response.doc_count);
            log.debug("[db] update sequence: " + response.update_seq);

        var maps_db = new index.PouchDB("http://localhost/db/map");
        maps_db.info();

        // make sure we have the device registered in our database pool
        updateDeviceDoc(config.id, config.name);
    })
    .catch(function(err) {
        log.error(err);
        throw new Error(err);
    });


    setInterval(function() {
        log.debug("---");
        var arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
        arr.reverse();
        var used = process.memoryUsage();
        for (var key in used) {
          log.debug(key + " "  + Math.round(used[key] / 1024 / 1024 * 100) / 100 + " MB");
        }
        log.debug("---");
    }, 45000);

}




//----------------------------------------------------------------------------
/*
* Set up application server and routing
*/
serv = express();
serv.disable("x-powered-by");
serv.use(compression());
//serv.use(helmet()); // secure ssl 

/*
* Auto-load middleware
*/
var middleware_files = fs.readdirSync("./middleware");
middleware_files.forEach(function(file)  {
    log.debug("[middleware] " + file);
    serv.use(require("./middleware/" + file));
});

/*
* Auto-load routes
*/
var route_files = fs.readdirSync("./routes");
route_files.forEach(function(file) {
    log.debug("[route] " + file);
    require("./routes/" + file)(serv);
});

/*
* Check for additional routes (e.g. device-specific controls)
*/
if (fs.existsSync("../../routes")) {
    var extra_route_files = fs.readdirSync("../../routes");
    extra_route_files.forEach(function(file) {        
        log.debug("[route] " + file);
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
updateWebInterface();

//----------------------------------------------------------------------------
/*
* Start web server
*/
http_port = (process.env.TERM_PROGRAM ? 8080 : 80);

https_port = (process.env.TERM_PROGRAM ? 8443 : 443);
var private_key  = fs.readFileSync('/opt/lantern/sslcert/privkey1.pem', 'utf8');
var certificate = fs.readFileSync('/opt/lantern/sslcert/fullchain1.pem', 'utf8');
var credentials = {key: private_key, cert: certificate};
var httpServer = http.createServer(serv);
var httpsServer = https.createServer(credentials, serv);



var config_file_path = path.join("conf", "lantern.json");
if (process.env.CLOUD == "true") {
    config_file_path = path.join("conf", "cloud.json");
}
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