var index = require("../index");
/*
* Allows user to easily load latest web assets onto the server
*/
module.exports = function routeUpdates(serv) {
    serv.get("/up", function(req, res) {
        index.WebUpdate(function() {
            res.status(201).json({success: true});
        });
    });
};