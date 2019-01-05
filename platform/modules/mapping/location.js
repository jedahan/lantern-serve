"use strict";
const LX = window.LX || {}; if (!window.LX) window.LX = LX;


LX.Location = {};

 //------------------------------------------------------------------------
/** 
* Attempt to reduce any type of location into a geohash for storage and processing
*/
LX.Location.toGeohash = function(input, precision) {
    precision = precision || 8;
    if (typeof(input) == "string") {
        try {
            LV.Geohash.decode(input);
            return input;
        }
        catch(e) {
            console.log(e);
            console.log("[Location] Sanitize failed for geolocation string", input);
        }
    }
    else if (typeof(input) == "object") {
        try {
            if (input.hasOwnProperty("coords")) {
                return LV.Geohash.encode(input.coords.latitude, input.coords.longitude);
            }
            else if (input.hasOwnProperty("lat") && input.hasOwnProperty("lng")) {
                return LV.Geohash.encode(input.lat, input.lng, precision);
            }
            else {
                return LV.Geohash.encode(input, precision);
            }
        }
        catch(e) {
            console.log("[Location] Sanitize failed for geolocation object", input);
        }
    }
}


/**
* Calculation distance between two geolocations in kilometers
*/
LX.Location.distanceInKm = function(a, b) {
    let geo_a = this.toGeohash(a);
    let geo_b = this.toGeohash(b); 
    if (geo_a && geo_b) {
        return LV.GeohashDistance.inKm(geo_a,geo_b);
    }
}

/**
* Calculation distance between two geolocations in miles
*/
LX.Location.distanceInMiles = function(a, b) {
    let geo_a = this.toGeohash(a);
    let geo_b = this.toGeohash(b);
    if (geo_a && geo_b) {
        return LV.GeohashDistance.inMiles(geo_a,geo_b);
    }
}