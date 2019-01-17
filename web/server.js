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
const GraphDB = require("gun");
const fs = require("fs-extra");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const util = require("./util");
const log = util.Logger;
const server = express();



//----------------------------------------------------------------------------
server.disable("x-powered-by");
server.use(helmet.noCache());
server.use(compression());
server.use(GraphDB.serve);
server.use(require("./middleware/captive"));
server.use(require("./middleware/cors"));
server.use(require("./middleware/secure"));

// auto-load routes
const route_files = fs.readdirSync(path.resolve(__dirname, "./routes"));
route_files.forEach((file) => {
    log.debug("[route] " + file);
    require("./routes/" + file)(server);
});

// layers for custom app functionality
const apps_path = path.resolve(__dirname, "..", "apps")
server.use("/-/", express.static(apps_path))

// modules
const modules_path = path.resolve(__dirname, "../node_modules/@fortawesome/fontawesome-free/webfonts");
server.use("/webfonts/", express.static(modules_path));

const icons_path = path.resolve(__dirname, "../node_modules/@fortawesome/fontawesome-free/svgs/solid");
server.use("/icons/", express.static(icons_path));


// final routes are for any static pages and binary files
const static_path = path.resolve(__dirname, "./public/");
server.get("/@/", (req, res) => {
	res.sendFile(static_path + "/captive.html")
});
server.use("/", express.static(static_path));


module.exports = server;