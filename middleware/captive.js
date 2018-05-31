var accepted_ips = {};

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
        console.log("[captive] mark client connected");
        accepted_ips[getClientIP()] = new Date();
    }

    function isCaptiveNetworkSupport() {
        return (req.get('User-Agent') && req.get('User-Agent').indexOf('CaptiveNetworkSupport') !== -1);
    }


    //------------------------------------------------------------------------

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
                console.log("[captive] success");
                res.send("<HTML><HEAD><TITLE>Success</TITLE></HEAD><BODY>Success</BODY></HTML>");
            }
            else {
                console.log("[captive] client not yet connected");
                res.end("NO SUCCESS");
            }
        }
        else {
            console.log("[captive] unexpected request: " + req.url);
        }
    }
    else {
        if (req.url == "/hotspot-detect.html") {
            console.log("[captive] serve sign-in page for captive portal");
            // automatically sign-in user on page load   
            markClientConnected();
            res.redirect("/hotspot/hotspot.html");
        }
        else {
            return next();
        }
    }
};