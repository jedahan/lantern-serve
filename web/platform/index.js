const LX = window.LX || {}; if (!window.LX) window.LX = LX;

LX.Map = (function() {
	const map = L.map("map");
	const opts = {      
		attribution: false,
        dbName: "map-cache",
        maxZoom: 16,
        useCache:  true,
        useOnlyCache: false,
        cacheMaxAge: 365*24*3600*1000,
        crossOrigin: true
	};
	const tile_domain = "maps.tilehosting.com";
	const tile_id = "ade1b05a-496f-40d1-ae23-5d5aeca37da2";
	const tile_map = "streets";
	const tile_key = "ZokpyarACItmA6NqGNhr";
	const tile_uri = [
		"https://", tile_domain, "/c/", tile_id, "/styles/", tile_map,
		 "/{z}/{x}/{y}.png?key=", tile_key
	].join("");
	L.tileLayer(tile_uri, opts).addTo(map);
    map.setView([38.42, -52.79], 3);
    return map;
})();