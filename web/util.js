/**
* Lantern Utilities
*
*/
const path = require('path')
const fs = require('fs-extra')
const browserify = require('browserify')
const minify = require('@node-minify/core')
const uglifyJS = require('@node-minify/uglify-es')
const concat = require('concat')
const self = {}

// ----------------------------------------------------------------------
self.removeMeta = function (obj) {
    for (var prop in obj) {
        if (prop === 'path') {
            delete obj[prop]
        } else if (typeof obj[prop] === 'object') {
            this.removeMeta(obj[prop])
        }
    }
}

// ----------------------------------------------------------------------
/**
* Log facility
*/
self.Logger = require('simple-node-logger').createSimpleLogger({
    logFilePath: path.resolve(__dirname, '../logs', 'http.log'),
    dateFormat: 'YYYY.MM.DD'
})

/**
* Get HTTP Non-Secure Port
*/
self.getHttpPort = () => {
    return (process.env.TERM_PROGRAM ? 9090 : 80)
}

/**
* Get HTTPS Secure Port
*/
self.getHttpsPort = () => {
    return (process.env.TERM_PROGRAM ? 9443 : 443)
}

/**
* Intended / common domain used even while offline
*/
self.getDomain = () => {
    return 'lantern.link'
}

/**
* Check for internet access
*/
self.checkInternet = () => {
    return new Promise((resolve, reject) => {
        require('dns').lookup('google.com', (err, res) => {
            if (err && err.code == 'ENOTFOUND') {
                resolve(false)
            } else if (res.substr(0, 4) == '192.') {
                // local IP from router
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}

/**
* Extract IP address from request object
*/
self.getClientIP = (req) => {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress
}

/**
* Check if this is a remote client requesting a resource
*/
self.isRemoteClient = (req) => {
    let ip = self.getClientIP(req)
    return ip && (ip.indexOf('127.0.0.1') === -1)
}

// ----------------------------------------------------------------------
/**
* Simplifies message by removing sequence, useful for comparisons
*/
self.getSimpleMessage = (msg) => {
    return msg.replace(/^([0-9]+)\|/, '')
}

// ----------------------------------------------------------------------
/**
* Minify styles
*/
self.compressStylesheets = () => {
    return new Promise((resolve, reject) => {
        let files = [
            'node_modules/bulma/css/bulma.min.css',
            'node_modules/leaflet/dist/leaflet.css',
            'node_modules/leaflet.locatecontrol/dist/L.Control.Locate.min.css',
            'node_modules/@fortawesome/fontawesome-free/css/all.min.css',
            'node_modules/typeface-montserrat/index.css'
        ]

        let vendor_css = path.resolve(__dirname, './public/styles/vendor.css')

        concat(files, vendor_css)
        resolve()
    })
}

/**
* Pack scripts
*/

self.packJavascript = () => {
    return new Promise((resolve, reject) => {
        let platform_script = path.resolve(__dirname, './public/scripts/platform.js')

        let files = [
            'platform/header.js',
            'platform/vendor/core.js',
            'platform/vendor/storage.js',
            'platform/helpers/array.js',
            'platform/helpers/string.js',
            'platform/helpers/math.js',
            'platform/modules/data/database.js',
            'platform/modules/data/organization.js',
            'platform/modules/data/package.js',
            'platform/modules/data/item.js',
            'platform/modules/data/user.js',
            'platform/modules/data/feed.js',
            'platform/config/leaflet.js',
            'platform/vendor/map.js',
            'platform/modules/mapping/location.js',
            'platform/modules/mapping/marker.js',
            'platform/modules/mapping/atlas.js',
            'platform/modules/display/director.js',
            'platform/vendor/display.js',
            'platform/modules/display/app.js',
            'platform/modules/display/view.js',
            'platform/modules/display/menu.js'
        ]

        let b = browserify(files)
        let write_stream = fs.createWriteStream(platform_script)
        b.bundle()
            .pipe(write_stream)
            .on('finish', () => {
                resolve()
            })
            .on('error', (e) => {
                reject(e)
            })
    })
}

/**
* Minify scripts
*/
self.compressJavascript = () => {
    return new Promise((resolve, reject) => {
        // handle minification directly here rather than build scripts
        let platform_min = path.resolve(__dirname, './public/scripts/platform.min.js')

        // offer compressed versions of scripts
        minify({
            compressor: uglifyJS,
            input: path.resolve(__dirname, './public/scripts/platform.js'),
            output: platform_min,
            callback: resolve
        })
    })
}

// ----------------------------------------------------------------------
/**
* Display memory usage over time
*/
self.watchMemory = () => {
    setInterval(() => {
        self.Logger.debug('---')
        let arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10]
        arr.reverse()
        let used = process.memoryUsage()
        for (const key in used) {
            self.Logger.debug(key + ' ' + Math.round(used[key] / 1024 / 1024 * 100) / 100 + ' MB')
        }
        self.Logger.debug('---')
    }, 60 * 1000 * 2)
}

module.exports = self
