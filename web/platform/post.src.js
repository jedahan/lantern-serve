const LX = window.LX || {}; if (!window.LX) window.LX = LX;
LX.Vendor = {};



//----------------------------------------------------------------------------
LX.Vendor.Vue = require("vue");
require("vue-resource");



//----------------------------------------------------------------------------
LX.Vendor.Moment = require("moment");



//----------------------------------------------------------------------------
LX.Vendor.Geohash = require("latlon-geohash");
LX.Vendor.GeohashDistance = require('geohash-distance');