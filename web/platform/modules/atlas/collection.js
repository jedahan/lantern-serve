"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;

LX.MarkerCollection = class MarkerCollection extends LV.EventEmitter {

    constructor(id, map, sets) {
        super();
        sets = sets || ["default"];
        this.id = id;
        this.map = map;
        this.sets = {};
        this.markers = {};

        // create a seperate layer group for each set for full display control
        sets.forEach((set_id) => {
            this.sets[set_id] = L.layerGroup();
        });
    }



    //------------------------------------------------------------------------

    getOne(id) {
        return this.markers[id];
    }

    getAll() {
        let all = [];
        for (var idx in this.markers) {
            all.push(this.markers[idx]);
        }
        return all;
    }


    getOneLayer(id) {
        return this.markers[id].layer;
    }

    getAllLayers() {
        let all = [];
        for (var idx in this.markers) {
            all.push(this.markers[idx].layer);
        }
        return all;
    }

    getTotalSize() {
        let tally = 0;
        for (var set in this.sets) {
            let count = this.getSetSize(set);
            tally += count;                
        }
        return tally;
    }

    getSetSize(set_id) {
        set_id = set_id || "default";
        return this.sets[set_id].getLayers().length;
    }

    showSet(set_id) {
        set_id = set_id || "default";
        return this.map.addLayer(this.sets[set_id]);
    } 

    hideSet(set_id) {
        set_id = set_id || "default";
        return this.map.removeLayer(this.sets[set_id]);
    }   



    //------------------------------------------------------------------------

    add(marker, set, data, opts) {

        this.markers[marker.id] = marker;

        marker.collection = this;

        marker.on("show", () => {
            this.emit("show", marker);
        });

        marker.on("hide", () => {
            this.emit("hide", marker);
        });

        marker.on("remove", () => {
            this.emit("remove", marker);
        });

        marker.show();


        // must show before binding layer events
        marker.layer.on("click", (ev) => {
            this.emit("click", marker);
        });

        let layer_group = this.sets[set || "default"];
        marker.set = layer_group;
        layer_group.addLayer(marker.layer).addTo(this.map);


        this.emit("add", marker, this);

        return marker;
    };
}
