import { type List, pair, list } from './list';
import { hash_id, ph_empty, ph_insert, ph_lookup, ProbingHashtable} from './hashtables'

// Data type definitions
type Pathway_type = "hallway" | "elevator" | "ramp" | "stair";

const Pathway_const: Record<Pathway_type, number> = {
    hallway: 5,
    elevator: 10,
    ramp: 15,
    stair: 25
}

type Node = {
    id: number;
    name: string
    floor: number;
};

/**
 * An edge in a weighted graph
 * @invariant The head of the pair is a non-negative weight from one to node to another
 * @invariant The tail of the edge is the destinated node
 */
type Edge = {
    to: Node, 
    type: Pathway_type, 
    weight: number 
};

/**
 * A graph in edge lists representation is
 *     an array of lists of target node ids.
 * @param adj the array of
 * @param size the number of nodes
 * @invariant The length of the outer array is size.
 * @invariant Every target node id is a non-negative number less than size.
 * @invariant None of the target node ids appears twice in the same list.
 */
export type Map = {
    places: ProbingHashtable<string, Node>,
    nodeNames: Array<string>
    adj: Array<List<Edge>>, // Lists may not be sorted
    size: number
};

/**
 * Maken an empty graph which satisfies the Map type
 * @returns a graph which satisfies the Map type
 */
export function make_map(): Map{
    return {
        places: ph_empty<string, Node>(1, hash_id),
        nodeNames: [],
        adj: [],
        size: 0
    };
}

function make_node(name: string, floor: number, idx: number): Node {
    return {
        id: idx,
        name: name,
        floor: floor
    };
}

export function add_place(map: Map, name: string, floor: number): void {
    if(ph_lookup(map.places, name) !== undefined) {

        console.log(`${name} already exist, no need to add!!`)
        return;
    }
    
    const idx = map.size;
    const key = name;
    const node = make_node(name, floor, idx);
    
    ph_insert(map.places, key, node);

    map.adj.push(list());
    map.nodeNames[idx] = name;
    map.size = map.size + 1;
}

function make_edge(to: Node, type: Pathway_type) {
    const Weight = Pathway_const[type]

    return {
        to: to,
        type: type,
        weight: Weight
    }
}

function add_path(map: Map, idx: number, path: Edge): void {

    map.adj[idx] = pair(path, map.adj[idx]);
}

export function add_edge(map: Map, from: string, to: string, type: Pathway_type): void {

    const src = ph_lookup(map.places, from);
    const dst = ph_lookup(map.places, to);

    if(src === undefined) {

        console.log(`${from} does not exist!!`);

    } else if(dst === undefined) {

        console.log(`${to} does not exist!!`);

    } else {

        const srcIdx = src.id;
        const dstIdx = dst.id;

        const pathfromsrc = make_edge(dst, type);
        const pathfromdst = make_edge(src, type);

        add_path(map, srcIdx, pathfromsrc);
        add_path(map, dstIdx, pathfromdst);
    }
    
}