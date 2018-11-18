"use strict"

const util = require("../util");
const log = util.Logger;



//----------------------------------------------------------------------
module.exports = (req,res,next) => {

    if (req.headers.host 
            && req.headers.host.indexOf("localhost") != -1 
            && req.headers.host.indexOf("lantern.global") != -1) {
        log.debug("[rewrite] ignore: " + req.headers.host + req.url);
        return next();
    }

    // PouchDB web admin may need access to some or all of these at the root
    // https://github.com/pouchdb/express-pouchdb/issues/116
    let paths = ['/_session', '/_replicate', '/_membership', '/_node', '/_all_dbs', '/_replicator', "/_uuids", 
        '/_users', '/_utils', "/_active_tasks", "/lnt", "/map", "/verifytestdb"];

    // if we're requesting one of these, make sure to prefix with "/db"
    for (let i=0; i<paths.length; i++) {
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