import { List, append, list} from "./list"
import { ProbingHashtable, ph_empty, hash_id, ph_insert, ph_lookup} from "./hashtables"

type Place = {
    id: string,
    index?: number | undefined
    floor: number,
    type: 'R' | 'S' | 'E'
}

type Connection = {
    to: string,
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

function add_connection(g: Graph, from: string, to: string, dist: number) {
    const rooms = g.Rooms;
    const x = ph_lookup(rooms, from);
    const y = ph_lookup(rooms, to);

    if (x === undefined || y === undefined) return;

    const connection_1: Connection = {to: y.id, dist};
    const connection_2: Connection = {to: x.id, dist};
    
    if (x.index === undefined || y.index === undefined) return;

    g.adj[x.index] = append(g.adj[x.index], list(connection_1))
    g.adj[y.index] = append(g.adj[y.index], list(connection_2))
}


const graaa = make_emp();
add_place(graaa, {id: 'Tomt_1', floor: 1, type: 'R'})
add_place(graaa, {id: 'elev_1', floor: 1, type: 'E'})
add_place(graaa, {id: 'stairs_1', floor: 1, type: 'S'})
add_place(graaa, {id: 'loby_1', floor: 1, type: 'R'})

add_place(graaa, {id: 'Tomt_2', floor: 2, type: 'R'})
add_place(graaa, {id: 'elev_2', floor: 2, type: 'E'})
add_place(graaa, {id: 'stairs_2', floor: 2, type: 'S'})
add_place(graaa, {id: 'loby_2', floor: 2, type: 'R'})
add_connection(graaa, 'Tomt_1', 'stairs_1', 3)
add_connection(graaa, 'Tomt_1', 'loby_1', 5)
console.log(graaa);
console.log(ph_lookup(graaa.Rooms, 'elev_2'));
console.log(graaa.adj[0]);
