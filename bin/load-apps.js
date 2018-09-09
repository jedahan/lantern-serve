#!/usr/bin/env node

/**
* Lantern Web App Loader
*
* Makes it easy to keep our server up-to-date with latest static web assets
*
**/

var path = require("path");

var log = require("simple-node-logger").createSimpleLogger({
    logFilePath: path.resolve(__dirname, "..", 'logs', 'app-loader.log'),
    dateFormat:'YYYY.MM.DD'
});


var fs = require("fs-extra");
var path = require("path");
var request = require("request");
var AdmZip = require("adm-zip");

var uri = "https://github.com/lantern-works/lantern-web/raw/master/build/latest.zip";
var public_dir = path.resolve(__dirname, "../public");
var zip_file = path.resolve(__dirname, "../web.zip");

var self = function(done) {
    fs.ensureDirSync(public_dir);
    fs.emptyDirSync(public_dir);
    log.info("[ui] directory: " + public_dir);
    log.info("[ui] download: " + uri);
    request(uri)
        .on('error', function() {
           log.error("[ui] no access to update web assets");
        })
        .pipe(fs.createWriteStream(zip_file))
        .on('close', function () {
            log.info("[ui] archive downloaded");
            var zip = new AdmZip(zip_file); 
            zip.extractAllTo(public_dir);
            log.info("[ui] unzipped archive to public directory");
            fs.removeSync(zip_file);
            if (typeof(done) == "function") {
                done();
            }
        });   
};

if (require.main === module) {
    self(function() {
        log.info("[ui] update complete");
        process.exit();
    });
} else {
    module.exports = self;
}
