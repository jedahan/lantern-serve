/**
* Map Routes
*
* Proxies MapTiler requests and caches offline for reliable access
**/
const fs = require('fs-extra')
const path = require('path')
const request = require('request')
const util = require('../util')
const log = util.Logger

// ----------------------------------------------------------------------
module.exports = (serv) => {
    let tiles_dir = path.resolve(__dirname, '../public/tiles')
    let assume_internet = true

    // offer these routes a chance to bypass attempts at internet
    util.checkInternet().then((is_connected) => {
        assume_internet = is_connected
    })

    /**
    * Convert URL to local file path for cached tile
    */
    const getLocalPathForTile = (params) => {
        let zxy = `${tiles_dir}/${params.z}_${params.x}_${params.y}.png`
        return zxy
    }

    /**
    * Use special empty tile to notify user that a tile request was forbidden or failed
    */
    const sendEmptyTile = (res) => {
        let assets_dir = path.resolve(__dirname, '../public/assets/')
        let file_path = assets_dir + '/empty-tile.png'
        fs.readFile(file_path, (err, buffer) => {
            res.type('png')
            res.send(buffer)
        })
    }

    /**
    * Use MapTiler service to proxy and save tiles to local storage
    */
    const getTileFromCloud = (req, res) => {
        let preq = request('http://maps.tilehosting.com' + req.url)

        // return result as quickly as possible to browser
        preq
            .on('response', (pres) => {
                // log.debug("Streamed tile from cloud: " + req.url);
            })
            .on('error', (err) => {
                log.error('Could not stream tile for: ' + req.url)
                log.error(err)
                sendEmptyTile(res)
            })
            .pipe(res)

        // also stream to file system for cache
        preq.pipe(fs.createWriteStream(getLocalPathForTile(req.params)))
            .on('error', (err) => {
                log.error('Could not save tile for: ' + req.url)
                log.error(err)
            })
    }

    // ----------------------------------------------------------------------
    /**
    * MapTiler Proxy
    */
    serv.get('/c/:id/styles/:map/:z/:x/:y.png', (req, res, next) => {
        // use offline cache if available, avoids hitting external sever
        fs.readFile(getLocalPathForTile(req.params), (err, buffer) => {
            if (err && err.code == 'ENOENT' || buffer.length < 100) {
                if (!assume_internet) {
                    // log.debug(`Skip offline attempt for: ${req.url}`);
                    return sendEmptyTile(res)
                } else {
                    getTileFromCloud(req, res)
                }
            } else if (err) {
                log.error(err)
            } else {
                res.type('png')
                res.send(buffer)
            }
        })
    })
}
