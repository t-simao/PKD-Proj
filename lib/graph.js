"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = require("./list");
var hashtables_1 = require("./hashtables");
var prio_queue_1 = require("./prio_queue");
console.clear();
/** TYPES */
var E = 'ENTRANCE';
var R = 'ROOM';
var S = 'STAIR';
var EL = 'ELEVATOR';
function make_emp() {
    return {
        ids: [],
        Rooms: (0, hashtables_1.ph_empty)(20, hashtables_1.hash_id),
        adj: [],
        entries: 0
    };
}
/** FUNCTIONS  */
function check_empty(ids) {
    for (var i = 0; i < ids.length; i++) {
        if (ids[i] === '') {
            return i;
        }
    }
    return -1;
}
function add_place(g, p) {
    if ((0, hashtables_1.ph_lookup)(g.Rooms, p.id) !== undefined)
        return;
    var e_spot = check_empty(g.ids);
    if (e_spot === -1) {
        p.index = g.entries;
        (0, hashtables_1.ph_insert)(g.Rooms, p.id, p);
        g.ids.push(p.id);
        g.adj.push(null);
        g.entries++;
        // console.log(`Inserted ${JSON.stringify(p)}`)
    }
    else {
        p.index = e_spot;
        (0, hashtables_1.ph_insert)(g.Rooms, p.id, p);
        g.ids[e_spot] = p.id;
        g.entries++;
    }
}
function add_connection(g, from, to, dist) {
    var rooms = g.Rooms;
    var x = (0, hashtables_1.ph_lookup)(rooms, from);
    var y = (0, hashtables_1.ph_lookup)(rooms, to);
    if (x === undefined || y === undefined)
        return;
    var connection_1 = { to: y.id, dist: dist };
    var connection_2 = { to: x.id, dist: dist };
    g.adj[x.index] = (0, list_1.append)(g.adj[x.index], (0, list_1.list)(connection_1));
    g.adj[y.index] = (0, list_1.append)(g.adj[y.index], (0, list_1.list)(connection_2));
}
function remove_it(id, li) {
    return (0, list_1.is_null)(li)
        ? null
        : id === (0, list_1.head)(li).to
            ? (0, list_1.tail)(li)
            : (0, list_1.pair)((0, list_1.head)(li), remove_it(id, (0, list_1.tail)(li)));
}
function remove_connection(g, from, to) {
    var rooms = g.Rooms;
    var x = (0, hashtables_1.ph_lookup)(rooms, from);
    var y = (0, hashtables_1.ph_lookup)(rooms, to);
    if (x === undefined || y === undefined)
        return;
    g.adj[x.index] = remove_it(y.id, g.adj[x.index]);
    g.adj[y.index] = remove_it(x.id, g.adj[y.index]);
}
function remove_place(g, id) {
    var y = (0, hashtables_1.ph_lookup)(g.Rooms, id);
    if (y === undefined)
        return;
    g.adj[y.index] = null;
    var i = 0;
    while (i < g.adj.length) {
        g.adj[i] = remove_it(y.id, g.adj[i]);
        i++;
    }
    (0, hashtables_1.ph_delete)(g.Rooms, id);
    g.ids[y.index] = '';
    g.entries--;
}
function swap_place(g, a, b) {
    var x = (0, hashtables_1.ph_lookup)(g.Rooms, a);
    var y = (0, hashtables_1.ph_lookup)(g.Rooms, b);
    if (x === undefined || y === undefined)
        return;
    var index_x = x.index;
    var index_y = y.index;
    var adj_x = g.adj[index_x];
    var adj_y = g.adj[index_y];
    var id_x = g.ids[index_x];
    var id_y = g.ids[index_y];
    x.index = index_y;
    y.index = index_x;
    g.adj[index_x] = adj_y;
    g.adj[index_y] = adj_x;
    g.ids[index_x] = id_y;
    g.ids[index_y] = id_x;
}
function build_array(size, content) {
    var result = Array(size);
    for (var i = 0; i < size; i = i + 1) {
        result[i] = content(i);
    }
    return result;
}
function path_fixer(ids, previous, src, dest) {
    var path = [];
    var current = dest;
    while (current !== src) {
        path.push(ids[current]);
        current = previous[current];
    }
    path.push(ids[current]);
    return path.reverse();
}
function dijkstra(_a, start, end) {
    var adj = _a.adj, Rooms = _a.Rooms, entries = _a.entries, ids = _a.ids;
    var sp = (0, hashtables_1.ph_lookup)(Rooms, start);
    var ep = (0, hashtables_1.ph_lookup)(Rooms, end);
    if (sp === undefined || ep === undefined)
        return [];
    var src = sp.index;
    var dest = ep.index;
    var dist = build_array(entries, function (_) { return Infinity; });
    var previous = build_array(entries, function (_) { return -1; });
    var q = (0, prio_queue_1.empty)();
    dist[src] = 0;
    (0, prio_queue_1.enqueue)(0, [0, src], q);
    while (!(0, prio_queue_1.is_empty)(q)) {
        var _b = (0, prio_queue_1.head)(q), d = _b[0], u = _b[1];
        (0, prio_queue_1.dequeue)(q);
        if (u === dest)
            break;
        if (d > dist[u])
            continue;
        var li = adj[u];
        while (!(0, list_1.is_null)(li)) {
            var adjacent = (0, list_1.head)(li);
            var place = (0, hashtables_1.ph_lookup)(Rooms, adjacent.to);
            if (place !== undefined) {
                var v = place.index;
                var weight = adjacent.dist;
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    previous[v] = u;
                    (0, prio_queue_1.enqueue)(dist[v], [dist[v], v], q);
                }
                li = (0, list_1.tail)(li);
            }
        }
    }
    return dist[dest] !== Infinity ? path_fixer(ids, previous, src, dest) : [];
}
/** Testing the things, we out here! */
var graaa = make_emp();
add_place(graaa, { id: '1', index: 0, type: E, floor: 1 });
add_place(graaa, { id: '2', index: 0, type: R, floor: 1 });
add_place(graaa, { id: '3', index: 0, type: R, floor: 1 });
add_place(graaa, { id: '4', index: 0, type: R, floor: 1 });
add_place(graaa, { id: '5', index: 0, type: R, floor: 1 });
add_connection(graaa, '1', '2', 3);
add_connection(graaa, '1', '3', 10);
add_connection(graaa, '2', '4', 5);
add_connection(graaa, '4', '5', 2);
add_connection(graaa, '3', '5', 2);
add_connection(graaa, '3', '4', 2);
console.log(graaa.adj);
console.log(dijkstra(graaa, '1', '4'));
remove_connection(graaa, '2', '4');
console.log(graaa.adj);
console.log(dijkstra(graaa, '1', '4'));
remove_place(graaa, '2');
add_place(graaa, { id: '6', index: 0, type: R, floor: 1 });
console.log(graaa.ids);
console.log(JSON.stringify((0, hashtables_1.ph_lookup)(graaa.Rooms, '6')));
swap_place(graaa, '1', '6');
console.log(graaa.ids);
console.log(JSON.stringify((0, hashtables_1.ph_lookup)(graaa.Rooms, '6')));
console.log(graaa.adj);
