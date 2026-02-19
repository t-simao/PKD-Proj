import { type List, append, list } from './list';
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
export type ListGraph_withWeights = {
    Places: ProbingHashtable<string, Node>,
    nodes: Array<string>
    adj: Array<List<Edge>>, // Lists may not be sorted
    size: number
};

/**
 * Maken an empty graph which satisfies the ListGraph_withWeights type
 * @returns a graph which satisfies the ListGraph_withWeights type
 */
export function make_map(): ListGraph_withWeights{

    return {
        Places: ph_empty<string, Node>(1, hash_id),
        nodes: [],
        adj: [],
        size: 0
    };
}

export function add_place(map: ListGraph_withWeights, name: string, flo: number): void {

    if(ph_lookup(map.Places, name) !== undefined) {

        console.log("Place already exists!!"); 
        return;
    }

    const key = name;
    const idx = map.size;

    const place: Node = {id: idx, name: name, floor: flo};
    ph_insert(map.Places, key, place);

    map.adj.push(list());
    map.nodes.push(name);
    map.size = map.size + 1;
}

function get_idx(place: Node): number {

    return place.id;
}

function make_edge(to: Node, type: Pathway_type) {

    const weight = Pathway_const[type]

    const edge: Edge = {
        to: to,
        type: type,
        weight: weight
    }

    return edge;
}

export function add_edge(map: ListGraph_withWeights, f: string, t: string, type: Pathway_type): void {

    const from = ph_lookup(map.Places, f);
    const to = ph_lookup(map.Places, t);

    if(from === undefined) {

        console.log(`${f} does not exist!!`);

    } else if(to === undefined) {

        console.log(`${t} does not exist!!`);

    } else {

        const from_idx = get_idx(from);
        const to_idx = get_idx(to);

        const edge_to_to = make_edge(to, type)
        const edge_to_from = make_edge(from, type);

        map.adj[from_idx] = append(map.adj[from_idx], list(edge_to_to));
        map.adj[to_idx] = append(map.adj[to_idx], list(edge_to_from));
        
    }
    
}


