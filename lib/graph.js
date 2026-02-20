"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = require("./list");
var hashtables_1 = require("./hashtables");
var prio_queue_1 = require("./prio_queue");
console.clear();
function make_emp() {
    return {
        floor: 0,
        ids: [],
        Rooms: (0, hashtables_1.ph_empty)(1, hashtables_1.hash_id),
        adj: [],
        entries: 0
    };
}
function add_place(g, p) {
    if ((0, hashtables_1.ph_lookup)(g.Rooms, p.id) !== undefined)
        return;
    p.index = g.entries;
    (0, hashtables_1.ph_insert)(g.Rooms, p.id, p);
    g.ids.push(p.id);
    g.adj.push(null);
    g.entries++;
}
function add_connection(g, from, to, dist) {
    var rooms = g.Rooms;
    var x = (0, hashtables_1.ph_lookup)(rooms, from);
    var y = (0, hashtables_1.ph_lookup)(rooms, to);
    if (x === undefined || y === undefined)
        return;
    var connection_1 = { to: y.id, dist: dist };
    var connection_2 = { to: x.id, dist: dist };
    if (x.index === undefined || y.index === undefined)
        return;
    g.adj[x.index] = (0, list_1.append)(g.adj[x.index], (0, list_1.list)(connection_1));
    g.adj[y.index] = (0, list_1.append)(g.adj[y.index], (0, list_1.list)(connection_2));
    // console.log(`added ${x.id} to ${y.id}`);
}
var graaa = make_emp();
add_place(graaa, { id: '1', index: 0, type: 'E' });
add_place(graaa, { id: '2', index: 0, type: 'R' });
add_place(graaa, { id: '3', index: 0, type: 'R' });
add_place(graaa, { id: '4', index: 0, type: 'R' });
add_place(graaa, { id: '5', index: 0, type: 'R' });
add_connection(graaa, '1', '2', 3);
add_connection(graaa, '1', '3', 10);
add_connection(graaa, '2', '4', 5);
add_connection(graaa, '4', '5', 2);
add_connection(graaa, '3', '5', 2);
add_connection(graaa, '3', '4', 2);
function build_array(size, content) {
    var result = Array(size);
    for (var i = 0; i < size; i = i + 1) {
        result[i] = content(i);
    }
    return result;
}
function path_fixer(ids, prev, src, dest) {
    var path = [];
    var current = dest;
    while (current !== src) {
        path.push(ids[current]);
        current = prev[current];
    }
    path.push(ids[current]);
    return path.reverse();
}
function dijkstra(_a, start, end) {
    var adj = _a.adj, Rooms = _a.Rooms, entries = _a.entries, ids = _a.ids;
    var sp = (0, hashtables_1.ph_lookup)(Rooms, start);
    var ep = (0, hashtables_1.ph_lookup)(Rooms, end);
    if (sp === undefined || ep === undefined)
        return null;
    var src = sp.index;
    var dest = ep.index;
    var dist = build_array(entries, function (_) { return Infinity; });
    var prev = build_array(entries, function (_) { return -1; });
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
                    prev[v] = u;
                    (0, prio_queue_1.enqueue)(dist[v], [dist[v], v], q);
                }
                li = (0, list_1.tail)(li);
            }
        }
    }
    return path_fixer(ids, prev, src, dest);
}
console.log(dijkstra(graaa, '1', '4'));
console.log(JSON.stringify(graaa.ids));
