"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_path = get_path;
var prio_queue_1 = require("./prio_queue");
var graphs_1 = require("./graphs");
var list_1 = require("./list");
var building_1 = require("./building");
/**
 * Calculates the shortest path between source node and the destination node,
 * potentially avoiding specific Pathway_types
 *
 * @param {Map} map the map contaning both source and destination nodes and their adjacency lists
 * @param {number} srcId the id of the source node
 * @param {number} dstId the id of the destination node
 * @param {string} to_avoid paths of this type are avoided when calculating the shortest path
 *
 * @returns An object containing:
 * - parents: An array containing each nodes parent in the shortest path, null for the
 * source node and, -1 for every node which is not reachable from the source node. Nodes id corresponds to
 * the index its information is stored at
 * - pathTypes: An array containing the Pathway_type of the path which leads to the node in the
 * shortest path and, "" for source node and nodes which are not reachable from the source node. Nodes id
 * corresponds to the index its information is stored at
 */
function dijkstra(map, srcId, dstId, to_avoid) {
    var pending = (0, prio_queue_1.empty)();
    var distance = (0, graphs_1.build_array)(map.size, function (_) { return Infinity; });
    var parents = (0, graphs_1.build_array)(map.size, function (_) { return -1; });
    var pathTypes = (0, graphs_1.build_array)(map.size, function (_) { return ""; });
    var result = {
        parents: parents,
        pathTypes: pathTypes
    };
    distance[srcId] = 0;
    parents[srcId] = null;
    pathTypes[srcId] = "";
    (0, prio_queue_1.enqueue)(0, srcId, pending);
    while (!(0, prio_queue_1.is_empty)(pending)) {
        var current = (0, prio_queue_1.head)(pending); //Idx of the top node
        (0, prio_queue_1.dequeue)(pending);
        if (current === dstId) {
            break;
        }
        var adjList = map.adj[current];
        while (adjList !== null) {
            var path = (0, list_1.head)(adjList);
            var cost = path.weight;
            if (path.type === to_avoid) {
                cost = Infinity;
            }
            ;
            var pathDst = path.to; //Idx of the node the path leads to
            if (distance[pathDst] > distance[current] + cost) {
                distance[pathDst] = distance[current] + cost;
                parents[pathDst] = current;
                pathTypes[pathDst] = path.type;
                (0, prio_queue_1.enqueue)(distance[pathDst], pathDst, pending);
            }
            adjList = (0, list_1.tail)(adjList);
        }
    }
    return result;
}
/**
 * Calculates the shortest path between two nodes using dijkstra algorithm and if a path exists between them,
 * prints it
 *
 * @param {Map} map the map contaning both source and destination nodes and their adjacency lists
 * @param {string} from the name of the source node
 * @param {string} to the name of the destination node
 * @param {string} to_avoid paths of this type are avoided when calculating the shortest path
 *
 * @returns -1 if either source or destination node doesn't exist, if from and to are same and
 * if there doesn't exist a path from source node to destination node, otherwise it returns void and
 * prints the path
 */
function get_path(map, from, to, to_avoid) {
    if (to_avoid === void 0) { to_avoid = ""; }
    var src = (0, building_1.get_node_ht)(map, from); //Lookup by string (name)
    var dst = (0, building_1.get_node_ht)(map, to); //Lookup by string (name)
    if (src === undefined) {
        console.log("".concat(from, " does not exist, add the place first!!"));
        return -1;
    }
    else if (dst === undefined) {
        console.log("".concat(to, " does not exist, add the place first!!"));
        return -1;
    }
    else if (from === to) {
        console.log("".concat(to, " You are at your destination!!"));
        return -1;
    }
    else {
        var srcId = (0, building_1.get_id)(src);
        var dstId = (0, building_1.get_id)(dst);
        var pathInfo = dijkstra(map, srcId, dstId, to_avoid);
        var parents = pathInfo.parents;
        var pathTypes = pathInfo.pathTypes;
        if (parents[dstId] === -1) {
            console.log("Path does not exist!!");
            return;
        }
        else {
            var currPlc = (0, building_1.get_name_by_id)(map, dstId);
            var currType = pathTypes[dstId];
            var pathNodes = [currPlc];
            var pathEdges = [currType];
            var parentId = parents[dstId];
            while (parentId !== null && parentId !== -1) {
                currPlc = (0, building_1.get_name_by_id)(map, parentId);
                currType = pathTypes[parentId];
                pathNodes.push(currPlc);
                pathEdges.push(currType);
                parentId = parents[parentId];
            }
            var steps = pathEdges.length - 1;
            for (var i = steps; i > 0; i = i - 1) {
                if (i !== 1) {
                    console.log("".concat(steps - (i - 1), ") ").concat(pathEdges[i - 1], ": ").concat(pathNodes[i], " -> ").concat(pathNodes[i - 1]));
                }
                else {
                    console.log("".concat(steps - (i - 1), ") ").concat(pathEdges[i - 1], ": ").concat(pathNodes[i], " -> ").concat(pathNodes[i - 1], " (ARRIVED :)"));
                }
            }
        }
    }
}
