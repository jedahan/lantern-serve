var path = require("path");
var fs = require("fs");
var util = require("../util");

/*
* Providing direct visibility and access to the PouchDB database through HTTP
*/
module.exports = function routeDatabase(serv) {
    var data_dir = path.resolve(__dirname, "../db/") + "/";
    if (!fs.existsSync(data_dir)) {
        fs.mkdirSync(data_dir);
    }

    var config = {
        configPath: data_dir + "db-conf.json",
        logPath: data_dir + "db-log.txt"
    }
    var db_router = require("express-pouchdb")(util.PouchDB.defaults({
        prefix: data_dir,
        adapter: "websql"
    }), config);
    serv.use("/db/", db_router);
};