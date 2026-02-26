import {add_path, rev_path, make_map, add_place, Map} from '../lib/building'
import { ph_empty, hash_id } from '../lib/hashtables'
import { list } from '../lib/list';
import {get_path} from '../lib/Dijkstra_Alg'

test('Case: Empty map ', () => {
  expect(make_map()).toStrictEqual({
          places: ph_empty<string, Node>(15, hash_id),
          nodes: [],
          adj: [],
          size: 0
      });
})

test('Cse: Add place ', () => {
  let map = make_map()
  const res = add_place(map, 'place_a', 1);
  const res_2 = add_place(map, 'place_a', 1);
  add_place(map, 'place_b', 1);

  expect(res).toBe(0)
  expect(res_2).toBe(-1)
  expect(map.size).toBe(2)
})

test('Case: Add and Remove place', () => {
  let map = make_map()
  add_place(map, 'place_a', 1)
  add_place(map, 'place_b', 1)

  const res = add_path(map, 'place_a', 'hallway_S', 'place_b');
  const res_2 = add_path(map, 'place_b', 'hallway_S', 'place_a');

  expect(res).toBe(0)
  expect(res_2).toBe(-1)
  expect(map.adj[0]).toStrictEqual(list({ to: 1, type: 'hallway_S', weight: 5 }))

  const re = rev_path(map, 'place_a', 'place_b')
  const re_2 = rev_path(map, 'place_b', 'place_a')

  expect(re).toBe(0)
  expect(re_2).toBe(-1)
  expect(map.adj[0]).toBe(null)

})

test('Case: Get Path', () => {
  let map = make_map()
  add_place(map, 'place_a', 1)
  add_place(map, 'place_b', 1)

  add_path(map, 'place_a', 'hallway_S', 'place_b');
  add_path(map, 'place_b', 'hallway_S', 'place_a');

  expect(get_path(map, 'a', 'place_v')).toBe(-1)
  expect(get_path(map, 'place_a', 'place_b')).toBeUndefined()
})

