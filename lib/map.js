"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = void 0;
exports.get_node_ht = get_node_ht;
exports.get_node_arr = get_node_arr;
exports.get_id = get_id;
exports.get_name = get_name;
exports.get_name_by_id = get_name_by_id;
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
    stairs: 0
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
function get_node_ht(map, place) {
    return (0, hashtables_1.ph_lookup)(map.places, place);
    ;
}
function get_node_arr(map, idx) {
    return map.nodes[idx];
}
function get_id(node) {
    return node.id;
    ;
}
function get_name(node) {
    return node.name;
}
function get_name_by_id(map, id) {
    var arr = map.nodes;
    var curr_node = arr[id];
    return curr_node.name;
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
        places: (0, hashtables_1.ph_empty)(15, hashtables_1.hash_id),
        nodes: [],
        adj: [],
        size: 0
    };
}
function add_place(map, name, floor) {
    if (get_node_ht(map, name) !== undefined) {
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
    var src = get_node_ht(map, from);
    var dst = get_node_ht(map, to);
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
    var src = get_node_ht(map, from);
    var dst = get_node_ht(map, to);
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
exports.map = make_map();
add_place(exports.map, "Entrance", 1); //0
add_place(exports.map, "Library", 1); //1
add_place(exports.map, "Café", 1); //2
add_place(exports.map, "Stairs1", 1); //3
add_place(exports.map, "Lounge", 2); //4
add_edge(exports.map, "Entrance", "hallway", "Library");
add_edge(exports.map, "Entrance", "stairs", "Stairs1");
add_edge(exports.map, "Library", "ramp", "Café");
add_edge(exports.map, "Stairs1", "stairs", "Lounge");
add_edge(exports.map, "Café", "elevator", "Lounge");
/** console.log(map.nodes[0]);
let r = map.adj[0];

console.log("__________________PATHS FROM ENTRANCE_____________________________________")
while(r !== null) {
    console.log(head(r));
    r = tail(r)
    console.log("_______________________________________________________")
}

console.log("__________________ALL NODES_____________________________________")

for(let i = 0; i < map.nodes.length; i = i + 1) {
    console.log("__________________________THEIR NAME FROM ARRAY____________________________")
    console.log(get_name(map.nodes[i]));

    console.log("_________________________THE FULL NODE INFO_____________________________")
    console.log(map.nodes[i]);

} */ 
