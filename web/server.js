"use strict"


/**
* Lantern HTTP Server
*
* We serve web logic with Express and the PouchDB at the same origin.
* This allows easy access to the database through javascript.
* Useful for hosting on a Raspberry Pi or cloud environment.
*
**/
const express = require("express");
const fs = require("fs-extra");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");
const http = require("http");
const https = require("https");
const request = require("request");
const util = require("./util");
const db = util.CoreDatabase;
const map_db = util.MapDatabase;
const log = util.Logger;
const app = express();



//----------------------------------------------------------------------------
app.disable("x-powered-by");
app.use(compression());
app.use(helmet({
  noCache: true,
  hsts: false
}));

// auto-load middleware
const middleware_files = fs.readdirSync(path.resolve(__dirname, "./middleware"));
middleware_files.forEach((file) => {
    log.debug("[middleware] " + file);
    app.use(require("./middleware/" + file));
});

// auto-load routes
const route_files = fs.readdirSync(path.resolve(__dirname, "./routes"));
route_files.forEach((file) => {
    log.debug("[route] " + file);
    require("./routes/" + file)(app);
});

// check for additional routes (e.g. device-specific controls)
if (fs.existsSync("../../../routes")) {
    const extra_route_files = fs.readdirSync(path.resolve(__dirname, "../../../routes"));
    extra_route_files.forEach((file) => {        
        log.debug("[route] " + file);
        require("../../../routes/" + file)(app);
    });   
}

// final routes are for any static pages and binary files
const static_path = path.resolve(__dirname, "./public/");
app.use("/", express.static(static_path));


//----------------------------------------------------------------------------
log.setLevel(process.env.LOG_LEVEL || "debug");
log.info("##############################################");
log.info("Lantern App Server");
log.info("##############################################");

/**
* Initialize database buckets immediately once HTTP server is ready
*/
const onServerStarted = () => {
    db.info()
    .then((response) => {
        log.debug("[db] lnt starting doc count: " + response.doc_count);
        log.debug("[db] lnt update sequence: " + response.update_seq);
    })
    .then(() => {
        return map_db.info();
    })
    .then((response) => {
        log.debug("[db] map starting doc count: " + response.doc_count);
        log.debug("[db] map update sequence: " + response.update_seq);
    })
    .then(util.checkInternet)
    .then(util.registerDevice)
    .catch((err) => {
        log.error(err);
        throw new Error(err);
    });
}



//----------------------------------------------------------------------------
// start web server
const private_key  = fs.readFileSync(path.resolve(__dirname, './sslcert/privkey1.pem'), 'utf8');
const certificate = fs.readFileSync(path.resolve(__dirname, './sslcert/fullchain1.pem'), 'utf8');
const credentials = {key: private_key, cert: certificate};
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(util.getHttpsPort(), () => {
    httpServer.listen(util.getHttpPort(), () => {
        // verify database server is available and ensure unique identifier
        request(util.getHttpAddress() + "/db/", {"json": true}, (err, response) => {
            if (err) {
                throw new Error(err);
            }

            log.info("[db] uuid: " + response.body.uuid);
            onServerStarted();
        });
    });
});