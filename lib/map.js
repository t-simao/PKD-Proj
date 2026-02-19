"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.make_map = make_map;
exports.add_place = add_place;
var list_1 = require("./list");
var hashtables_1 = require("./hashtables");
var hallway = 5;
var elevator = 10;
var ramp = 15;
var stair = 25;
/**
 * Maken an empty graph which satisfies the ListGraph_withWeights type
 * @returns a graph which satisfies the ListGraph_withWeights type
 */
function make_map() {
    return {
        names: (0, hashtables_1.ph_empty)(1, hashtables_1.hash_id),
        adj: [],
        size: 0
    };
}
function add_place(map, name) {
    var id = map.size;
    (0, hashtables_1.ph_insert)(map.names, id, name);
    map.adj.push((0, list_1.list)());
    map.size = map.size + 1;
}
var map = make_map();
add_place(map, "Library");
add_place(map, "Café");
console.log(map.names);
console.log("LIST");
console.log(map.adj);
console.log("SIZE");
console.log(map.size);
