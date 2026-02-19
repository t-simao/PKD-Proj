import { List, list } from "./list"
import { ProbingHashtable, ph_empty, hash_id, ph_insert, ph_lookup} from "./hashtables"

type Place = {
    id: string,
    index?: number
    floor: number,
    type: 'R' | 'S' | 'E'
}

type Connection = {
    id: string,
    dist: number
}

type Graph = {
    Rooms: ProbingHashtable<string, Place>,
    adj: Array<List<Connection>>,
    size: number
}

function make_emp(): Graph {
    return {
        Rooms: ph_empty<string, Place>(1, hash_id), 
        adj: [], 
        size: 0
    };
}

function add_place(g: Graph, p: Place) {

    if (ph_lookup(g.Rooms, p.id) !== undefined) return;

    p.index = g.size;
    ph_insert(g.Rooms, p.id, p);

    g.adj.push(null);
    g.size++;
}


const graaa = make_emp();
add_place(graaa, {id: 'Tomt', floor: 1, type: 'R'})
add_place(graaa, {id: 'elev_1', floor: 1, type: 'E'})
add_place(graaa, {id: 'stairs', floor: 1, type: 'S'})
add_place(graaa, {id: 'loby', floor: 1, type: 'R'})

add_place(graaa, {id: 'Tomt', floor: 2, type: 'R'})
add_place(graaa, {id: 'elev_1', floor: 2, type: 'E'})
add_place(graaa, {id: 'stairs', floor: 2, type: 'S'})
add_place(graaa, {id: 'loby', floor: 2, type: 'R'})
console.log(graaa);
console.log(ph_lookup(graaa.Rooms, 'Tomt'));
console.log(graaa.adj[0]);