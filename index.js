/**
* Lantern Node Module
*
* We expose a few modules for wider access by developers
* For example, we can get a custom PouchDB setup for use on Raspberry Pi
*
**/


var db_logger_opts = {
    logDirectory:'/opt/lantern/logs/',
    fileNamePattern:'pouchdb-<DATE>.log',
    dateFormat:'YYYY.MM.DD'
};

module.exports = {
    Logger: require("simple-node-logger").createSimpleLogger("/opt/lantern/logs/http.log"),
    DBLogger: require('simple-node-logger').createRollingFileLogger( db_logger_opts ),
    // custom build of PouchDB Server to meet our SQLite requirements
    // also removes extras we do not need that are in full "pouchdb" library
    PouchDB: require('pouchdb-core')
        .plugin(require('pouchdb-adapter-node-websql'))
        .plugin(require('pouchdb-adapter-http'))
        .plugin(require('pouchdb-replication'))
        .plugin(require('pouchdb-mapreduce'))
};