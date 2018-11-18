"use strict"

/**
* Lantern HTTP Server
*
* We serve web logic with Express and the PouchDB at the same origin.
* This allows easy access to the database through javascript.
* Useful for hosting on a Raspberry Pi or cloud environment.
*
**/

const http = require("http");
const https = require("https");
const path = require("path");
const fs = require("fs-extra");
const request = require("request");
const util = require("./util");
const app = require("./server")
const log = util.Logger;
const db = util.CoreDatabase;
const map_db = util.MapDatabase;



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