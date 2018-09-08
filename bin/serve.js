#!/usr/bin/env node

/**
* Lantern HTTP Server
*
* We serve web applications and the PouchDB at the same origin.
* This allows easy access to the database through javascript.
* Useful for hosting on a Raspberry Pi or cloud environment.
*
**/
var http = require("http");
var https = require("https");
var path = require("path");
var fs = require("fs");
var express = require("express");
var request = require("request");
var compression = require("compression");
var helmet = require("helmet");

var util = require("../util");
var log = util.Logger;
var db = util.CoreDatabase;
var maps_db = util.MapDatabase;

var serv, http_port, https_port;

//----------------------------------------------------------------------------

log.setLevel(process.env.LOG_LEVEL || "debug");
log.info("##############################################");
log.info("Lantern App Server");
log.info("##############################################");

/**
* Initialize database buckets immediately once HTTP server is ready
*/
function onServerStarted() {
    db.info()
    .then(function(response) {
        log.debug("[db] lnt starting doc count: " + response.doc_count);
        log.debug("[db] lnt update sequence: " + response.update_seq);
    })
    .then(function() {
        return maps_db.info();
    })
    .then(function(response) {
        log.debug("[db] map starting doc count: " + response.doc_count);
        log.debug("[db] map update sequence: " + response.update_seq);
    })
    .then(util.checkInternet)
    .then(util.registerDevice)
    .catch(function(err) {
        log.error(err);
        throw new Error(err);
    });
}




//----------------------------------------------------------------------------
// set up application server and routing
serv = express();
serv.disable("x-powered-by");
serv.use(compression());
serv.use(helmet({
  noCache: true,
  hsts: false
}));

// auto-load middleware
var middleware_files = fs.readdirSync(path.resolve(__dirname, "../middleware"));
middleware_files.forEach(function(file)  {
    log.debug("[middleware] " + file);
    serv.use(require("../middleware/" + file));
});

// auto-load routes
var route_files = fs.readdirSync(path.resolve(__dirname, "../routes"));
route_files.forEach(function(file) {
    log.debug("[route] " + file);
    require("../routes/" + file)(serv);
});

// check for additional routes (e.g. device-specific controls)
if (fs.existsSync("../../../routes")) {
    var extra_route_files = fs.readdirSync(path.resolve(__dirname, "../../../routes"));
    extra_route_files.forEach(function(file) {        
        log.debug("[route] " + file);
        require("../../../routes/" + file)(serv);
    });   
}

// final routes are for any static pages and binary files
var static_path = path.resolve(__dirname, "../public/");
serv.use("/", express.static(static_path));



//----------------------------------------------------------------------------
// start web server
http_port = (process.env.TERM_PROGRAM ? 8080 : 80);
https_port = (process.env.TERM_PROGRAM ? 8443 : 443);
var private_key  = fs.readFileSync(path.resolve(__dirname, '../sslcert/privkey1.pem'), 'utf8');
var certificate = fs.readFileSync(path.resolve(__dirname, '../sslcert/fullchain1.pem'), 'utf8');
var credentials = {key: private_key, cert: certificate};
var httpServer = http.createServer(serv);
var httpsServer = https.createServer(credentials, serv);

httpsServer.listen(https_port, function() {
    httpServer.listen(http_port, function() {
        // verify database server is available and ensure unique identifier
        request("http://localhost/db/", {"json": true}, function(err, response) {
            if (err) {
                throw new Error(err);
            }

            log.info("[db] uuid: " + response.body.uuid);
            onServerStarted();
        });
    });
});