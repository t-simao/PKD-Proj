"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortest_path = shortest_path;
var prio_queue_1 = require("./prio_queue");
var graphs_1 = require("./graphs");
var list_1 = require("./list");
var map_1 = require("./map");
function dijkstra(map, srcIdx, dstIdx) {
    var pending = (0, prio_queue_1.empty)();
    var distance = (0, graphs_1.build_array)(map.size, function (_) { return Infinity; });
    var parent = (0, graphs_1.build_array)(map.size, function (_) { return -1; });
    distance[srcIdx] = 0;
    parent[srcIdx] = null;
    (0, prio_queue_1.enqueue)(0, srcIdx, pending);
    while (!(0, prio_queue_1.is_empty)(pending)) {
        var current = (0, prio_queue_1.head)(pending); //Idx of the top node
        (0, prio_queue_1.dequeue)(pending);
        if (current === dstIdx) {
            break;
        }
        var adjList = map.adj[current];
        while (adjList !== null) {
            var path = (0, list_1.head)(adjList);
            var cost = path.weight;
            var pathDst = path.to; //Idx of the node the path leads to
            if (distance[pathDst] > distance[current] + cost) {
                distance[pathDst] = distance[current] + cost;
                parent[pathDst] = current;
                (0, prio_queue_1.enqueue)(distance[pathDst], pathDst, pending);
            }
            adjList = (0, list_1.tail)(adjList);
        }
    }
    //console.log(parent);
    //console.log("___________________-")
    return parent;
}
/** MIGHT BE USEFULL: function make_path(map: Map, id: number, path_arr: Array<string>, prt_arr: Array<number | null>): number | null {

    let currPlc = get_name_by_id(map, id);
    path_arr.push(currPlc);

    return prt_arr[id];

}*/
function shortest_path(map, from, to) {
    var src = (0, map_1.get_node_ht)(map, from); //Lookup by string (name)
    var dst = (0, map_1.get_node_ht)(map, to); //Lookup by string (name)
    if (from === to) {
        console.log("".concat(to, " You are at your destination!!"));
    }
    else if (dst === undefined) {
        console.log("".concat(to, " does not exist, add the place first!!"));
        return -1;
    }
    else if (src === undefined) {
        console.log("".concat(from, " does not exist, add the place first!!"));
        return -1;
    }
    else {
        var srcIdx = (0, map_1.get_id)(src);
        var dstIdx = (0, map_1.get_id)(dst);
        var parents = dijkstra(map, srcIdx, dstIdx);
        if (parents[dstIdx] === -1) {
            console.log("Path does not exist!!");
            return;
        }
        else {
            var currPlc = (0, map_1.get_name_by_id)(map, dstIdx);
            var path = [currPlc];
            var parentId = parents[dstIdx];
            while (parentId !== null && parentId !== -1) {
                currPlc = (0, map_1.get_name_by_id)(map, parentId);
                path.push(currPlc);
                parentId = parents[parentId];
            }
            var len = path.length - 1;
            console.log(path);
            for (var i = len; i >= 0; i = i - 1) {
                console.log("".concat(path[i], " "));
            }
        }
    }
}
shortest_path(map_1.map, "Entrance", "Lounge");
