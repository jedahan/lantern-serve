const Geohash = require('latlon-geohash')
require('leaflet')
require('leaflet.locatecontrol')
require('./helpers/array')
require('./helpers/string')
require('./helpers/math')

const MarkerItem = require('./modules/mapping/marker')
const Organization = require('./modules/data/organization.js')
const Package = require('./modules/data/package.js')
const Director = require('./modules/display/director.js')

// export to browser for global access
window.LX = window.LX || {}
window.LX.Director = Director
window.LX.Package = Package
window.LX.Organization = Organization
window.LX.MarkerItem = MarkerItem
window.LC = window.LC || {}
window.LC.leaflet_map = require('./config/leaflet_map')
window.LC.leaflet_locatecontrol = require('./config/leaflet_locatecontrol')
window.LC.leaflet_tiles = require('./config/leaflet_tiles')
window.LC.maptiler = require('./config/maptiler')
window.LV = window.LV || {}
window.LV.Geohash = Geohash

module.exports = window.LX
