/**
* App Routes
*
* API to get and refresh custom apps available on this server
**/
const fs = require("fs-extra");
const exec = require('child_process').exec;
const directoryTree = require("directory-tree");
const path = require("path");
const util = require("../util");
const log = util.Logger;


module.exports = (serv) => {

    const apps_dir = path.join(__dirname, "..", "..", "apps");
    

    
    //---------------------------------------------------------------------- 
    /**
    *  Retrieves available applications from this server
    */
    serv.get("/api/apps", (req,res) => {

        if (!fs.existsSync(apps_dir)) {
            return res.status(412).json({
                "ok":false, "message": "Missing apps directory"
            });
        }


        let filtered_tree = directoryTree(apps_dir, {extensions: /\.(html|js|json|css|png|gif|jpg|jpeg)$/});

        let final_result = [];

        util.removeMeta(filtered_tree, "path");
        let result = ( filtered_tree.hasOwnProperty("children") ? filtered_tree.children : []);

        // which type of files do we read in advance?
        let read_body_for = [".js", ".css", ".html"];

        result.forEach((app) => {
            if (app.name[0] != ".") {
                app.children.forEach((item) => {
                    if (read_body_for.indexOf(item.extension) > -1) {
                        item.body = String(fs.readFileSync(apps_dir + "/" + app.name + "/" + item.name));
                    }
                })
                final_result.push(app);
            }
        });
        res.status(200).json(final_result);
           
    });

    /**
    * Update to latest version of apps from git repository
    */
    serv.post("/api/apps", (req, res) => {
        exec("cd " + apps_dir + "; git pull;", (err, stdout, stderr) => {
            let ok = false;
            if (err) {
                log.error("git pull for apps: ", err);
                res.status(500).json({"ok": false});
            }
            else if (stderr) {
                log.error("git pull for apps: ", stderr);
                res.status(500).json({"ok": false});
            }
            else {
                res.status(201).json({"ok": true});
                log.info("git pull for apps: ", stdout);
            }
        });
    });

};