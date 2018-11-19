"use strict";
const LX = window.LX || {}; if (!window.LX) window.LX = LX;
LX.Vendor = LX.Vendor || {};



//----------------------------------------------------------------------------
LX.Vendor.Vue = require("vue");
require("vue-resource");



//----------------------------------------------------------------------------
LX.Vendor.Moment = require("moment");



//----------------------------------------------------------------------------
LX.Vendor.Geohash = require("latlon-geohash");
require('geohash-distance');



//----------------------------------------------------------------------------
const elliptic = require("elliptic");
const Mnemonic = require("mnemonic.js");
const shortHash = require("short-hash");

LX.Profile = class Profile {

	constructor(check) {
		this.db = new LX.Vendor.PouchDB("lx-user");
		if (check) {
			// check browser for known profile for this user
			this.db.get("profile").then((profile) => {
				console.log(profile);
			})
		}
	}

	register() {
		var m;
		const ec = new elliptic.ec('secp256k1');
	    // deterministic public / private keys plus handles based on words
	    if (typeof(secret) == "object") {
	        m = Mnemonic.fromWords(secret);
	    }
	    else if (typeof(secret) == "string") {
	        this.public_key = secret;
	    }
	    else {
	        m = new Mnemonic(64);
	    }
	    
	    if (m) {
	        // keep words for user backup
	        this.mnemonic = m.toWords();

	        // define private key based on mnemonic
	        this.private_key = m.toHex();
	            
	        // http://procbits.com/2013/08/27/generating-a-bitcoin-address-with-javascript
	        var public_point = ec.keyFromPrivate(this.private_key).getPublic();

	        // create public address based on key pair
	        this.public_key = public_point.encodeCompressed("hex");
	    }

	    this.address = shortHash(this.public_key);
	}

	save() {
		let doc = {
			"_id" : "profile",
			"mnemonic": this.mnemonic,
			"address": this.address,
			"public_key": this.public_key,
			"private_key": this.private_key 
		}
		this.db.put(doc).then(() => {
			console.log("[Profile] Saved to browser");
		});
	}
}