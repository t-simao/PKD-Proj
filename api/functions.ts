import * as dotenv from 'dotenv';
dotenv.config()

import { Map } from '../lib/building';
import { connectDB } from '../db/db'
import { make_map, add_place, add_path } from '../lib/building';
import { is_null, head, tail } from '../lib/list';
import { WithId } from "mongodb";


export type Building = {
    _id: string
    map: Map
}


export async function createMap(id: string, map: Map): Promise<{ _id: string; map: Map } | undefined> {
    const db = await connectDB();
    const maps = db.collection<Building>("maps")

    await maps.insertOne({
        _id: id,
        map: map
    })

    const get_map = await maps.findOne({_id: id,})

    if (!get_map) return;
    
    return {_id: get_map._id, map: get_map.map}
}

// Helper that rebuild the map
export function reMap(map: Map): Map {
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
            add_path(newMap, name, f.type, name_to)
            li = tail(li)
        }
        i++
    }

    return newMap
}

export async function findMap(id: string): Promise<{ _id: string; map: Map } | undefined> {
    const db = await connectDB();
    const maps = db.collection<Building>("maps")

    const res = await maps.findOne({_id: id,})

    if (!res || res.map === undefined) return;
    
    return {_id: res._id, map: res.map}
}

export async function UpdateMap(id: string, map: Map): Promise<{ _id: string; map: Map } | undefined> {
    const db = await connectDB();
    const maps = db.collection<Building>("maps")

    await maps.updateOne({_id: id},{$set: { map: map }})

    const res = await maps.findOne({_id: id,})

    if (!res || res.map === undefined) return;
    
    return {_id: res._id, map: res.map}
}

export async function getAll(): Promise<WithId<Building>[]> {
    const db = await connectDB();
    const maps = db.collection<Building>("maps")

    const res = await maps.find().toArray();

    return res
}

// export const map = make_map();
// // ---------- FLOOR 1 ----------
// add_place(map, "Entrance", 1);      //0
// add_place(map, "Reception", 1);     //1
// add_place(map, "Library", 1);       //2
// add_place(map, "Café", 1);          //3
// add_place(map, "HallA", 1);         //4
// add_place(map, "Stairs1", 1);       //5
// add_place(map, "Elevator1", 1);     //6

// // ---------- FLOOR 2 ----------
// add_place(map, "HallB", 2);         //7
// add_place(map, "ComputerLab", 2);   //8
// add_place(map, "StudyRoom", 2);     //9
// add_place(map, "Lounge", 2);        //10
// add_place(map, "Stairs2", 2);       //11
// add_place(map, "Elevator2", 2);     //12

// // ---------- FLOOR 3 ----------
// add_place(map, "HallC", 3);         //13
// add_place(map, "OfficeA", 3);       //14
// add_place(map, "OfficeB", 3);       //15
// add_place(map, "ConferenceRoom", 3);//16
// add_place(map, "Stairs3", 3);       //17
// add_place(map, "Elevator3", 3);     //18

// add_path(map,"Entrance",'hallway_S',"Reception");

// add_path(map,"Reception","hallway_L","HallA");

// add_path(map,"HallA","hallway_S","Library");

// add_path(map,"HallA","hallway_L","Café");

// add_path(map,"HallA","hallway_L","Stairs1");

// add_path(map,"HallA","hallway_S","Elevator1");

// add_path(map,"HallB","hallway_L","ComputerLab");

// add_path(map,"HallB","hallway_S","StudyRoom");

// add_path(map,"HallB","hallway_L","Lounge");

// add_path(map,"HallC","hallway_S","OfficeA");

// add_path(map,"HallC","hallway_L","OfficeB");

// add_path(map,"HallC","hallway_L","ConferenceRoom");

// add_path(map,"HallC","hallway_L","Elevator3");

// add_path(map,"Stairs1","stairs","Stairs2");

// add_path(map,"Stairs2","stairs","Stairs3");

// add_path(map,"Elevator1","elevator","Elevator2");

// add_path(map,"Elevator2","elevator","Elevator3");

// add_path(map,"Stairs2","hallway_L","HallB");

// add_path(map,"Elevator2","hallway_L","HallB");

// add_path(map,"Stairs3","hallway_S","HallC");

// UpdateMap('building 5', map);