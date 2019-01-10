const fs = require('fs-extra')
const path = require('path')
const fetch = require('fetch-timeout')
const util = require('../util')
const log = util.Logger

// ----------------------------------------------------------------------
module.exports = (serv) => {
  let tilesDir = path.resolve(__dirname, '../../tiles')
  let assumeInternet = true

  // offer these routes a chance to bypass attempts at internet
  util.checkInternet().then((isConnected) => {
    assumeInternet = isConnected
  })

  /**
  * Convert URL to local file path for cached tile
  */
  const getLocalPathForTile = (params) => {
    let zxy = `${params.z}/${params.x}/${params.y}.png`
    let targetDir = tilesDir + '/' + path.dirname(zxy)
    fs.ensureDirSync(targetDir)
    let fileName = path.basename(zxy)
    let filePath = targetDir + '/' + fileName
    return filePath
  }

  /**
  * Use special empty tile to notify user that a tile request was forbidden or failed
  */
  const sendEmptyTile = (res) => {
    let assetsDir = path.resolve(__dirname, '../public/assets/')
    let filePath = assetsDir + '/empty-tile.png'
    fs.readFile(filePath, (err, buffer) => {
      res.type('png')
      res.send(buffer)
    })
  }

  /**
  * MapTiler Proxy
  */
  serv.get('/c/:id/styles/:map/:z/:x/:y.png', (req, res, next) => {
    let localPath = getLocalPathForTile(req.params)

    // use offline cache if available, avoids hitting external sever
    if (fs.existsSync(localPath)) {
      // log.debug("use cached tile", localPath);
      fs.readFile(localPath, (err, buffer) => {
        res.type('png')
        res.send(buffer)
      })
      return
    }

    let url = 'https://maps.tilehosting.com' + req.url

    if (!assumeInternet) {
      log.warn(`Skip offline attempt for: ${url}`)
      return sendEmptyTile(res)
    }

    // log.debug("Map tile proxy target is:", url);
    let doCache = false
    fetch(url, {
      cors: true,
      headers: {
        'Origin': util.getDomain()
      }
    }, 1000, 'Unable to access map tile in time').then((body) => {
      if (body.status === 200) {
        doCache = true
        return body.buffer()
      } else {
        log.warn(`Map tile request failed: ${body.statusText} (${body.status})`)
        throw new Error('Map tile request failed')
      }
    })
      .then((buffer) => {
        res.type('png')
        res.send(buffer)
        if (doCache) {
          // also save to cache
          // @todo this could be turned into a proper queue in the future
          let delay = 500 + 7000 * Math.random()
          setTimeout(() => {
            // use timeout to help prioritize immediate network requests over saving to disk
            // log.debug(`Cache tile: ${req.url}`);
            fs.writeFile(localPath, buffer)
          }, delay)
        }
      })
      .catch((e) => {
        log.warn(`Map tile request failed: ${url}`)
        return sendEmptyTile(res)
      })
  })
}
