var util = require("../util");
var log = util.Logger;

module.exports = function RewriteMiddleware(req,res,next) {

    if (req.headers.host && req.headers.host != "localhost" && req.headers.host != "lantern.global") {
        log.debug("[rewrite] ignore: " + req.headers.host + req.url);
        return next();
    }

    // PouchDB web admin may need access to some or all of these at the root
    // https://github.com/pouchdb/express-pouchdb/issues/116
    var paths = ['/_session', '/_all_dbs', '/_replicator', "/_uuids", 
        '/_users', '/_utils', "/_active_tasks", "/lnt", "/map", "/verifytestdb"];

    // if we're requesting one of these, make sure to prefix with "/db"
    for (var i=0; i<paths.length; i++) {
        if (req.url.indexOf(paths[i]) === 0) {
            
            // make sure we have trailing slash for certain paths
            if (req.url == "/_utils") {
                res.redirect(301, req.url+"/");
            }
            else {
                req.url = req.originalUrl = "/db" + req.url;
                return next();
            }
        }
    }

    if (process.env.CLOUD == "true" && req.url == "/") {
        return res.redirect("/welcome.html");
    }

    next();
};