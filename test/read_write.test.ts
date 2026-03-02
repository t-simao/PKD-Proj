import { JSON_to_map, map_to_JSON } from "../input/read_write";
import { download_map, upload_map } from "../input/read_write";
import { barrier, downloading_map, uploading_map  } from "../input/menus";
import { banner, pause_screen, quit } from "../input/helpers_userInput";
import { Map, Pathway_type, add_path, add_place, get_name_by_id, make_map } from "../lib/building";
import {head, tail } from "../lib/list";
import { test, describe, expect} from '@jest/globals';

describe('Writing and reading a JSON file',()=>{

    test('Creating a JSON file from an empty map', ()=>{
        const map = make_map();
        const json = map_to_JSON(map);

        expect(JSON.parse(json)).toEqual({ Places: [] });
    }),

    test('Creating a JSON file from an simple map', ()=>{
        const map = make_map(); add_place(map, "A", 1); add_place(map, "B", 1); add_path(map, "A", "stairs", "B");
        const jsonString = map_to_JSON(map);
        const parsed = JSON.parse(jsonString);

        expect(parsed.Places).toHaveLength(2);
        expect(parsed).toEqual({
    Places: [
            {
            from: "A",
            floor: 1,
            paths: [
                { to: "B", type: "stairs" }
            ]
            },
            {
            from: "B",
            floor: 1,
            paths: [
                { to: "A", type: "stairs" }
            ]
            }
        ] 
        });
     ;
    }),

    test('Creating an empty map file from a JSON file', ()=>{
        const jsonData={Places:[]}
        const map = JSON_to_map(jsonData);
        expect(map.adj.length).toBe(0)
    }),

    test('Creating a simple map from a JSON file', ()=>{
    const jsonData={Places:[ {
         "from": "h",
         "floor": 2,
         "paths": []
      },
      {
         "from": "u",
         "floor": 5,
         "paths": []
      },
      {
         "from": "g",
         "floor": 5,
         "paths": []
      }]}


    const map= JSON_to_map(jsonData);
    expect(map.size).toBe(3)
    })


})

