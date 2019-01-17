"use strict"

const util = require("../util");

module.exports = (serv) => {
    

    
    //---------------------------------------------------------------------- 
    /**
    * Delivers basic server information
    */
    serv.get("/api/info", (req,res) => {
        util.checkInternet().then(status => {
            return res.status(200).json({
                "online": status,
                "cloud": process.env.CLOUD ? true : false
            });
        });
    });

};