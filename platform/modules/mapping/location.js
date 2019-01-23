const Geohash = require('latlon-geohash')
const LXLocation = {}

// ------------------------------------------------------------------------
/**
* Attempt to reduce any type of location into a geohash for storage and processing
*/
LXLocation.toGeohash = function (input, precision) {
    precision = precision || 8
    if (typeof (input) === 'string') {
        try {
            Geohash.decode(input)
            return input
        } catch (e) {
            console.log(e)
            console.log('[Location] Sanitize failed for geolocation string', input)
        }
    } else if (typeof (input) === 'object') {
        try {
            if (input.hasOwnProperty('coords')) {
                return Geohash.encode(input.coords.latitude, input.coords.longitude)
            } else if (input.hasOwnProperty('lat') && input.hasOwnProperty('lng')) {
                return Geohash.encode(input.lat, input.lng, precision)
            } else {
                return Geohash.encode(input, precision)
            }
        } catch (e) {
            console.log('[Location] Sanitize failed for geolocation object', input)
        }
    }
}

/**
* Calculation distance between two geolocations in kilometers
*/
LXLocation.distanceInKm = function (a, b) {
    let geo_a = this.toGeohash(a)
    let geo_b = this.toGeohash(b)
    if (geo_a && geo_b) {
        return GeohashDistance.inKm(geo_a, geo_b)
    }
}

/**
* Calculation distance between two geolocations in miles
*/
LXLocation.distanceInMiles = function (a, b) {
    let geo_a = this.toGeohash(a)
    let geo_b = this.toGeohash(b)
    if (geo_a && geo_b) {
        return GeohashDistance.inMiles(geo_a, geo_b)
    }
}

module.exports = LXLocation
