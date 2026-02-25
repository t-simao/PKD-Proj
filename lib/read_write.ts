import { barrier, downloading_map, uploading_map } from "./menus";
import { banner, pause_screen, quit, restart_map} from "./helpers_userInput";
import { Map, Pathway_type, add_path, add_place, get_name_by_id, make_map} from "./building";
import {head, tail, is_null } from "./list";
import { createBuilding, fetchBuilding,  } from "../apiCalls";

import * as fs from "fs";
import * as promptsync from "prompt-sync";
import { use_map } from "../user_input";
const prompt = promptsync();

type json_path = {
    to: string,
    type: Pathway_type
}

type json_place = {
    from: string
    floor: number
    paths: Array<json_path>
}

type json_map = {
    Places: Array<json_place>
}

function get_place(places: Array<json_place>, idx: number): string {

    return places[idx].from;
}

function get_floor(places: Array<json_place>, idx: number): number {

    return places[idx].floor;
}

function get_paths(places: Array<json_place>, idx: number): Array<json_path> {

    return places[idx].paths;
}

function get_dst(paths: Array<json_path>, idx: number): string {

    return paths[idx].to;
}

function get_type(paths: Array<json_path>, idx: number): Pathway_type {

    return paths[idx].type;
}

function map_to_JSON(map: Map): string {

    const nodes = map.nodes;

    const res: json_map = {
        Places: []
    };

    for(let i = 0; i < nodes.length; i = i + 1) {
        const currNode =  nodes[i];

        let currNode_adj = map.adj[i];

        const curr_node_info: json_place = { 
            from: currNode.name, 
            floor: currNode.floor, 
            paths: [] 
        };

        while(currNode_adj !== null) {

            const currPath = head(currNode_adj);
            const pathDst_id = currPath.to;

            const pathDst_name = get_name_by_id(map, pathDst_id);
            const path__type = currPath.type;

            const json_path: json_path = {
                to: pathDst_name,
                type: path__type
            }

            curr_node_info.paths.push(json_path);
            
           currNode_adj = tail(currNode_adj);
        }

        res.Places.push(curr_node_info);
    }

    const jsonData = JSON.stringify(res, null, 3);

    return jsonData;
}

function JSON_to_map(map: Map, data: json_map): void {

    restart_map(map);

    const places = data.Places;
    const count = places.length;

    for(let i = 0; i < count; i = i + 1) {

        const currPlace = get_place(places, i);
        const currPlace_floor = get_floor(places, i);

        add_place(map, currPlace, currPlace_floor);
    }

    for(let i = 0; i < count; i = i + 1) {

        const currPlace = get_place(places, i);
        const paths = get_paths(places, i);

        const pathCount = paths.length;

        for(let j = 0; j < pathCount; j = j + 1) {

            const dst = get_dst(paths, j);
            const pathType = get_type(paths, j);

            add_path(map, currPlace, pathType, dst);
        }
    }
}

export function download_map(map: Map): boolean {

    const jsonData = map_to_JSON(map);

    console.log();
    
    banner(downloading_map);
    console.log("What do you want to name your file?");

    while(true) {

        const name = prompt("NAME: ");
        if(quit(name)) return false;

        try {

            fs.writeFileSync(`${name}.json`, jsonData);

            console.log(barrier);
            console.log("MAP SAVED!!");
            
            console.log(barrier)

            return false;

        } catch {
            
            console.log("TRY AGAIN!!");
            console.log("");
        }
    }
}

export function upload_map(map: Map): void | boolean {

    while(true) {

        console.log();
        banner(uploading_map);

        console.log("Enter the name of your map!!")
        const name = prompt("NAME: ")
        if(quit(name)) return false;

        try {
            const JSON_data = fs.readFileSync(`${name}.json`, "utf8");
            const new_map: json_map = JSON.parse(JSON_data);

            console.log();
            console.log(banner(uploading_map));
            console.log("MAP UPLOADED!!")

            pause_screen();

            return JSON_to_map(map, new_map);
            
        }
        catch {
            console.log(`NO MAP CALLED ${name} WAS FOUND, PLEASE TRY AGAIN!!`)
            pause_screen();
        }
    }
}


