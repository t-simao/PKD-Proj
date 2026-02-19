"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lg_dfs_reverse_finish_order = lg_dfs_reverse_finish_order;
exports.lg_dfs_reachables = lg_dfs_reachables;
exports.lg_kosaraju = lg_kosaraju;
var graphs_1 = require("../lib/graphs");
var list_1 = require("../lib/list");
var white = 1;
var black = 2;
var grey = 3;
function build_array(size, content) {
    var result = Array(size);
    for (var i = 0; i < size; i = i + 1) {
        result[i] = content(i);
    }
    return result;
}
// based on lg_dfs_visit_order in lib/graphs
function lg_dfs_reverse_finish_order(_a, restart_order) {
    var adj = _a.adj, size = _a.size;
    if (restart_order === void 0) { restart_order = null; }
    var result = null; // MODIFIED
    var colour = build_array(size, function (_) { return white; });
    if (restart_order === null) {
        // if no order is given, initialize with all nodes enumerated
        restart_order = (0, list_1.enum_list)(0, size - 1);
    }
    else { }
    // Visit a node.  Each node is processed at most once.
    function dfs_visit(current) {
        if (colour[current] === white) {
            colour[current] = grey;
            //enqueue(current, result);   // MODIFIED (removed)
            (0, list_1.for_each)(dfs_visit, adj[current]);
            colour[current] = black;
            result = (0, list_1.pair)(current, result); // MODIFIED (added)
        }
        else { }
    }
    (0, list_1.for_each)(dfs_visit, restart_order);
    return result;
}
// based on lg_dfs_visit_order in lib/graphs
function lg_dfs_reachables(_a, restart_order) {
    var adj = _a.adj, size = _a.size;
    if (restart_order === void 0) { restart_order = null; }
    var result = null; // MODIFIED (returns list of SCCs)
    var colour = build_array(size, function (_) { return white; });
    if (restart_order === null) {
        // if no order is given, initialize with all nodes enumerated
        restart_order = (0, list_1.enum_list)(0, size - 1);
    }
    else { }
    // Visit a node.  Each node is processed at most once.
    // @precondition result is not null
    function dfs_visit(current) {
        if (colour[current] === white) {
            colour[current] = grey;
            // prepend to "current" SCC being processed that it at head of result
            result = (0, list_1.pair)((0, list_1.pair)(current, (0, list_1.head)(result)), (0, list_1.tail)(result)); // MODIFIED
            (0, list_1.for_each)(dfs_visit, adj[current]);
            colour[current] = black;
        }
        else { }
    }
    // ADDED: start a new SCC (i.e. new list in result) at each restart
    function dfs_restart(initial) {
        if (colour[initial] === white) {
            result = (0, list_1.pair)(null, result);
            dfs_visit(initial);
        }
        else { }
    }
    (0, list_1.for_each)(dfs_restart, restart_order);
    return result;
}
function lg_kosaraju(lg, restart_order) {
    if (restart_order === void 0) { restart_order = null; }
    return lg_dfs_reachables((0, graphs_1.lg_transpose)(lg), lg_dfs_reverse_finish_order(lg, restart_order));
}
