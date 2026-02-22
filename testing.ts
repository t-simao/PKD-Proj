import * as dotenv from 'dotenv';
dotenv.config()

import { Map } from './lib/building';
import { connectDB } from './db/db'
import { make_map, add_place, add_edge } from './lib/building';
import { is_null, head, tail } from './lib/list';
import { shortest_path } from './lib/Dijkstra_Alg';



// console.clear()

type Building = {
    _id: string
    map: Map
}

export const map = make_map();
// ---------- FLOOR 1 ----------
add_place(map, "Entrance", 1);      //0
add_place(map, "Reception", 1);     //1
add_place(map, "Library", 1);       //2
add_place(map, "Café", 1);          //3
add_place(map, "HallA", 1);         //4
add_place(map, "Stairs1", 1);       //5
add_place(map, "Elevator1", 1);     //6

// ---------- FLOOR 2 ----------
add_place(map, "HallB", 2);         //7
add_place(map, "ComputerLab", 2);   //8
add_place(map, "StudyRoom", 2);     //9
add_place(map, "Lounge", 2);        //10
add_place(map, "Stairs2", 2);       //11
add_place(map, "Elevator2", 2);     //12

// ---------- FLOOR 3 ----------
add_place(map, "HallC", 3);         //13
add_place(map, "OfficeA", 3);       //14
add_place(map, "OfficeB", 3);       //15
add_place(map, "ConferenceRoom", 3);//16
add_place(map, "Stairs3", 3);       //17
add_place(map, "Elevator3", 3);     //18

add_edge(map,"Entrance","Hallway_S","Reception");

add_edge(map,"Reception","Hallway_L","HallA");

add_edge(map,"HallA","Hallway_S","Library");

add_edge(map,"HallA","Hallway_L","Café");

add_edge(map,"HallA","Hallway_L","Stairs1");

add_edge(map,"HallA","Hallway_S","Elevator1");

add_edge(map,"HallB","Hallway_L","ComputerLab");

add_edge(map,"HallB","Hallway_S","StudyRoom");

add_edge(map,"HallB","Hallway_L","Lounge");

add_edge(map,"HallC","Hallway_S","OfficeA");

add_edge(map,"HallC","Hallway_L","OfficeB");

add_edge(map,"HallC","Hallway_L","ConferenceRoom");

add_edge(map,"HallC","Hallway_L","Elevator3");

add_edge(map,"Stairs1","Stairs","Stairs2");

add_edge(map,"Stairs2","Stairs","Stairs3");

add_edge(map,"Elevator1","Elevator","Elevator2");

add_edge(map,"Elevator2","Elevator","Elevator3");

add_edge(map,"Stairs2","Hallway_L","HallB");

add_edge(map,"Elevator2","Hallway_L","HallB");

add_edge(map,"Stairs3","Hallway_S","HallC");

// shortest_path(map, "Entrance", "ConferenceRoom")
// console.log("---------------------------------------s")

export async function createMap(id: string, map: Map) {
    const db = await connectDB();
    const maps = db.collection<Building>("maps")

    const res = await maps.insertOne({
        _id: id,
        map: map
    })
    
    return res
}


function reMap(map: Map): Map {
    let newMap = make_map();

    for (const node of map.nodes) {
        add_place(newMap, node.name, node.floor);
    }

    let i = 0;
    while (i < map.size) {
        const name = map.nodes[i].name
        let li = map.adj[i]
        while(!is_null(li)){
            const f = head(li);
            const name_to = map.nodes[f.to].name
            add_edge(newMap, name, f.type, name_to)
            li = tail(li)
        }
        i++
    }

    return newMap
}

export async function findMap(id: string) {
    const db = await connectDB();
    const maps = db.collection<Building>("maps")

    const res = await maps.findOne({_id: id,})

    if (!res || res.map === undefined) return;

    const newMap = reMap(res.map)
    
    return {_id: res._id, map: newMap}
}

export async function UpdateMap(id: string, map: Map) {
    const db = await connectDB();
    const maps = db.collection<Building>("maps")

     return await maps.updateOne({_id: id},{$set: { map: map }})
}

export async function addPlace(id: string, name: string, floor: number) {
    const db = await connectDB();
    const maps = db.collection<Building>("maps")

    let map = await findMap(id);
    
    if (!map) return;

    add_place(map.map, name, floor)

    return await maps.updateOne({_id: id},{$set: { map: map.map }})
}

// addPlace('building 2', 'megaChurch', 99);


async function main() {
    // createMap(map);
    // const a = await findMap("Building 1")

    // if (a === null || a === undefined) return;
    // let mapy = a.map;

    // add_place(mapy, "Angola", 10);
    // UpdateMap(a._id, mapy);

    const b = await findMap("Building 1")

    if (b === null || b === undefined) return;

    shortest_path(b.map, "Entrance", "ConferenceRoom")
}

// main()

//db.users.findOne({ name: “Arafat” })



//db.maps.updateOne({ _id: "Arafat" }, { $set: { map: map } })
/**
 * fetch building
 * building_id = adwad
 * let building = findbyid(building_id)
 * ad_eddge(building)
 * 
 * updateone(building, map: building)
 */
// createMap(map);