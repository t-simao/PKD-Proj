import { List, append, list, is_null, head as hea, tail} from "./list";
import { ProbingHashtable, ph_empty, hash_id, ph_insert, ph_lookup, ph_keys} from "./hashtables";
import { Prio_Queue, empty, enqueue, dequeue, is_empty, head } from "./prio_queue";

console.clear()

const E = 'ENTRANCE'
const R = 'ROOM'
const S = 'STAIR'
const EL = 'ELEVATOR'

type Place = {
    id: string,
    index: number,
    type: 'ENTRANCE' | 'ROOM' | 'STAIR' | 'ELEVATOR',
    floor: number
}

type Connection = {
    to: string,
    dist: number
}

type Graph = {
    ids: Array<string>,
    Rooms: ProbingHashtable<string, Place>,
    adj: Array<List<Connection>>,
    entries: number
}

function make_emp(): Graph {
    return {
        ids: [],
        Rooms: ph_empty<string, Place>(1, hash_id), 
        adj: [], 
        entries: 0
    };
}

function add_place(g: Graph, p: Place) {

    if (ph_lookup(g.Rooms, p.id) !== undefined) return;

    p.index = g.entries;
    ph_insert(g.Rooms, p.id, p);

    g.ids.push(p.id);
    g.adj.push(null);
    g.entries++;
}

function add_connection(g: Graph, from: string, to: string, dist: number) {
    const rooms = g.Rooms;
    const x = ph_lookup(rooms, from);
    const y = ph_lookup(rooms, to);

    if (x === undefined || y === undefined) return;

    const connection_1: Connection = {to: y.id, dist};
    const connection_2: Connection = {to: x.id, dist};

    g.adj[x.index] = append(g.adj[x.index], list(connection_1))
    g.adj[y.index] = append(g.adj[y.index], list(connection_2))
}

function build_array<T>(size: number, content: (i: number) => T): Array<T> {
    const result = Array<T>(size);
    for (var i = 0; i < size; i = i + 1) {
        result[i] = content(i);
    }
    return result;
}

function path_fixer(ids: Array<string>, previous: Array<number>, src: number, dest: number): Array<string> {
    let path: Array<string> = [];
    let current = dest;
    while(current !== src) {
        path.push(ids[current])
        current = previous[current]
    }
    path.push(ids[current]);

    return path.reverse();
}

function dijkstra({adj, Rooms, entries, ids}: Graph, start: string, end: string): Array<string> {
    const sp = ph_lookup(Rooms, start);
    const ep = ph_lookup(Rooms, end);

    if (sp === undefined || ep === undefined) return [];

    const src = sp.index;
    const dest = ep.index;

    let dist = build_array(entries, _ => Infinity);
    let previous = build_array(entries, _ => -1);
    let q = empty<[number, number]>();

    dist[src] = 0;
    enqueue(0, [0, src], q);

    while(!is_empty(q)) {
        const [d, u] = head(q);
        dequeue(q);

        if(u === dest) break;
        if (d > dist[u]) continue;

        let li = adj[u];

        while(!is_null(li)) {
            const adjacent = hea(li)
            const place = ph_lookup(Rooms, adjacent.to);

            if (place !== undefined) {
                const v = place.index;
                const weight = adjacent.dist;

                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight
                    previous[v] = u

                    enqueue(dist[v], [dist[v], v], q);
                }
                li = tail(li)
            }
        }
    }

    return dist[dest] !== Infinity ? path_fixer(ids, previous, src, dest) : [];
}

/** Testing the things, we out here! */

const graaa = make_emp();

add_place(graaa, {id: '1', index: 0, type: E, floor: 1})
add_place(graaa, {id: '2', index: 0, type: R, floor: 1})
add_place(graaa, {id: '3', index: 0, type: R, floor: 1})
add_place(graaa, {id: '4', index: 0, type: R, floor: 1})
add_place(graaa, {id: '5', index: 0, type: R, floor: 1})

add_connection(graaa, '1', '2', 3);
add_connection(graaa, '1', '3', 10);
add_connection(graaa, '2', '4', 5);
add_connection(graaa, '4', '5', 2);
add_connection(graaa, '3', '5', 2);
add_connection(graaa, '3', '4', 2);

console.log(dijkstra(graaa, '1', '4'));