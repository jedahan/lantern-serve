const fs = require("fs-extra");
const path = require("path");
const fetch = require("node-fetch");
const util = require("../util");
const log = util.Logger;



//----------------------------------------------------------------------
module.exports = (serv) => {

	let tiles_dir = path.resolve(__dirname, "../../tiles");


	/**
	* Convert URL to local file path for cached tile
	*/
	const getLocalPathForTile = (params) => {
		let zxy = `${params.z}/${params.x}/${params.y}.png`;
		let target_dir = tiles_dir + "/"+path.dirname(zxy);
		fs.ensureDirSync(target_dir);
		let file_name = path.basename(zxy);
		let file_path = target_dir + "/" + file_name;
		return file_path;
	}

	/**
	* Use special empty tile to notify user that a tile request was forbidden or failed
	*/
	const sendEmptyTile = (hostname, port) => {
		// allows for self-signed certificates
		// may be made more secure in the future
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
		let empty_tile = `https://${hostname}:${port}/assets/empty-tile.png`;
		console.log(empty_tile);
		return fetch(empty_tile);
	}

	
	/**
	* MapTiler Proxy
	*/
	serv.get("/c/:id/styles/:map/:z/:x/:y.png", (req, res, next) => {
			
		let local_path = getLocalPathForTile(req.params);

		// use offline cache if available, avoids hitting external sever
		if (fs.existsSync(local_path)) {
			// log.debug("use cached tile", local_path);
			fs.readFile(local_path, (err, buffer) => {
				res.type("png");
				res.send(buffer)
			});
			return;
		}

		let url = "https://maps.tilehosting.com" + req.url;
		//log.debug("Map tile proxy target is:", url);
		let do_cache = false;
		fetch(url, {
			cors: true,
			headers: {
				"Origin": "lantern.link"
			}
		}).then((res) => {
			if (res.status == 200) {
				do_cache = true;
				return res.buffer();
			}
			else {
				log.warn(`Map tile request failed: ${res.statusText} (${res.status})`);
				return sendEmptyTile(req.hostname, util.getHttpsPort())
					.then((res) => {
						return res.buffer();
					});
			}
		})
		.then((buffer) => {
			res.type("png");
			res.send(buffer);
			if (do_cache) {
				// also save to cache
				fs.writeFile(local_path, buffer);
			    //log.debug(`Cache tile: ${req.url}`);
		    }
		});
	});
}