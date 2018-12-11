"use strict"

/**
* Lantern HTTP Server
*
* We serve web logic with Express and the database at the same origin.
* This allows easy access to the database through javascript.
* Useful for hosting on a Raspberry Pi or cloud environment.
*
**/

const http = require("http");
const https = require("https");
const GraphDB = require("gun")
const path = require("path");
const fs = require("fs-extra");
const request = require("request");
const util = require("./util");
const app = require("./server")
const log = util.Logger;



//----------------------------------------------------------------------------
log.setLevel(process.env.LOG_LEVEL || "debug");
log.info("##############################################");
log.info("Lantern App Server");
log.info("##############################################");



//----------------------------------------------------------------------------
// start web server
const private_key  = fs.readFileSync(path.resolve(__dirname, '../certs/privkey1.pem'), 'utf8');
const certificate = fs.readFileSync(path.resolve(__dirname, '../certs/fullchain1.pem'), 'utf8');
const credentials = {key: private_key, cert: certificate};
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(util.getHttpsPort(), () => {
    let server = httpServer.listen(util.getHttpPort(), () => {
		GraphDB({file: process.env.DB || "db/dev", web: server});
    });
});