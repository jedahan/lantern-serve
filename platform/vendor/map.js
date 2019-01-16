"use strict";

const LV = window.LV || {}; if (!window.LV) window.LV = LV;

LV.Geohash = require("latlon-geohash");
require('geohash-distance');
require("leaflet");
require("leaflet.locatecontrol");