import { type List, pair, list, tail, head } from './list';
import { hash_id, ph_empty, ph_insert, ph_lookup, ProbingHashtable } from './hashtables'

// Data type definitions
type Pathway_type = "Hallway_S" | "Hallway_L" | "Elevator" | "Ramp" | "Stairs";

const Pathway_const: Record<Pathway_type, number> = {
    Hallway_S: 5,
    Ramp: 8,
    Hallway_L: 10,
    Elevator: 12,
    Stairs: 20 //TESTING SOMETHING!!!!!!!!!!!!!!!!!!!!!!!!!!!NEEDS TO CHANGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
export type Edge = {
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

export function get_node_ht(map: Map, place: string): Node | undefined {

    return ph_lookup(map.places, place);;
}

export function get_node_arr(map: Map, idx: number): Node {

    return map.nodes[idx];
}

export function get_id(node: Node): number {

    return node.id;;
}

export function get_name(node: Node): string {

    return node.name;
}
export function get_name_by_id(map: Map, id: number): string {

    const arr = map.nodes;
    const curr_node = arr[id];

    return curr_node.name;
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
        places: ph_empty<string, Node>(15, hash_id),
        nodes: [],
        adj: [],
        size: 0
    };
}

export function add_place(map: Map, name: string, floor: number): void {
    if(get_node_ht(map, name) !== undefined) {

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

    const src = get_node_ht(map, from);
    const dst = get_node_ht(map, to);

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

    const src = get_node_ht(map, from);
    const dst = get_node_ht(map, to);

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

/** console.log(map.nodes[0]);
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

} */


export const map = make_map();
// ---------- FLOOR 1 ----------
add_place(map, "Entrance", 1);      //0
add_place(map, "Reception", 1);     //1
add_place(map, "Library", 1);       //2
add_place(map, "Café", 1);          //3
add_place(map, "HallA", 1);         //4
add_place(map, "Stairs1", 1);       //5
add_place(map, "Elevator1", 1);     //6

// ---------- FLOOR 2 ----------
add_place(map, "HallB", 2);         //7
add_place(map, "ComputerLab", 2);   //8
add_place(map, "StudyRoom", 2);     //9
add_place(map, "Lounge", 2);        //10
add_place(map, "Stairs2", 2);       //11
add_place(map, "Elevator2", 2);     //12

// ---------- FLOOR 3 ----------
add_place(map, "HallC", 3);         //13
add_place(map, "OfficeA", 3);       //14
add_place(map, "OfficeB", 3);       //15
add_place(map, "ConferenceRoom", 3);//16
add_place(map, "Stairs3", 3);       //17
add_place(map, "Elevator3", 3);     //18

add_edge(map,"Entrance","Hallway_S","Reception");

add_edge(map,"Reception","Hallway_L","HallA");

add_edge(map,"HallA","Hallway_S","Library");

add_edge(map,"HallA","Hallway_L","Café");

add_edge(map,"HallA","Hallway_L","Stairs1");

add_edge(map,"HallA","Hallway_S","Elevator1");

add_edge(map,"HallB","Hallway_L","ComputerLab");

add_edge(map,"HallB","Hallway_S","StudyRoom");

add_edge(map,"HallB","Hallway_L","Lounge");

add_edge(map,"HallC","Hallway_S","OfficeA");

add_edge(map,"HallC","Hallway_L","OfficeB");

add_edge(map,"HallC","Hallway_L","ConferenceRoom");

add_edge(map,"HallC","Hallway_L","Elevator3");

add_edge(map,"Stairs1","Stairs","Stairs2");

add_edge(map,"Stairs2","Stairs","Stairs3");

add_edge(map,"Elevator1","Elevator","Elevator2");

add_edge(map,"Elevator2","Elevator","Elevator3");

add_edge(map,"Stairs2","Hallway_L","HallB");

add_edge(map,"Elevator2","Hallway_L","HallB");

add_edge(map,"Stairs3","Hallway_S","HallC");
