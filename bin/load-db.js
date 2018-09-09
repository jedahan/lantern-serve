#!/usr/bin/env node

/**
* Lantern Database Loader
*
* Allows us to use remote database to setup this one
*
**/


// mini application server for one-off runs
var express = require("express");
var http = require("http");
var path = require("path");
var util = require("../util");

var log = require("simple-node-logger").createSimpleLogger({
    logFilePath: path.resolve(__dirname, "..", 'logs', 'db-loader.log'),
    dateFormat:'YYYY.MM.DD'
});


serv = express();
require("../routes/db")(serv);
var httpServer = http.createServer(serv);


function runReplications() {
    // try replication with our trusted peer
    log.info("try core database replication...");
    return util.CoreDatabasePeer.replicate.to(util.CoreDatabase)
        .then(function(result) {
            log.info("core database replication complete...");
            log.info(result);
        })
        .then(function() {
            log.info("try map replication...");
            // try replication with our trusted peer
            return util.MapDatabasePeer.replicate.to(util.MapDatabase)
                .then(function(result) {
                    log.info("map database replication complete...");
                    log.info(result);
                });
        })
}

function stopProcess() {
    setTimeout(process.exit, 2000);
}

httpServer.listen(util.getHttpPort(), function() {
    log.info("begin loading data from remote peer...");
    util.checkInternet().then(function(is_connected) {
        if (is_connected) {
            runReplications()
                .then(stopProcess)
                .catch(function(err) {
                    log.error(err);
                    stopProcess();
                });
        }
        else {  
            log.info("skip replication since internet is not active...");
            stopProcess();
        }
    })
});