import {  for_each, filter,list, List,
    append } from './lib/list';
import {  type Queue, empty, is_empty, enqueue, dequeue, head as qhead } from './lib/queue_array';

import { ListGraph
    
 } from './lib/graphs';
import { ProbingHashtable, ph_empty,ph_insert,ph_lookup, hash_id } from './lib/hashtables';

// Build an array based on a function computing the item at each index
function build_array<T>(size: number, content: (i: number) => T): Array<T> {
    const result = Array<T>(size);
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
export function lg_shortest_path({adj, size}: ListGraph,
                                 initial: number, end: number): List<number> {
    
    // YOUR TASK: modify the original BFS code below.
    // Do NOT modify the function signature.
    
   
    const node_ht:ProbingHashtable<number,number>= ph_empty(size, hash_id);

    const pending = empty<number>();  // grey nodes to be processed
    const colour  = build_array(size, _ => white);

    // visit a white node
    function bfs_visit(current: number, parent: number| undefined = undefined) {
        colour[current] = grey;
        enqueue(current, pending);
        ph_insert(node_ht, current , parent);

    }


    // paint initial node grey (all others are initialized to white)
    bfs_visit(initial);


    while (!is_empty(pending)) {
        // dequeue the head node of the grey queue
        const current = qhead(pending);
        dequeue(pending);
        // Paint all white nodes adjacent to current node grey and enqueue them.
        if (current === end){
            let path: List<number> = list();
            let node: number | undefined = end;
                
            while (node !== undefined) {
                    path = append(list(node), path);
                    node = ph_lookup(node_ht, node);
            }

            return path;
        }
        const adjacent_white_nodes = filter(node => colour[node] === white, adj[current]);
        for_each (child => bfs_visit(child, current), adjacent_white_nodes);
        // paint current node black; the node is now done.
        colour[current] = black;
    }
    
    
    
   
    return list();
}
