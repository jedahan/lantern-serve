/**
* Lantern Web Updater
*
* Makes it easy to keep our server up-to-date with latest static web assets
*
**/

var fs = require("fs-extra");
var request = require("request");
var AdmZip = require("adm-zip");

var uri = "https://github.com/lantern-works/lantern-web/raw/master/build/latest.zip";

var self = function(done) {
    console.log("[update] download: " + uri);
    request(uri)
        .pipe(fs.createWriteStream('./web.zip'))
        .on('close', function () {
            console.log("[update] archive downloaded");
            fs.removeSync("./public");
            fs.mkdirSync("./public");
            var zip = new AdmZip("./web.zip"); 
            zip.extractAllTo("./public");
            console.log("[update] unzipped archive to public directory");
            fs.removeSync("./web.zip");
            done();
        });   
};

if (require.main === module) {
    self(function() {
        console.log("[update] complete");
    });
} else {
    module.exports = self;
}
