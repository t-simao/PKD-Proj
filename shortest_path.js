"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lg_shortest_path = lg_shortest_path;
const list_1 = require("./lib/list");
const queue_array_1 = require("./lib/queue_array");
const hashtables_1 = require("./lib/hashtables");
// Build an array based on a function computing the item at each index
function build_array(size, content) {
    const result = Array(size);
    for (var i = 0; i < size; i = i + 1) {
        result[i] = content(i);
    }
    return result;
}
/**
 * Node colours for traversal algorithms
 * @constant white an unvisited node
 * @constant grey a visited but not finished node
 * @constant black a finished node
 */
const white = 1;
const grey = 2;
const black = 3;
/**
 * Computes a shortest path between two nodes in a ListGraph.
 * Returns one of possibly several paths.
 * @param lg the list graph
 * @param initial the id of the starting node
 * @param end the id of the end node
 * @returns A list with the nodes on one shortest path from initial to end,
 *          with initial and end included. If no such path exists, returns
 *          the empty list.
 */
function lg_shortest_path({ adj, size }, initial, end) {
    // YOUR TASK: modify the original BFS code below.
    // Do NOT modify the function signature.
    const node_ht = (0, hashtables_1.ph_empty)(size, hashtables_1.hash_id);
    const pending = (0, queue_array_1.empty)(); // grey nodes to be processed
    const colour = build_array(size, _ => white);
    // visit a white node
    function bfs_visit(current, parent = undefined) {
        colour[current] = grey;
        (0, queue_array_1.enqueue)(current, pending);
        (0, hashtables_1.ph_insert)(node_ht, current, parent);
    }
    // paint initial node grey (all others are initialized to white)
    bfs_visit(initial);
    while (!(0, queue_array_1.is_empty)(pending)) {
        // dequeue the head node of the grey queue
        const current = (0, queue_array_1.head)(pending);
        (0, queue_array_1.dequeue)(pending);
        // Paint all white nodes adjacent to current node grey and enqueue them.
        if (current === end) {
            let path = (0, list_1.list)();
            let node = end;
            while (node !== undefined) {
                path = (0, list_1.append)((0, list_1.list)(node), path);
                node = (0, hashtables_1.ph_lookup)(node_ht, node);
            }
            return path;
        }
        const adjacent_white_nodes = (0, list_1.filter)(node => colour[node] === white, adj[current]);
        (0, list_1.for_each)(child => bfs_visit(child, current), adjacent_white_nodes);
        // paint current node black; the node is now done.
        colour[current] = black;
    }
    return (0, list_1.list)();
}
//# sourceMappingURL=shortest_path.js.map