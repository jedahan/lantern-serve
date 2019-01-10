'use strict'

/**
* Lantern HTTP Server
*
* We serve web logic with Express and the database at the same origin.
* This allows easy access to the database through javascript.
* Useful for hosting on a Raspberry Pi or cloud environment.
*
**/
const express = require('express')
const GraphDB = require('gun')
const fs = require('fs-extra')
const path = require('path')
const compression = require('compression')
const util = require('./util')
const log = util.Logger
const server = express()

// ----------------------------------------------------------------------------
server.disable('x-powered-by')
server.use(compression())
server.use(GraphDB.serve)

// auto-load middleware
const middlewareFiles = fs.readdirSync(path.resolve(__dirname, './middleware'))
middlewareFiles.forEach((file) => {
  log.debug('[middleware] ' + file)
  server.use(require('./middleware/' + file))
})

// auto-load routes
const routeFiles = fs.readdirSync(path.resolve(__dirname, './routes'))
routeFiles.forEach((file) => {
  log.debug('[route] ' + file)
  require('./routes/' + file)(server)
})

// layers for custom app functionality
const appsPath = path.resolve(__dirname, '..', 'apps')
server.use('/-/', express.static(appsPath))

// modules
const modulesPath = path.resolve(__dirname, '../node_modules/')
server.use('/_/', express.static(modulesPath))

// final routes are for any static pages and binary files
const staticPath = path.resolve(__dirname, './public/')
server.get('/@/', (req, res) => {
  res.sendFile(staticPath + '/captive.html')
})
server.use('/', express.static(staticPath))

module.exports = server
