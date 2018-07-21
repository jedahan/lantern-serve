var accepted_ips = {};
var index = require("../index");
var log = index.Logger;

module.exports = function(req, res, next) { 

    function getClientIP() {
        return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    }

    function isRemoteClient() {
        return (getClientIP().indexOf("127.0.0.1") === -1);
    }

    function isClientConnected() {
        return accepted_ips.hasOwnProperty(getClientIP());
    }

    function markClientConnected() {
        log.debug("[captive] mark client connected");
        accepted_ips[getClientIP()] = new Date();
    }

    function isCaptiveNetworkSupport() {
        return (req.get('User-Agent') && req.get('User-Agent').indexOf('CaptiveNetworkSupport') !== -1);
    }


    //------------------------------------------------------------------------

    // only work with captive portal requests on the local device
    if (req.headers.host != "lantern.local") {
        return next();
    }


    // ignore internal requests from device itself 
    if (!isRemoteClient()) {   
        return next();
    }
    else if (req.url == "/success.txt") {
        // mozilla checks for working network
        // skip for now
        return next();
    }
    // check for captive portal logic
    else if (isCaptiveNetworkSupport()) {
        if (req.url == "/hotspot-detect.html") {
            if (isClientConnected()) {
                log.debug("[captive] success");
                res.send("<HTML><HEAD><TITLE>Success</TITLE></HEAD><BODY>Success</BODY></HTML>");
            }
            else {
                log.debug("[captive] client not yet connected");
                res.end("NO SUCCESS");
            }
        }
        else {
            log.error("[captive] unexpected request: " + req.url);
        }
    }
    else {
        if (req.url == "/hotspot-detect.html") {
            log.debug("[captive] serve sign-in page for captive portal");
            // automatically sign-in user on page load   
            markClientConnected();
            res.redirect("/hotspot.html");
        }
        else {
            return next();
        }
    }
};