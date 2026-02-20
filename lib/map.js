"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.make_map = make_map;
exports.add_place = add_place;
exports.add_edge = add_edge;
exports.rev_edge = rev_edge;
var list_1 = require("./list");
var hashtables_1 = require("./hashtables");
var Pathway_const = {
    hallway: 5,
    elevator: 10,
    ramp: 15,
    stairs: 25
};
// Helper functions
function make_node(name, floor, idx) {
    return {
        id: idx,
        name: name,
        floor: floor
    };
}
function make_edge(to, type) {
    var Weight = Pathway_const[type];
    return {
        to: to.id,
        type: type,
        weight: Weight
    };
}
function add_path(map, idx, path) {
    map.adj[idx] = (0, list_1.pair)(path, map.adj[idx]);
}
function get_dst(map, edge) {
    var dst = map.nodes[edge.to];
    return dst.name;
}
function get_node(ht, place) {
    return (0, hashtables_1.ph_lookup)(ht, place);
    ;
}
function get_id(node) {
    return node.id;
    ;
}
function get_name(node) {
    return node.name;
    ;
}
function rev_path(map, idx, dst) {
    var allpaths_fromsrc = map.adj[idx];
    var temp = null;
    while (allpaths_fromsrc !== null) {
        if ((0, list_1.head)(allpaths_fromsrc).to !== dst) {
            temp = (0, list_1.pair)((0, list_1.head)(allpaths_fromsrc), temp);
        }
        allpaths_fromsrc = (0, list_1.tail)(allpaths_fromsrc);
    }
    map.adj[idx] = temp;
}
// Main functions
/**
 * Maken an empty graph which satisfies the Map type
 * @returns a graph which satisfies the Map type
 */
function make_map() {
    return {
        places: (0, hashtables_1.ph_empty)(1, hashtables_1.hash_id),
        nodes: [],
        adj: [],
        size: 0
    };
}
function add_place(map, name, floor) {
    if ((0, hashtables_1.ph_lookup)(map.places, name) !== undefined) {
        console.log("".concat(name, " already exist, no need to add!!"));
        return;
    }
    var idx = map.size;
    var key = name;
    var node = make_node(name, floor, idx);
    (0, hashtables_1.ph_insert)(map.places, key, node);
    map.adj.push((0, list_1.list)());
    map.nodes[idx] = node;
    map.size = map.size + 1;
}
function path_exist(map, from, to) {
    var src_idx = get_id(from);
    var allpaths_fromsrc = map.adj[src_idx];
    while (allpaths_fromsrc !== null) {
        if ((0, list_1.head)(allpaths_fromsrc).to === to.id) {
            return true;
        }
        allpaths_fromsrc = (0, list_1.tail)(allpaths_fromsrc);
    }
    return false;
}
function add_edge(map, from, type, to) {
    var src = get_node(map.places, from);
    var dst = get_node(map.places, to);
    if (src === undefined) {
        console.log("".concat(from, " does not exist!!"));
    }
    else if (dst === undefined) {
        console.log("".concat(to, " does not exist!!"));
    }
    else if (path_exist(map, src, dst)) {
        console.log("Path already exists!!");
    }
    else {
        var srcIdx = get_id(src);
        var dstIdx = get_id(dst);
        var pathfromsrc = make_edge(dst, type);
        var pathfromdst = make_edge(src, type);
        add_path(map, srcIdx, pathfromsrc);
        add_path(map, dstIdx, pathfromdst);
    }
}
function rev_edge(map, from, to) {
    var src = get_node(map.places, from);
    var dst = get_node(map.places, to);
    if (src === undefined) {
        console.log("".concat(from, " does not exist!!"));
    }
    else if (dst === undefined) {
        console.log("".concat(to, " does not exist!!"));
    }
    else if (!path_exist(map, src, dst)) {
        console.log("Path doesn't exist!!");
    }
    else {
        var srcIdx = get_id(src);
        var dstIdx = get_id(dst);
        rev_path(map, srcIdx, dstIdx);
        rev_path(map, dstIdx, srcIdx);
    }
}
var map = make_map();
add_place(map, "Entrance", 1);
add_place(map, "Library", 1);
add_place(map, "Café", 1);
add_place(map, "Stairs1", 1);
add_place(map, "Lounge", 2);
add_edge(map, "Entrance", "hallway", "Library");
add_edge(map, "Entrance", "stairs", "Stairs1");
add_edge(map, "Library", "ramp", "Café");
add_edge(map, "Stairs1", "stairs", "Lounge");
add_edge(map, "Café", "elevator", "Lounge");
console.log(map.nodes[0]);
var r = map.adj[0];
console.log("__________________PATHS FROM ENTRANCE_____________________________________");
while (r !== null) {
    console.log((0, list_1.head)(r));
    r = (0, list_1.tail)(r);
    console.log("_______________________________________________________");
}
console.log("__________________ALL NODES_____________________________________");
for (var i = 0; i < map.nodes.length; i = i + 1) {
    console.log("__________________________THEIR NAME FROM ARRAY____________________________");
    console.log(get_name(map.nodes[i]));
    console.log("_________________________THE FULL NODE INFO_____________________________");
    console.log(map.nodes[i]);
}
