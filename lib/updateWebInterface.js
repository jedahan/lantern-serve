/**
* Lantern Web Updater
*
* Makes it easy to keep our server up-to-date with latest static web assets
*
**/

var fs = require("fs-extra");
var path = require("path");
var request = require("request");
var AdmZip = require("adm-zip");
var index = require("../index");
var log = index.Logger;


var uri = "https://github.com/lantern-works/lantern-web/raw/master/build/latest.zip";
var public_dir = path.resolve(__dirname, "../public");
var zip_file = path.resolve(__dirname, "../web.zip");

var self = function(done) {
    log.debug("[ui] download: " + uri);
    request(uri)
        .on('error', function() {
           log.error("[ui] no access to update web assets");
        })
        .pipe(fs.createWriteStream(zip_file))
        .on('close', function () {
            log.debug("[ui] archive downloaded");
            fs.removeSync(public_dir);
            fs.mkdirSync(public_dir);
            var zip = new AdmZip(zip_file); 
            zip.extractAllTo(public_dir);
            log.debug("[ui] unzipped archive to public directory");
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
