"use strict"


/**
* Lantern HTTP Server
*
* We serve web logic with Express and the database at the same origin.
* This allows easy access to the database through javascript.
* Useful for hosting on a Raspberry Pi or cloud environment.
*
**/
const express = require("express");
const Gun = require('gun');
const fs = require("fs-extra");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");
const util = require("./util");
const log = util.Logger;
const server = express();



//----------------------------------------------------------------------------
server.disable("x-powered-by");
server.use(compression());
server.use(helmet({
  noCache: true,
  hsts: false
}));
server.use(Gun.serve);


// auto-load middleware
const middleware_files = fs.readdirSync(path.resolve(__dirname, "./middleware"));
middleware_files.forEach((file) => {
    log.debug("[middleware] " + file);
    server.use(require("./middleware/" + file));
});

// auto-load routes
const route_files = fs.readdirSync(path.resolve(__dirname, "./routes"));
route_files.forEach((file) => {
    log.debug("[route] " + file);
    require("./routes/" + file)(server);
});



// check for additional routes (e.g. device-specific controls)
if (fs.existsSync("../../../routes")) {
    const extra_route_files = fs.readdirSync(path.resolve(__dirname, "../../../routes"));
    extra_route_files.forEach((file) => {        
        log.debug("[route] " + file);
        require("../../../routes/" + file)(server);
    });   
}

// platform route serves core application environment
const platform_path = path.resolve(__dirname, "./platform/");
server.use("/platform/", express.static(platform_path));


// layers for custom app functionality
const apps_path = path.resolve(__dirname, "..", "apps")
server.use("/apps/", express.static(apps_path))

// modules
const modules_path = path.resolve(__dirname, "../node_modules/");
server.use("/_/", express.static(modules_path));

// final routes are for any static pages and binary files
const static_path = path.resolve(__dirname, "./public/");
server.use("/", express.static(static_path));


module.exports = server;