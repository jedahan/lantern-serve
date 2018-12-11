"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;


LX.Marker = class Marker extends LX.SharedObject {
    
    constructor(id) {

        // now set defaults for key compression
        super(id, {
           "geohash": ["g"],
            "tags": ["t", []],
            "owner": ["o"]
        });

        this._icon = null;
        this._collection = null;
        this._set = null;
        this._latlng = null;


        this.on("remove", () => {
            this.hide();
        });

        this.on("mode", (mode) => {
            if (this.layer) {
                // keep dom updated to reflect mode
                this.layer.setIcon(this.getDivIcon());
                //console.log(`${this.log_prefix} mode = `, mode);
            }
        });
    }



    //-------------------------------------------------------------------------
    /**
    * Defines geographic position on map
    *
    * Automatically create a new map layer if not already defined
    */
    set geohash(val) {
        if (val) {

            let starting_val = this._data.geohash;


            try {
                this._latlng = LV.Geohash.decode(val)

                if (val == starting_val) {
                    return;
                }

                if (this.layer) {
                    this.layer.setLatLng(this._latlng);
                }

                this._data.geohash = val;
                console.log(`${this.log_prefix} location = ${this.geohash}`);

                if (starting_val) {
                    this.emit("move", val);
                }
            }
            catch(e) {
                console.log(`${this.log_prefix} error with geohash`, e);
            }
        }
    }

    get geohash() {
        return this._data.geohash;
    }

 

    //-------------------------------------------------------------------------
    /**
    * Show on map
    */
    show() {
        if (this.layer) {
            return;
        }

        let self = this;
        this.layer = L.marker(this._latlng, {
            icon: this.getDivIcon(),
            draggable: false,
            autoPan: true
        });

        //console.log(`${this.log_prefix} Show`, this.layer);

        this.layer.on("dragend", function(e) {
            let latlng = e.target._latlng;
            self.geohash = LV.Geohash.encode(latlng.lat, latlng.lng); 
            console.log(`${self.log_prefix} Dragged to: `,  self.geohash);
        });
        this.emit("show", self);
    }

    /**
    * Hide from the map without altering stored data
    */
    hide() {
        //console.log(`${this.log_prefix} Hide`);
        if (this.layer && this.layer._map) {
            this.layer.remove();
            this.emit("hide", this);            
        }
    }

    //-------------------------------------------------------------------------
    getDivIcon() {
        let cls = "fa";
        if (this._icon) {
            cls += " fa-"+this._icon;
        }
        return L.divIcon({
            html: `<i class="${cls}"></i>`,
            className: `lx-marker lx-marker-${this.mode} ${this.tags.join(" ")}`
        });
    }
    

    getIcon() {
        return this._icon;
    }

    setIcon(value) {
        if (value) {
            // console.log(`${this.log_prefix} icon = ${value}`);
        }
        else {
            // console.log(`${this.log_prefix} clearing icon`); 
        }
        this._icon = value;
        this.layer.setIcon(this.getDivIcon());
    }

    /**
    * Display custom icon based on marker class names
    */
    setIcons (map) {
        this.tags.forEach((tag) => {
            if (map.hasOwnProperty(tag)) {
                this.setIcon(map[tag]);
            }
        });
    }



}