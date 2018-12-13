"use strict";

const LV = window.LV || {}; if (!window.LV) window.LV = LV;

LV.GraphDB = require("gun");
LV.SEA = require("sea");
LV.PouchDB = require("pouchdb-browser");

/** 
* gun-unset
* https://github.com/d3x0r/gun-unset
**/
const rel_ = LV.GraphDB.val.rel._;  // '#'
const node_ = LV.GraphDB.node._;  // '_'

LV.GraphDB.chain.unset = function(node){
    if( this && node && node[node_] && node[node_].put && node[node_].put[node_] && node[node_].put[node_][rel_] )
        this.put( { [node[node_].put[node_][rel_]]:null} );
    return this;
}