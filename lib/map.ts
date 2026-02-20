import { type List, pair, list, tail, head, for_each, remove } from './list';
import { hash_id, ph_empty, ph_insert, ph_lookup, ProbingHashtable} from './hashtables'

// Data type definitions
type Pathway_type = "hallway" | "elevator" | "ramp" | "stairs";

const Pathway_const: Record<Pathway_type, number> = {
    hallway: 5,
    elevator: 10,
    ramp: 15,
    stairs: 25
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
    to: number, 
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
    nodes: Array<Node>
    adj: Array<List<Edge>>, // Lists may not be sorted
    size: number
};

// Helper functions

function make_node(name: string, floor: number, idx: number): Node {
    return {
        id: idx,
        name: name,
        floor: floor
    };
}

function make_edge(to: Node, type: Pathway_type) {
    const Weight = Pathway_const[type]

    return {
        to: to.id,
        type: type,
        weight: Weight
    }
}

function add_path(map: Map, idx: number, path: Edge): void {

    map.adj[idx] = pair(path, map.adj[idx]);
}

function get_dst(map: Map, edge: Edge): string {

    const dst = map.nodes[edge.to]
    return dst.name;
}

function get_node(ht: ProbingHashtable<string, Node>, place: string): Node | undefined {

    return ph_lookup(ht, place);;
}

function get_id(node: Node): number {

    return node.id;;
}

function get_name(node: Node): string {

    return node.name;;
}

function rev_path(map: Map, idx: number, dst: number): void {

    let allpaths_fromsrc = map.adj[idx];

    let temp: List<Edge> = null;

    while(allpaths_fromsrc !== null) {

        if(head(allpaths_fromsrc).to !== dst) {

            temp = pair(head(allpaths_fromsrc), temp);
        }

        allpaths_fromsrc = tail(allpaths_fromsrc);
    }

    map.adj[idx] = temp;
}

// Main functions

/**
 * Maken an empty graph which satisfies the Map type
 * @returns a graph which satisfies the Map type
 */
export function make_map(): Map{
    return {
        places: ph_empty<string, Node>(1, hash_id),
        nodes: [],
        adj: [],
        size: 0
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
    map.nodes[idx] = node;
    map.size = map.size + 1;
}

function path_exist(map: Map, from: Node, to: Node): boolean {

    const src_idx = get_id(from);
    let allpaths_fromsrc = map.adj[src_idx];

    while(allpaths_fromsrc !== null) {

        if(head(allpaths_fromsrc).to === to.id) {

            return true;
        }

        allpaths_fromsrc = tail(allpaths_fromsrc);
    }

    return false;
}

export function add_edge(map: Map, from: string, type: Pathway_type, to: string): void {

    const src = get_node(map.places, from);
    const dst = get_node(map.places, to);

    if(src === undefined) {

        console.log(`${from} does not exist!!`);

    } else if(dst === undefined) {

        console.log(`${to} does not exist!!`);

    } else if(path_exist(map, src, dst)) {

        console.log("Path already exists!!");

    } else {

        const srcIdx = get_id(src);
        const dstIdx = get_id(dst);

        const pathfromsrc = make_edge(dst, type);
        const pathfromdst = make_edge(src, type);

        add_path(map, srcIdx, pathfromsrc);
        add_path(map, dstIdx, pathfromdst);
    }
    
}

export function rev_edge(map: Map, from: string, to: string): void {

    const src = get_node(map.places, from);
    const dst = get_node(map.places, to);

    if(src === undefined) {

        console.log(`${from} does not exist!!`);

    } else if(dst === undefined) {

        console.log(`${to} does not exist!!`);

    } else if(!path_exist(map, src, dst)) {

        console.log("Path doesn't exist!!");

    } else {

        const srcIdx = get_id(src);
        const dstIdx = get_id(dst);

        rev_path(map, srcIdx, dstIdx);
        rev_path(map, dstIdx, srcIdx);
    }
    
}

const map = make_map();

add_place(map, "Entrance", 1);
add_place(map, "Library", 1);
add_place(map, "Café", 1);
add_place(map, "Stairs1", 1);
add_place(map, "Lounge", 2);

add_edge(map, "Entrance", "hallway", "Library"); 
add_edge(map, "Entrance", "stairs", "Stairs1");  
add_edge(map, "Library", "ramp", "Café");        
add_edge(map, "Stairs1", "stairs", "Lounge");
add_edge(map, "Café", "elevator",  "Lounge");

console.log(map.nodes[0]);
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

} 