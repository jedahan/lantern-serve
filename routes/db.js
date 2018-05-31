var fs = require("fs");
var index = require("../index");

/*
* Providing direct visibility and access to the PouchDB database through HTTP
*/
module.exports = function routeDatabase(serv) {
    var data_dir = __dirname + "/../db/";
    if (!fs.existsSync(data_dir)) {
        fs.mkdirSync(data_dir);
    }
    var db_router = require("express-pouchdb")(index.PouchDB.defaults({
        prefix: data_dir,
        adapter: "websql"
    }), {
        configPath: "./db/db-conf.json",
        logPath: "./db/db-log.txt"
    });
    serv.use("/db/", db_router);
};