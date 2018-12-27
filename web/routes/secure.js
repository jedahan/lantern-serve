const util = require("../util");

//----------------------------------------------------------------------
module.exports = (serv) => {


	/**
	* HTTPS Redirect
	*/
	 serv.all("*", (req, res, next) => {
		if(req.secure){
		  // OK, continue
		  return next();
		};
		// handle port numbers if you need non defaults
		let uri = "https://" + req.hostname;
		let port = util.getHttpsPort();
		if (port != 443) {
			uri += ":" + port;
		}
		uri += req.url;
		res.redirect(uri);
	});
};