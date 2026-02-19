import {
    type Pair, pair, head, tail, is_member, 
    type List, is_null, for_each, filter, enum_list, append, list
} from './list';

import {
    type Queue, empty, is_empty, enqueue, dequeue, head as qhead
} from './queue_array';

// Data type definitions


/**
 * An edge in a weighted graph
 * @invariant The head of the pair is a non-negative weight from one to node to another
 * @invariant The tail of the edge is the destinated node
 * 
 */
export type Edge = Pair<number, number>;

/**
 * A graph in edge lists representation is
 *     an array of lists of target node ids.
 * @param adj the array of
 * @param size the number of nodes
 * @invariant The length of the outer array is size.
 * @invariant Every target node id is a non-negative number less than size.
 * @invariant None of the target node ids appears twice in the same list.
 */
export type ListGraph_withWeights = {
    adj: Array<List<Edge>>, // Lists may not be sorted
    size: number
};