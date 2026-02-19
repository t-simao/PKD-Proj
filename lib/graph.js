"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var graaa = make_emp();
add_place(graaa, { id: 'Tomt', floor: 1, type: 'R' });
add_place(graaa, { id: 'elev_1', floor: 1, type: 'E' });
add_place(graaa, { id: 'stairs', floor: 1, type: 'S' });
add_place(graaa, { id: 'loby', floor: 1, type: 'R' });
add_place(graaa, { id: 'Tomt', floor: 2, type: 'R' });
add_place(graaa, { id: 'elev_1', floor: 2, type: 'E' });
add_place(graaa, { id: 'stairs', floor: 2, type: 'S' });
add_place(graaa, { id: 'loby', floor: 2, type: 'R' });
console.log(graaa);
console.log((0, hashtables_1.ph_lookup)(graaa.Rooms, 'Tomt'));
console.log(graaa.adj[0]);
