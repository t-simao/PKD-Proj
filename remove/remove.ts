import { make_map, add_path, add_place, remove_place, check_empty } from "../lib/building";

console.clear()

let map = make_map()

add_place(map, 'a', 1)
add_place(map, 'b', 1)
add_place(map, 'a_2', 2)
add_place(map, 'b_2', 2)
add_place(map, 'a_3', 3)
add_place(map, 'b_3', 3)

add_path(map, 'a', 'hallway_S', 'b')
add_path(map, 'a', 'hallway_S', 'b_3')
add_path(map, 'b', 'hallway_S', 'b_3')
add_path(map, 'a_2', 'hallway_S', 'b_2')


remove_place(map, 'a_2')
add_place(map, 'jenga', 5)

console.log(map)
console.log(check_empty(map.nodes));

