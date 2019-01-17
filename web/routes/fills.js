const path = require("path");

module.exports = (serv) => {
    serv.get("/styles/L.Control.Locate.min.css.map", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../../node_modules/leaflet.locatecontrol/dist/L.Control.Locate.min.css.map"))
    });
};

