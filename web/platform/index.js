const LX = window.LX || {}; if (!window.LX) window.LX = LX;

//----------------------------------------------------------------------------
LX.Config = (() => {
	let self = {};

	self.leaflet = {
		attribution: false,
        dbName: "map-cache",
        maxZoom: 16,
        useCache:  true,
        useOnlyCache: false,
        cacheMaxAge: 365*24*3600*1000,
        crossOrigin: true
	};

	self.maptiler = {
		id: "ade1b05a-496f-40d1-ae23-5d5aeca37da2",
		key: "ZokpyarACItmA6NqGNhr",
		map: "streets"
	};

	return self;
})();



//----------------------------------------------------------------------------
LX.Atlas = (() => {
	
	let self = {};

	/** 
	* Attempt to reduce any type of location into a geohash for storage and processing
	*/
	const sanitize = (input) => {
		if (typeof(input) == "string") {
			try {
				LX.Vendor.Geohash.decode(input);
				return input;
			}
			catch(e) {
				console.log(e);
				console.log("[Atlas] Sanitize failed for geolocation string", input);
			}
		}
		else if (typeof(input) == "object") {
			try {
				if (input.hasOwnProperty("coords")) {
					return LX.Vendor.Geohash.encode(input.coords.latitude, input.coords.longitude);
				}
				else if (input.hasOwnProperty("lat") && input.hasOwnProperty("lon")) {
					return LX.Vendor.Geohash.encode(input.lat, input.lon);
				}
				else {
					return LX.Vendor.Geohash.encode(input);
				}
			}
			catch(e) {
				console.log("[Atlas] Sanitize failed for geolocation object", input);
			}
		}
	} 


	//------------------------------------------------------------------------
	// bind dom element for leaflet
	self.map = L.map("map");
    self.map.setView([38.42, -52.79], 3);

    // layer in hosted map tiles
	const tile_uri = [
			"https://maps.tilehosting.com/c/" , LX.Config.maptiler.id, "/styles/", 
			LX.Config.maptiler.map, "/{z}/{x}/{y}.png?key=", LX.Config.maptiler.key
		].join("");
	L.tileLayer(tile_uri, LX.Config.leaflet).addTo(self.map);
	



	//------------------------------------------------------------------------
    // easy access to locate self on map
	self.locate = () => self.map.locate({setView: true});

	// display marker when user locates self
	self.map.on("locationfound", (e) => {
		var radius = e.accuracy / 2;
	    L.marker(e.latlng).addTo(self.map)
	        .bindPopup("You are within " + radius + " meters from this point").openPopup();

	    L.circle(e.latlng, radius).addTo(self.map);
	});
	


	//------------------------------------------------------------------------

    /**
    * Calculation distance between two geolocations in kilometers
    */
    self.distanceInKm = (a, b) => {
    	let geo_a = sanitize(a);
    	let geo_b = sanitize(b); 
    	if (geo_a && geo_b) {
        	return LX.Vendor.GeohashDistance.inKm(geo_a,geo_b);
        }
    }
  	
  	/**
    * Calculation distance between two geolocations in miles
    */
    self.distanceInMiles = (a, b) => {
    	let geo_a = sanitize(a);
    	let geo_b = sanitize(b);
    	if (geo_a && geo_b) {
	        return LX.Vendor.GeohashDistance.inMiles(geo_a,geo_b);
    	}
    }



	//------------------------------------------------------------------------

	

	return self;
})();