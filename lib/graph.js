"use strict";
function make_empty_graph(size) {
    return { RoomId: [], adj: [], size: size };
}
var g = make_empty_graph(4);
console.log(g);
