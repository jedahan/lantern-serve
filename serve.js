/**
* Lantern HTTP Server
*
* We serve web applications and the PouchDB at the same origin.
* This allows easy access to the database through javascript.
* Useful for hosting on a Raspberry Pi or cloud environment.
*
**/

var express = require("express");
var path = require("path");
var fs = require("fs");
var index = require("./index");
var serv, port;



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
index.WebUpdate(function() {
    /*
    * Start web server
    */
    port = (process.env.TERM_PROGRAM ? 8080 : 80);
    serv.listen(port, onServerStarted);
});