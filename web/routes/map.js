const fs = require("fs-extra");
const path = require("path");
const fetch = require("node-fetch");
const util = require("../util");
const log = util.Logger;


//----------------------------------------------------------------------
module.exports = (serv) => {

	let tiles_dir = path.resolve(__dirname, "../../tiles");
	let assume_internet = true;

	// offer these routes a chance to bypass attempts at internet
	util.checkInternet().then((is_connected) => {
		assume_internet = is_connected;
	})



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
	const sendEmptyTile = (res) => {
		let assets_dir = path.resolve(__dirname, "../public/assets/");
		let file_path = assets_dir + "/empty-tile.png";
		fs.readFile(file_path, (err, buffer) => {
			res.type("png");
			res.send(buffer);
		});
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


		if (!assume_internet) {
			log.warn(`Skip offline attempt for: ${url}`);
			return sendEmptyTile(res);
		}


		log.debug("Map tile proxy target is:", url);
		let do_cache = false;
		fetch(url, {
			cors: true,
			headers: {
				"Origin": util.getDomain()
			}
		}).then((res) => {
			if (res.status == 200) {
				do_cache = true;
				return res.buffer();
			}
			else {
				log.warn(`Map tile request failed: ${res.statusText} (${res.status})`);
				return sendEmptyTile(res)
			}
		})
		.then((buffer) => {
			res.type("png");
			res.send(buffer);
			if (do_cache) {
				// also save to cache
				// @todo this could be turned into a proper queue in the future
				let delay = 500+7000*Math.random();
				setTimeout(() => {
					// use timeout to help prioritize immediate network requests over saving to disk
			    	log.debug(`Cache tile: ${req.url}`);
					fs.writeFile(local_path, buffer);
				}, delay)
		    }
		})
		.catch((e) => {
			log.warn(`Map tile request failed: ${url}`);
			return sendEmptyTile(res);
		});
	});
}