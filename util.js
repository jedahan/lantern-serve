/**
* Lantern Utilities
*
*/

var self = {};

// custom build of PouchDB Server to meet our SQLite requirements
// also removes extras we do not need that are in full "pouchdb" library
self.PouchDB = require('pouchdb-core')
    .plugin(require('pouchdb-adapter-node-websql'))
    .plugin(require('pouchdb-adapter-http'))
    .plugin(require('pouchdb-replication'))

// re-use database instances
self.CoreDatabase = self.PouchDB("http://localhost/db/lnt");
self.MapDatabase = self.PouchDB("http://localhost/db/map");

// log facility
self.Logger = require("simple-node-logger").createSimpleLogger({
    logFilePath:'/opt/lantern/logs/http.log',
    dateFormat:'YYYY.MM.DD'
});


// check for internet access
self.checkInternet = function(cb) {
    require('dns').lookup('google.com',function(err) {
        if (err && err.code == "ENOTFOUND") {
            cb(false);
        } else {
            cb(true);
        }
    });
}

// extract IP address from request object
self.getClientIP = function(req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}

// check if this is a remote client requesting a resource
self.isRemoteClient = function(req) {
    var ip = self.getClientIP(req);
    return ip && (ip.indexOf("127.0.0.1") === -1);
}


module.exports = self;