import { type List, pair, list, tail, head, is_null, reverse } from './list';
import { hash_id, ph_empty, ph_insert, ph_lookup, ProbingHashtable, ph_delete } from './hashtables'

// Data type definitions
export type Pathway_type = "hallway_S" | "hallway_L" | "elevator" | "ramp" | "stairs" | "hallway_C";
export const Pathway_type_arr: Array<string> = [ "hallway_S", "hallway_L", "elevator", "ramp", "stairs", "hallway_C"];

export const Pathway_cost: Record<Pathway_type, number> = {
    hallway_S: 5,
    ramp: 8,
    hallway_C: 10,
    hallway_L: 10,
    elevator: 12,
    stairs: 20 
}

//Represents a Place
export type Node = {
    id: number;
    name: string
    floor: number;
};

//Represents a Path
export type Edge = {
    to: number, 
    type: Pathway_type, 
    weight: number 
};

export type Map = {
    places: ProbingHashtable<string, Node>,
    nodes: Array<Node>
    adj: Array<List<Edge>>,
    size: number
};

// Helper functions

//Makes an empty map which satisfies the Map type
export function make_map(): Map{
    return {
        places: ph_empty<string, Node>(15, hash_id),
        nodes: [],
        adj: [],
        size: 0
    };
}

//Makes a Place containing the provided information and returns it
function make_node(name: string, floor: number, idx: number): Node {
    return {
        id: idx,
        name: name,
        floor: floor
    };
}

//Makes an edge representing a path between two nodes of the provided Pathway_type and returns it
function make_edge(to: Node, type: Pathway_type) {
    const weight = Pathway_cost[type]

    return {
        to: to.id,
        type: type,
        weight: weight
    }
}

//Adds the path adjacency list of the node at index idx
function helper_add_path(map: Map, idx: number, path: Edge): void {

    map.adj[idx] = pair(path, map.adj[idx]);
}

//Uses the provided string as key and returns the node that corresponds to that key from the hashtable
export function get_node_ht(map: Map, place: string): Node | undefined {

    return ph_lookup(map.places, place);
}

//Returns the node that corresponds to the given index from the nodes array in the Map
export function get_node_arr(map: Map, idx: number): Node {

    return map.nodes[idx];
}

//Given a node returns its id
export function get_id(node: Node): number {

    return node.id;
}

//Given a node returns its name
export function get_name(node: Node): string {

    return node.name;
}

//Given a edge returns its path type
export function get_type(edge: Edge): Pathway_type {

    return edge.type;
}

//Given a map and an id, returns the name of the node which corresponds to that id
export function get_name_by_id(map: Map, id: number): string {

    const arr = map.nodes;
    const curr_node = arr[id];

    return curr_node.name;
}

/** Given a map, an id and the id of the destination, if a path exists between them, removes that path
 * @param map the map 
 * @param idx represents the id of the node which has the path thats being removed
 * @param dst represents the id of the node which the path being removed leads to
 */
function helper_rev_path(map: Map, idx: number, dst: number): void {
    let allpaths_fromsrc = map.adj[idx];

    let temp: List<Edge> = null;

    while(allpaths_fromsrc !== null) {

        if(head(allpaths_fromsrc).to !== dst) {

            temp = pair(head(allpaths_fromsrc), temp);
        }

        allpaths_fromsrc = tail(allpaths_fromsrc);
    }

    const res = reverse(temp);
    map.adj[idx] = res;
}

/** Given a map, and two nodes checks if there exists a path between them
 * @param map the map 
 * @param from represents the node the path starts from
 * @param dst represents the node the path ends at
 * @returns true if a path between the provided nodes exists and false if it doesn't
 */
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

//Returns a adjacency list with the path removed which leads to the node corresponding to the provided id
function remove_it(id: number, li: List<Edge>): List<Edge> {
    return is_null(li)
            ? null
            : id === head(li).to
            ? tail(li)
            : pair(head(li), remove_it(id, tail(li)))
}

//Checks if there exists a dummy node in the array where there used to be a value but now is empty
export function check_empty(ids: Array<Node>): number {
    for(let i = 0; i < ids.length; i++) {
        if(ids[i].name === '') {
            return i;
        }
    }
    return -1
}

// Main functions

/**Provided a map and the name of a place, if the place exists, removes it from the map and all
 * of the paths that lead to that place. It also adds a dummy node in the maps node array
 * @param map the map the place should be removed from
 * @param name the name of the place that should be removed if it exists
 */
export function remove_place(g: Map, name: string): void {
    const y = ph_lookup(g.places, name);

    if (y === undefined) return;

    g.adj[y.id] = null;
    let i = 0;
    while(i < g.adj.length) {
        g.adj[i] = remove_it(y.id, g.adj[i])
        i++;
    }

    ph_delete(g.places, name);
    g.nodes[y.id] = { id: y.id, name: '', floor: -1}
    g.size--
}

/** Makes a Node of the provided name and adds that node to the given map only if it
 * doesn't already exist in the map
 * @param map represents the map the node should be added to
 * @param name represents the name value that the node should have
 * @param floor represents the floor value the node should have
 * @returns 0 if the node was created and added successfully but -1 if the node already
 * exists in the map or if the name value is an empty string
 */
export function add_place(map: Map, name: string, floor: number): number {

    if(get_node_ht(map, name) !== undefined) return -1;

    const e_spot = check_empty(map.nodes);

    if (e_spot === -1) {
        const idx = map.size;
        const node = make_node(name, floor, idx);
        
        ph_insert(map.places, name, node);

        map.adj.push(list());
        map.nodes[idx] = node;
    } else {
        const node = make_node(name, floor, e_spot)
        ph_insert(map.places, name, node)
        map.nodes[e_spot] = node
    }

    map.size = map.size + 1;
    console.log(`${name} was added to floor number ${floor}`)
    return 0;
}

/** Adds a two way path between from and to, only if it doesn't already exists in the map
 * @param map represents the map which the path should the added to
 * @param from represents the name of the node at one of the ends of the path
 * @param to represents the name of the node at the other end of the path
 * @returns 0 if a path going from "from" to "to" and from "to" to "from" is add and -1 if 
 * node: from doesn't exist in the map or node: to doesn't exist in the map and if the path already exists
 * between these two nodes or if from === to
 */
export function add_path(map: Map, from: string, type: Pathway_type, to: string): number {

    const src = get_node_ht(map, from);
    const dst = get_node_ht(map, to);

    if(from === to ) {

        console.log(`A path cannot start and end at the same location!!`)
        return -1;
    }

    if(src === undefined) {

        console.log(`A place called ${from} does not exist, Please add it first!!`);
        return -1;


    } else if(dst === undefined) {

        console.log(`A place called ${to} does not exist, Please add it first!!`);
        return -1;

    } else if(path_exist(map, src, dst)) {

        console.log("Path already exists!!");
        return -1;

    } else {

        const srcIdx = get_id(src);
        const dstIdx = get_id(dst);

        const pathfromsrc = make_edge(dst, type);
        const pathfromdst = make_edge(src, type);

        helper_add_path(map, srcIdx, pathfromsrc);
        helper_add_path(map, dstIdx, pathfromdst);

        console.log(`A path from ${from} to ${to} has been added!!`)
        console.log(`A path from ${to} to ${from} has also been added!!`)
        return 0;
    }
}

/** Removes a two way path between from and to, only if it already exists in the map
 * @param map represents the map which the path should the added to
 * @param from represents the name of the node at one of the ends of the path
 * @param to represents the name of the node at the other end of the path
 * @returns 0 if a path going from "from" to "to" and from "to" to "from" is removed and -1 if 
 * node: from doesn't exist in the map or node: to doesn't exist in the map and if the path already exists
 * between these two nodes or if from === to
 */
export function rev_path(map: Map, from: string, to: string): number {

    const src = get_node_ht(map, from);
    const dst = get_node_ht(map, to);

    if(src === undefined) {

        console.log(`${from} does not exist!!`);
        return -1;

    } else if(dst === undefined) {

        console.log(`${to} does not exist!!`);
        return -1;


    } else if(!path_exist(map, src, dst)) {

        console.log("Path doesn't exist!!");
        return -1;


    } else {

        const srcIdx = get_id(src);
        const dstIdx = get_id(dst);

        helper_rev_path(map, srcIdx, dstIdx);
        helper_rev_path(map, dstIdx, srcIdx);

        console.log(`A path from ${from} to ${to} has been removed!!`)
        console.log(`A path from ${to} to ${from} has also been removed!!`)
        return 0;
    }   
}