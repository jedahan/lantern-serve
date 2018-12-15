"use strict"

const fs = require("fs-extra");
const directoryTree = require("directory-tree");
const path = require("path");
const bodyParser = require("body-parser");
const util = require("../util");
const log = util.Logger;



//----------------------------------------------------------------------
module.exports = (serv) => {

    /*
    *  Retrieves available applications from this server
    */
    serv.get("/api/apps", (req,res) => {
        let apps_dir = path.join(__dirname, "..", "..", "apps");

        if (!fs.existsSync(apps_dir)) {
            return res.status(412).json({
                "ok":false, "message": "Missing apps directory"
            });
        }


        let filtered_tree = directoryTree(apps_dir, {extensions: /\.(html|js|json|css|png|gif|jpg|jpeg)$/});

        let final_result = [];

        util.removeMeta(filtered_tree, "path");
        let result = ( filtered_tree.hasOwnProperty("children") ? filtered_tree.children : []);

        result.forEach((app) => {
            if (app.name[0] != ".") {
                final_result.push(app);
            }
        });
        res.status(200).json(final_result);
           
    })


    serv.post("/api/apps", (req, res) => {
        require("../../bin/load-apps")(() => {
            res.status(201).json({"ok": true});
        });
    });
};