'use strict'

/**
* Lantern HTTP Server
*
* We serve web logic with Express and the database at the same origin.
* This allows easy access to the database through javascript.
* Useful for hosting on a Raspberry Pi or cloud environment.
*
**/

// ----------------------------------------------------------------------
const fs = require('fs-extra')
const path = require('path')
fs.ensureDirSync(path.resolve(__dirname, '../logs'))
fs.ensureDirSync(path.resolve(__dirname, '../db'))
fs.ensureDirSync(path.resolve(__dirname, '../tiles'))

// ----------------------------------------------------------------------
const http = require('http')
const https = require('https')
const GraphDB = require('gun')
const util = require('./util')
const app = require('./server')
const log = util.Logger

// ----------------------------------------------------------------------------
log.setLevel(process.env.LOG_LEVEL || 'debug')
log.info('##############################################')
log.info('Lantern App Server')
log.info('##############################################')

// ----------------------------------------------------------------------------

let secureServer = null
try {
  // read in ssl certificate data
  let privateKeyPath = process.env.SSL_PRIVATE_KEY || path.resolve(__dirname, '../certs/dev.lantern.link-key.pem')
  let certificatePath = process.env.SSL_CERTIFICATE || path.resolve(__dirname, '../certs/dev.lantern.link.pem')
  let credentials = {
    key: fs.readFileSync(privateKeyPath, 'utf8'),
    cert: fs.readFileSync(certificatePath, 'utf8')
  }
  secureServer = https.createServer(credentials, app)
} catch (e) {
  if (e.code === 'ENOENT') {
    log.error(`SSL certificates not found in "certs" directory...`)
  } else {
    log.error(e)
  }
}

// start the web server with built-in database solution
let httpServer = http.createServer(app)

let stdServer = httpServer.listen(util.getHttpPort(), () => {
  let dbPath = path.resolve(__dirname, '../db/dev')
  if (process.env.DB) {
    dbPath = path.resolve(__dirname, '../' + process.env.DB)
  }

  GraphDB({
    file: dbPath,
    web: secureServer || stdServer
  })

  log.info(`database path = ${dbPath}`)

  if (secureServer) {
    secureServer.listen(util.getHttpsPort())
    log.info(`secure port = ${util.getHttpsPort()}`)
  } else {
    log.warn('falling back to http for local development...')
    log.info(`standard port = ${util.getHttpPort()}`)
  }
})
