"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pathway_cost = exports.Pathway_type_arr = void 0;
exports.make_map = make_map;
exports.get_node_ht = get_node_ht;
exports.get_node_arr = get_node_arr;
exports.get_id = get_id;
exports.get_name = get_name;
exports.get_type = get_type;
exports.get_name_by_id = get_name_by_id;
exports.check_empty = check_empty;
exports.remove_place = remove_place;
exports.add_place = add_place;
exports.add_path = add_path;
exports.rev_path = rev_path;
var list_1 = require("./list");
var hashtables_1 = require("./hashtables");
exports.Pathway_type_arr = ["hallway_S", "hallway_L", "elevator", "ramp", "stairs", "hallway_C"];
exports.Pathway_cost = {
    hallway_S: 5,
    ramp: 8,
    hallway_C: 10,
    hallway_L: 10,
    elevator: 12,
    stairs: 20
};
// Helper functions
//Makes an empty map which satisfies the Map type
function make_map() {
    return {
        places: (0, hashtables_1.ph_empty)(15, hashtables_1.hash_id),
        nodes: [],
        adj: [],
        size: 0
    };
}
//Makes a Place containing the provided information and returns it
function make_node(name, floor, idx) {
    return {
        id: idx,
        name: name,
        floor: floor
    };
}
//Makes an edge representing a path between two nodes of the provided Pathway_type and returns it
function make_edge(to, type) {
    var weight = exports.Pathway_cost[type];
    return {
        to: to.id,
        type: type,
        weight: weight
    };
}
//Adds the path adjacency list of the node at index idx
function helper_add_path(map, idx, path) {
    map.adj[idx] = (0, list_1.pair)(path, map.adj[idx]);
}
//Uses the provided string as key and returns the node that corresponds to that key from the hashtable
function get_node_ht(map, place) {
    return (0, hashtables_1.ph_lookup)(map.places, place);
}
//Returns the node that corresponds to the given index from the nodes array in the Map
function get_node_arr(map, idx) {
    return map.nodes[idx];
}
//Given a node returns its id
function get_id(node) {
    return node.id;
}
//Given a node returns its name
function get_name(node) {
    return node.name;
}
//Given a edge returns its path type
function get_type(edge) {
    return edge.type;
}
//Given a map and an id, returns the name of the node which corresponds to that id
function get_name_by_id(map, id) {
    var arr = map.nodes;
    var curr_node = arr[id];
    return curr_node.name;
}
/**
 * Given a map, an id and the id of the destination, if a path exists between them, removes that path
 * @param {Map} map the map
 * @param {number} idx represents the id of the node which has the path thats being removed
 * @param {number} dst represents the id of the node which the path being removed leads to
 */
function helper_rev_path(map, idx, dst) {
    var allpaths_fromsrc = map.adj[idx];
    var temp = null;
    while (allpaths_fromsrc !== null) {
        if ((0, list_1.head)(allpaths_fromsrc).to !== dst) {
            temp = (0, list_1.pair)((0, list_1.head)(allpaths_fromsrc), temp);
        }
        allpaths_fromsrc = (0, list_1.tail)(allpaths_fromsrc);
    }
    var res = (0, list_1.reverse)(temp);
    map.adj[idx] = res;
}
/**
 * Given a map, and two nodes checks if there exists a path between them
 * @param {Map} map the map
 * @param {Node} from represents the node the path starts from
 * @param {Node} dst represents the node the path ends at
 * @returns {boolean} true if a path between the provided nodes exists and false if it doesn't
 */
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
//Returns a adjacency list with the path removed which leads to the node corresponding to the provided id
function remove_it(id, li) {
    return (0, list_1.is_null)(li)
        ? null
        : id === (0, list_1.head)(li).to
            ? (0, list_1.tail)(li)
            : (0, list_1.pair)((0, list_1.head)(li), remove_it(id, (0, list_1.tail)(li)));
}
//Checks if there exists a dummy node in the array where there used to be a value but now is empty
function check_empty(ids) {
    for (var i = 0; i < ids.length; i++) {
        if (ids[i].name === '') {
            return i;
        }
    }
    return -1;
}
// Main functions
/**Provided a map and the name of a place, if the place exists, removes it from the map and all
 * of the paths that lead to that place. It also adds a dummy node in the maps node array
 * @param {Map} map the map the place should be removed from
 * @param {string} name the name of the place that should be removed if it exists
 */
function remove_place(g, name) {
    var y = (0, hashtables_1.ph_lookup)(g.places, name);
    if (y === undefined)
        return;
    g.adj[y.id] = null;
    var i = 0;
    while (i < g.adj.length) {
        g.adj[i] = remove_it(y.id, g.adj[i]);
        i++;
    }
    (0, hashtables_1.ph_delete)(g.places, name);
    g.nodes[y.id] = { id: y.id, name: '', floor: -1 };
    g.size--;
}
/**
 * Makes a Node of the provided name and adds that node to the given map only if it
 * doesn't already exist in the map
 * @param {Map} map represents the map the node should be added to
 * @param {string} name represents the name value that the node should have
 * @param {number} floor represents the floor value the node should have
 * @returns {number} 0 if the node was created and added successfully but -1 if the node already
 * exists in the map or if the name value is an empty string
 */
function add_place(map, name, floor) {
    if (get_node_ht(map, name) !== undefined)
        return -1;
    var e_spot = check_empty(map.nodes);
    if (e_spot === -1) {
        var idx = map.size;
        var node = make_node(name, floor, idx);
        (0, hashtables_1.ph_insert)(map.places, name, node);
        map.adj.push((0, list_1.list)());
        map.nodes[idx] = node;
    }
    else {
        var node = make_node(name, floor, e_spot);
        (0, hashtables_1.ph_insert)(map.places, name, node);
        map.nodes[e_spot] = node;
    }
    map.size = map.size + 1;
    console.log("".concat(name, " was added to floor number ").concat(floor));
    return 0;
}
/**
 * Adds a two way path between from and to, only if it doesn't already exists in the map
 * @param {Map} map the map which the path should the added to
 * @param {string} from the name of the node at one of the ends of the path
 * @param {Pathway_type} type the type of the path being added
 * @returns {number} 0 if a path going from "from" to "to" and from "to" to "from" is added and -1 if
 * node: from doesn't exist in the map or node: to doesn't exist in the map and if the path already exists
 * between these two nodes or if from === to
 */
function add_path(map, from, type, to) {
    var src = get_node_ht(map, from);
    var dst = get_node_ht(map, to);
    if (from === to) {
        console.log("A path cannot start and end at the same location!!");
        return -1;
    }
    if (src === undefined) {
        console.log("A place called ".concat(from, " does not exist, Please add it first!!"));
        return -1;
    }
    else if (dst === undefined) {
        console.log("A place called ".concat(to, " does not exist, Please add it first!!"));
        return -1;
    }
    else if (path_exist(map, src, dst)) {
        console.log("Path already exists!!");
        return -1;
    }
    else {
        var srcIdx = get_id(src);
        var dstIdx = get_id(dst);
        var pathfromsrc = make_edge(dst, type);
        var pathfromdst = make_edge(src, type);
        helper_add_path(map, srcIdx, pathfromsrc);
        helper_add_path(map, dstIdx, pathfromdst);
        console.log("A path from ".concat(from, " to ").concat(to, " has been added!!"));
        console.log("A path from ".concat(to, " to ").concat(from, " has also been added!!"));
        return 0;
    }
}
/**
 * Removes a two way path between from and to, only if it already exists in the map
 * @param {Map} map represents the map which the path should the added to
 * @param {string} from represents the name of the node at one of the ends of the path
 * @param {string} to represents the name of the node at the other end of the path
 * @returns {number} 0 if a path going from "from" to "to" and from "to" to "from" is removed and -1 if
 * node: from doesn't exist in the map or node: to doesn't exist in the map and if the path already exists
 * between these two nodes or if from === to
 */
function rev_path(map, from, to) {
    var src = get_node_ht(map, from);
    var dst = get_node_ht(map, to);
    if (src === undefined) {
        console.log("".concat(from, " does not exist!!"));
        return -1;
    }
    else if (dst === undefined) {
        console.log("".concat(to, " does not exist!!"));
        return -1;
    }
    else if (!path_exist(map, src, dst)) {
        console.log("Path doesn't exist!!");
        return -1;
    }
    else {
        var srcIdx = get_id(src);
        var dstIdx = get_id(dst);
        helper_rev_path(map, srcIdx, dstIdx);
        helper_rev_path(map, dstIdx, srcIdx);
        console.log("A path from ".concat(from, " to ").concat(to, " has been removed!!"));
        console.log("A path from ".concat(to, " to ").concat(from, " has also been removed!!"));
        return 0;
    }
}
