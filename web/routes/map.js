"use strict"

const fs = require("fs-extra");
const path = require("path");
const fetch = require("fetch-timeout");
const util = require("../util");
const log = util.Logger;


//----------------------------------------------------------------------
module.exports = (serv) => {

	let tiles_dir = path.resolve(__dirname, "../../tiles");
	let assume_internet = true;

	// offer these routes a chance to bypass attempts at internet
	util.checkInternet().then((is_connected) => {
		assume_internet = is_connected;
	});
	
	/**
	* Convert URL to local file path for cached tile
	*/
	const getLocalPathForTile = (params) => {
		let zxy = `${params.z}/${params.x}/${params.y}.png`;
		let target_dir = tiles_dir + "/"+path.dirname(zxy);
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

	const getTileFromCloud = (req, res) => {

		let url = "http://maps.tilehosting.com" + req.url;
		//log.debug("Map tile proxy target is:", url);
		let do_cache = false;

		return fetch(url, {
				cors: true,
				headers: {
					"Origin": util.getDomain()
				}
			}, 1000, "Unable to access map tile in time")
			.then((body) => {
				if (body.status == 200) {
					do_cache = true;
					return body.buffer();
				}
				else {
					//log.warn(`Map tile request failed: ${body.statusText} (${body.status})`);
					throw new Error("Map tile request failed");
				}
			})
			.then((buffer) => {
				res.type("png");
				res.send(buffer);
				return do_cache;
			})
			.catch((e) => {
				//log.warn(`Map tile request failed: ${url}`);
				return sendEmptyTile(res);
			});
	}
 


	//---------------------------------------------------------------------- 
	/**
	* MapTiler Proxy
	*/
	serv.get("/c/:id/styles/:map/:z/:x/:y.png", (req, res, next) => {
		// use offline cache if available, avoids hitting external sever
		let local_path = getLocalPathForTile(req.params);
	  
		//log.debug("use cached tile", local_path);

		fs.readFile(local_path, (err, buffer) => {

			if (err && err.code == "ENOENT" || buffer.length < 100) {
				if (!assume_internet) {
					//log.debug(`Skip offline attempt for: ${url}`);
					return sendEmptyTile(res);
				}
				else {
					getTileFromCloud(req,res)
					.then((do_cache) => {
						if (do_cache) {
							// also save to cache
							// @todo this could be turned into a proper queue in the future
							let delay = 1000 + (2000*Math.random());
							
							setTimeout(() => {
								// use timeout to help prioritize immediate network requests over saving to disk
								//log.debug(`Cache tile: ${req.url}`);
								fs.ensureDirSync(path.dirname(local_path));
								fs.writeFile(local_path, buffer);
							}, delay);
						}
					});
				}
			}
			else if (err) {
				log.error(err);
			}
			else {
				res.type("png");
				res.send(buffer);
			}
		});

	});
}