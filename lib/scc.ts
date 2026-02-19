import {
    lg_transpose, type ListGraph
} from "../lib/graphs";
import {
    enum_list, for_each, map, type List, type Pair, pair, tail, head, is_null
} from "../lib/list";

const white = 1;
const black = 2;
const grey  = 3;

function build_array<T>(size: number, content: (i: number) => T): Array<T> {
    const result = Array<T>(size);
    for (var i = 0; i < size; i = i + 1) {
        result[i] = content(i);
    }
    return result;
}

// based on lg_dfs_visit_order in lib/graphs
export function lg_dfs_reverse_finish_order({adj, size}: ListGraph,
                                     restart_order: List<number> = null): List<number> {
    var result: List<number> = null;   // MODIFIED
    const colour = build_array(size, _ => white);
    if (restart_order === null) {
        // if no order is given, initialize with all nodes enumerated
        restart_order = enum_list(0, size - 1);
    } else {}

    // Visit a node.  Each node is processed at most once.
    function dfs_visit(current: number): void {
        if (colour[current] === white) {
            colour[current] = grey;
            //enqueue(current, result);   // MODIFIED (removed)
            for_each(dfs_visit, adj[current]);
            colour[current] = black;
            result = pair(current, result);   // MODIFIED (added)
        } else {}
    }

    for_each(dfs_visit, restart_order);
    return result;
}

// based on lg_dfs_visit_order in lib/graphs
export function lg_dfs_reachables({adj, size}: ListGraph,
                           restart_order: List<number> = null): List<List<number>> {
    var result: List<List<number>> = null;  // MODIFIED (returns list of SCCs)
    const colour = build_array(size, _ => white);
    if (restart_order === null) {
        // if no order is given, initialize with all nodes enumerated
        restart_order = enum_list(0, size - 1);
    } else {}

    // Visit a node.  Each node is processed at most once.
    // @precondition result is not null
    function dfs_visit(current: number): void {
        if (colour[current] === white) {
            colour[current] = grey;
            // prepend to "current" SCC being processed that it at head of result
            result = pair(pair(current, head(result!)), tail(result!)); // MODIFIED
            for_each(dfs_visit, adj[current]);
            colour[current] = black;
        } else {}
    }

    // ADDED: start a new SCC (i.e. new list in result) at each restart
    function dfs_restart(initial: number): void {
        if (colour[initial] === white) {
            result = pair(null, result);
            dfs_visit(initial);
        } else {}
    }
    for_each(dfs_restart, restart_order);
    return result;
}

export function lg_kosaraju(lg: ListGraph,
                            restart_order: List<number> = null): List<List<number>> {
    return lg_dfs_reachables(lg_transpose(lg),
                             lg_dfs_reverse_finish_order(lg, restart_order));
}