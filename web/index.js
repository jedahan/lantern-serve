"use strict"

/**
* Lantern HTTP Server
*
* We serve web logic with Express and the database at the same origin.
* This allows easy access to the database through javascript.
* Useful for hosting on a Raspberry Pi or cloud environment.
*
**/

const http = require("http");
const https = require("https");
const GraphDB = require("gun")
const path = require("path");
const fs = require("fs-extra");
const request = require("request");
const util = require("./util");
const app = require("./server")
const log = util.Logger;



//----------------------------------------------------------------------------
log.setLevel(process.env.LOG_LEVEL || "debug");
log.info("##############################################");
log.info("Lantern App Server");
log.info("##############################################");



//----------------------------------------------------------------------------
try {

	// read in ssl certificate data
	let private_key_path = process.env.SSL_PRIVATE_KEY || path.resolve(__dirname, "../certs/privkey.pem");
	let certificate_path = process.env.SSL_CERTIFICATE || path.resolve(__dirname, "../certs/fullchain.pem");

	let credentials = {
		key: fs.readFileSync(private_key_path, 'utf8'), 
		cert: fs.readFileSync(certificate_path, 'utf8')
	};


	// start the web server with built-in database solution
	let http_server = http.createServer(app);
	let secure_server = https.createServer(credentials, app);
	let port = util.getHttpsPort();

	let web = http_server.listen(util.getHttpPort(), () => {

		let secure_web = secure_server.listen(port, () => {
			log.info(`port = ${port}`);
			log.info(`cert = ${certificate_path}`);
			GraphDB({
				file: process.env.DB || "db/dev", 
				web: secure_web
			});
		});
	});


}
catch(e) {
	if (e.code == "ENOENT") {
		log.error("SSL certificates not found. Unable to start without HTTPS, required for database encryption.");
		log.error("Please use 'certs' script in /opt/lantern/bin to generate SSL certs and try again...");
	}
	else {
		log.error(e);
	}
}
