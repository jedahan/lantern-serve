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
        var ip = getClientIP();
        log.info("[captive] mark client " + ip + " connected");
        accepted_ips[ip] = new Date();
    }

    function isCaptiveNetworkSupport() {
        return (req.get('User-Agent') && req.get('User-Agent').indexOf('CaptiveNetworkSupport') !== -1);
    }


    function sendOfflineMessage() {
        return res.end("NO SUCCESS");
    }

    //------------------------------------------------------------------------

    // only work with captive portal requests on the local device
    if (process.env.CLOUD == 'true') {
        return next();
    }

    // ignore internal requests from device itself 
    if (!isRemoteClient()) {
        return next();
    }
    else if (req.url == "/success.txt") {
        // mozilla checks for working network
        // log.debug('[captive] mozilla captive portal check');
        sendOfflineMessage();
    }
    else if (req.url == "/generate_204") {
        log.debug("[captive] google captive portal check");        
        sendOfflineMessage();
    }
    // check for captive portal logic
    else if (isCaptiveNetworkSupport()) {
        if (req.url == "/hotspot-detect.html") {
            if (isClientConnected()) {
                log.debug("[captive] apple captive portal success");
                res.send("<HTML><HEAD><TITLE>Success</TITLE></HEAD><BODY>Success</BODY></HTML>");
            }
            else {
                log.debug("[captive] apple captive portal check");
                sendOfflineMessage();
            }
        }
        else {
            log.error("[captive] unexpected request: " + req.url);
        }
    }
    else {
        if (req.url == "/hotspot-detect.html") {
            log.debug("[captive] apple serve sign-in page for captive portal");
            // automatically sign-in user on page load   
            markClientConnected();
            res.redirect("http://lantern.global/hotspot.html");
        }
        else {
            return next();
        }
    }
};