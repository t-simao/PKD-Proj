import { Map } from './lib/building';
import { connectDB } from './db/db'
import { make_map, add_place, add_edge } from './lib/building';

type Building = {
    _id?: string
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

async function createMap(map: Map) {
    const db = await connectDB();
    const maps = db.collection<Building>("maps")

    const res = await maps.insertOne({
        _id: "Building 1",
        map: map
    })
    
    console.log(res.insertedId);
}

// createMap(map);