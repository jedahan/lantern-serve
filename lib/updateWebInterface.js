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

var uri = "https://github.com/lantern-works/lantern-web/raw/master/build/latest.zip";
var public_dir = path.resolve(__dirname, "../public");
var zip_file = path.resolve(__dirname, "../web.zip");

var self = function(done) {
    console.log("[update] download: " + uri);
    request(uri)
        .on('error', function() {
           console.log("[update] no access to update web assets");
        })
        .pipe(fs.createWriteStream(zip_file))
        .on('close', function () {
            console.log("[update] archive downloaded");
            fs.removeSync(public_dir);
            fs.mkdirSync(public_dir);
            var zip = new AdmZip(zip_file); 
            zip.extractAllTo(public_dir);
            console.log("[update] unzipped archive to public directory");
            fs.removeSync(zip_file);
            if (typeof(done) == "function") {
                done();
            }
        });   
};

if (require.main === module) {
    self(function() {
        console.log("[update] complete");
    });
} else {
    module.exports = self;
}
