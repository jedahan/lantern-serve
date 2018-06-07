/**
* Lantern HTTP Server
*
* We serve web applications and the PouchDB at the same origin.
* This allows easy access to the database through javascript.
* Useful for hosting on a Raspberry Pi or cloud environment.
*
**/

var express = require("express");
var http = require("http");
var https = require("https");
var path = require("path");
var fs = require("fs");
var index = require("./index");
var serv, http_port, https_port;



//----------------------------------------------------------------------------
function onServerStarted() {

    console.log("##############################################");
    console.log(" Lantern App Server");
    console.log("##############################################");

    var db = new index.PouchDB("http://localhost/db/lantern");
    
    /*
    * Set up lantern database bucket
    */
    db.info()
        .then(function(response) {
            console.log("[db] starting doc count: " + response.doc_count);
            console.log("[db] update sequence: " + response.update_seq);
    })
    .catch(function(err) {
        console.log(err);
        throw new Error(err);
    });
}



//----------------------------------------------------------------------------
/*
* Set up application server and routing
*/
serv = express();
serv.disable("x-powered-by");


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
var private_key  = fs.readFileSync('sslcert/privkey1.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/cert1.pem', 'utf8');
var credentials = {key: private_key, cert: certificate};
var httpServer = http.createServer(serv);
var httpsServer = https.createServer(credentials, serv);

httpsServer.listen(https_port, function() {
    httpServer.listen(http_port, function() {
        onServerStarted();
    });
});