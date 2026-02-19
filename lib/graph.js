"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = require("./list");
var hashtables_1 = require("./hashtables");
function make_emp() {
    return {
        Rooms: (0, hashtables_1.ph_empty)(1, hashtables_1.hash_id),
        adj: [],
        size: 0
    };
}
function add_place(g, p) {
    if ((0, hashtables_1.ph_lookup)(g.Rooms, p.id) !== undefined)
        return;
    p.index = g.size;
    (0, hashtables_1.ph_insert)(g.Rooms, p.id, p);
    g.adj.push(null);
    g.size++;
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
}
var graaa = make_emp();
add_place(graaa, { id: 'Tomt_1', floor: 1, type: 'R' });
add_place(graaa, { id: 'elev_1', floor: 1, type: 'E' });
add_place(graaa, { id: 'stairs_1', floor: 1, type: 'S' });
add_place(graaa, { id: 'loby_1', floor: 1, type: 'R' });
add_place(graaa, { id: 'Tomt_2', floor: 2, type: 'R' });
add_place(graaa, { id: 'elev_2', floor: 2, type: 'E' });
add_place(graaa, { id: 'stairs_2', floor: 2, type: 'S' });
add_place(graaa, { id: 'loby_2', floor: 2, type: 'R' });
add_connection(graaa, 'Tomt_1', 'stairs_1', 3);
add_connection(graaa, 'Tomt_1', 'loby_1', 5);
console.log(graaa);
console.log((0, hashtables_1.ph_lookup)(graaa.Rooms, 'elev_2'));
console.log(graaa.adj[0]);
