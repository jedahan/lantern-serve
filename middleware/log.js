var util = require("../util");

module.exports = function(req, res, next) {

    // don't log requests from the local machine
    if (!util.isRemoteClient(req)) {   
        return next();
    }
    // skip over logs for pouchdb web admin interface and pouchdb databases in general
    else if (req.url.indexOf("/_utils/") === -1 && req.url.indexOf("/_local/") === -1 && (req.url.indexOf("/db/") !== -1)) {
        util.Logger.info(req.method + " " + req.url + " -- " + util.getClientIP(req));
    }
    next();
};