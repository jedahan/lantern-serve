var index = require("../index");
var log = index.Logger;
var db_log = index.DBLogger;

module.exports = function(req, res, next) {
    
    function getClientIP() {
        return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    }

    function isRemoteClient() {
        return (getClientIP().indexOf("127.0.0.1") === -1);
    }
    
    if (!isRemoteClient()) {   
        return next();
    }
    // skip over logs for pouchdb web admin interface and pouchdb local checks
    else if (req.url.indexOf("/_utils/") === -1 && req.url.indexOf("/_local/") === -1) {

        if (req.url.indexOf("/db/") !== -1) {
            db_log.info(req.method + " " + req.url + " -- " + getClientIP());
        }
        else {
            log.info(req.method + " " + req.url + " -- " + getClientIP());
        }
    }
    next();
};