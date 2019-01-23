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
fs.ensureDirSync(path.resolve(__dirname, "../logs"));
fs.ensureDirSync(path.resolve(__dirname, "../db"));
fs.ensureDirSync(path.resolve(__dirname, "./public/tiles"));



//----------------------------------------------------------------------

const http = require("http");
const https = require("https");
const util = require("./util");
const app = require("./server")
const watch = require("./watcher");
const backup = require("./backup");
const log = util.Logger;
log.setLevel(process.env.LOG_LEVEL || "debug");
log.info("##############################################");
log.info("Lantern App Server");
log.info("##############################################");



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

				// get sense of what sort of device we have here
		        util.checkInternet().then(status => {
		        	app.locals.online = status ? "1" : "0";
		        	app.locals.cloud = process.env.CLOUD ? "1" : "0";
					resolve(secure_server || std_server);
		        });

		    });  
		});
	})
}

/**
* Create or use existing database
*/
const setupDatabase = (server) => {
		
	log.info(`database path = ${db_path}`);

	// run a backup of data every day

	let db = require("gun")({
		file: db_path, 
		web: server
	});

	// attach database instance as a local app variable for express routes
	app.locals.db = db;

	return Promise.resolve(db_path);
}


//----------------------------------------------------------------------------

// choose database location
let db_path = path.resolve(__dirname, "../db/dev");
if (process.env.DB) {
	db_path = path.resolve(__dirname, "../" + process.env.DB);
}
	
// restores an existing database or backs up existing one
backup(db_path)
	.then(startServer)
	.then(setupDatabase)	
	.then((db_path) => {
		return new Promise((resolve, reject) => {
			// starts watching for changes
			watch(app);
			setTimeout(resolve, 1000);	
		});
	})
	.then(util.packJavascript)
	.then(util.compressStylesheets)
	.then(util.compressJavascript)
	.catch((e) => {
		log.error("Failed to start server:");
		log.error(e);
	});
