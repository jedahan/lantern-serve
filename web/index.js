/**
* Lantern App Server
*
* We serve web logic with Express and the database at the same origin.
* This allows easy access to the database through javascript.
* Useful for hosting on a Raspberry Pi or cloud environment.
*
**/
const fs = require("fs-extra");
const path = require("path");
const http = require("http");
const https = require("https");
const minify = require('@node-minify/core');
const uglifyJS = require('@node-minify/uglify-es');
const concat = require("concat");
const GraphDB = require("gun")
const util = require("./util");
const app = require("./server")
const watch = require("./watcher");
const backup = require("./backup");
const log = util.Logger;



//----------------------------------------------------------------------
log.setLevel(process.env.LOG_LEVEL || "debug");
log.info("##############################################");
log.info("Lantern App Server");
log.info("##############################################");
fs.ensureDirSync(path.resolve(__dirname, "../logs"));
fs.ensureDirSync(path.resolve(__dirname, "../db"));
fs.ensureDirSync(path.resolve(__dirname, "./public/tiles"));



//----------------------------------------------------------------------
/**
* Start HTTP Server
*/
const startServer = () => {
	return new Promise((resolve, reject) => {
		let secure_server = null;
		try {
			// read in ssl certificate data
			let private_key_path = process.env.SSL_PRIVATE_KEY || path.resolve(__dirname, "./certs/dev.lantern.link-key.pem");
			let certificate_path = process.env.SSL_CERTIFICATE || path.resolve(__dirname, "./certs/dev.lantern.link.pem");
			let credentials = {
				key: fs.readFileSync(private_key_path, 'utf8'), 
				cert: fs.readFileSync(certificate_path, 'utf8')
			};
			secure_server = https.createServer(credentials, app);
		}
		catch(e) {
			if (e.code == "ENOENT") {
				log.error(`SSL certificates not found in "certs" directory...`);
			}
			else {
				log.error(e);
			}
			reject();
		}
		// start the web server with built-in database solution
		let http_server = http.createServer(app);
			secure_server.listen(util.getHttpsPort(), () => {
			    let std_server = http_server.listen(util.getHttpPort(), () => {
				if (secure_server) {
					log.info(`secure port = ${util.getHttpsPort()}`);
				}
				else {
					log.warn("falling back to http for local development...");
					log.info(`standard port = ${util.getHttpPort()}`);
				}

				// track inbox messags
				app.locals.inbox = {};
				// track outbox messages
				app.locals.outbox = [];
				resolve(secure_server || std_server);
		    });  
		});
	})
}

/**
* Create or use existing database
*/
const setupDatabase = (server) => {
	// choose database location
	let db_path = path.resolve(__dirname, "../db/dev");
	if (process.env.DB) {
		db_path = path.resolve(__dirname, "../" + process.env.DB);
	}
				
	log.info(`database path = ${db_path}`);

	// run a backup of data every day

	let db = GraphDB({
		file: db_path, 
		web: server
	});

	// attach database instance as a local app variable for express routes
	app.locals.db = db;

	return Promise.resolve(db_path);
}

/**
* Minify scripts
*/
const compressJavascript = () => {
	return new Promise((resolve, reject) => {
		// handle minification directly here rather than build scripts
		let platform_min = path.resolve(__dirname, "./public/scripts/platform.min.js");
		fs.exists(platform_min, (val) => {
			if (val) {
				return resolve();
			}
			// offer compressed versions of scripts
			minify({
			  compressor: uglifyJS,
			  input: path.resolve(__dirname, "./public/scripts/platform.js"),
			  output: platform_min,
			  callback: resolve
			});
		});
	});
}


/**
* Minify styles
*/
const compressStylesheets = () => {
	return new Promise((resolve, reject) => {

		let files = [
			"node_modules/bulma/css/bulma.min.css",
			"node_modules/leaflet/dist/leaflet.css",
			"node_modules/leaflet.locatecontrol/dist/L.Control.Locate.min.css",
			"node_modules/@fortawesome/fontawesome-free/css/all.min.css",
			"node_modules/typeface-montserrat/index.css"
		]

		let vendor_css = path.resolve(__dirname, "./public/styles/vendor.css");
		fs.exists(vendor_css, (val) => {
			if (val) {
				return resolve();
			}
			concat(files, vendor_css);
			resolve();
		});
	});
}


//----------------------------------------------------------------------------
compressStylesheets()
	.then(compressJavascript)
	.then(startServer)
	.then(setupDatabase)	
	.then((db_path) => {	
		// restores an existing database or backs up existing one
		backup(db_path);
		// starts watching for changes
		watch(app);
	})
