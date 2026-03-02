import { barrier, downloading_map, uploading_map } from "./menus";
import { banner, pause_screen, quit} from "./helpers_userInput";
import { Map, Pathway_type, add_path, add_place, get_name_by_id, make_map } from "../lib/building";
import {head, tail } from "../lib/list";

import * as fs from "fs";
import * as promptsync from "prompt-sync";
const prompt = promptsync();

//Represents a simpler version of edge (path)
type json_edge = {
    to: string,
    type: Pathway_type
}

//Represents a simpler version of Node (place)
type json_node = {
    from: string
    floor: number
    paths: Array<json_edge>
}

type json_map = {
    Places: Array<json_node>
}

/**
 * Gets the name of the place stored at the provided index
 * @param {Array<json_node>} places the array which contains the json_node 
 * @param {number} idx the index of the desired json_node 
 * @returns {string} the name of the place which is stored in places at the idx'th index
 */
function get_place(places: Array<json_node>, idx: number): string {

    return places[idx].from;
}

/**
 * Gets the floor of the place stored at the provided index
 * @param {Array<json_node>} places the array which contains the json_node 
 * @param {number} idx the index of the desired json_node 
 * @returns {number} the floor of the place which is stored in places at the idx'th index
 */
function get_floor(places: Array<json_node>, idx: number): number {

    return places[idx].floor;
}

/**
 * Gets the paths array of the node stored at the provided index
 * @param {Array<json_node>} places the array which contains the json_node 
 * @param {number} idx the index of the desired json_node 
 * @returns {Array<json_edge>} array containing json_edges which represents 
 * places which can be the reached directly from the desired json_node
 */
function get_paths(places: Array<json_node>, idx: number): Array<json_edge> {

    return places[idx].paths;
}

/**
 * Gets the to value of the json_edge stored at the provided index of json_edges
 * @param {Array<json_edge>} paths the array which contains the json_edges 
 * @param {number} idx the index of the desired json_edge 
 * @returns {string} the name of the destination place which is stored at the idx'th index
 */
function get_dst(paths: Array<json_edge>, idx: number): string {

    return paths[idx].to;
}

/**
 * Gets the type value of the json_edge stored at the provided index of json_edges
 * @param {Array<json_edge>} paths the array which contains the json_edges 
 * @param {number} idx the index of the desired json_edge 
 * @returns {string} the Pathway_type of the json_edge stored at the idx'th index
 */
function get_type(paths: Array<json_edge>, idx: number): Pathway_type {

    return paths[idx].type;
}

/** 
 * Given a map of type Map, it remakes the map to an equivalent but simpler formatted map
 * and later converts it into a JSON string
 * @param {Map} map the map which will be converted into a JSON string
 * @returns {string} the map converted into a JSON string
 */
export function map_to_JSON(map: Map): string {

    const nodes = map.nodes;

    const res: json_map = {
        Places: []
    };

    for(let i = 0; i < nodes.length; i = i + 1) {
        const currNode =  nodes[i];

        let currNode_adj = map.adj[i];

        const curr_node_info: json_node = { 
            from: currNode.name, 
            floor: currNode.floor, 
            paths: [] 
        };

        while(currNode_adj !== null) {

            const currPath = head(currNode_adj);
            const pathDst_id = currPath.to;

            const pathDst_name = get_name_by_id(map, pathDst_id);
            const path__type = currPath.type;

            const json_edge: json_edge = {
                to: pathDst_name,
                type: path__type
            }

            curr_node_info.paths.push(json_edge);
            
           currNode_adj = tail(currNode_adj);
        }

        res.Places.push(curr_node_info);
    }

    const jsonData = JSON.stringify(res, null, 3);

    return jsonData;
}

/** 
 * Given a map of type json_map, it remakes the map to an equivalent map which satisfies the Map type
 * @param {json_map} data the map which will be converted
 * @returns {Map} the converted map
 */
export function JSON_to_map(data: json_map): Map {
    let map: Map = make_map();

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
    return map;
}

/** 
 * Prompts the user to enter the name of the file which will be downloaded on their device
 * containing the map provided converting it to a json_map and writen the JSON file 
 * locally using fs.writeFileSync
 * @param {Map} map the map which will be downloaded
 * @returns {false} if the user quits or after a successful download 
 */
export async function download_map(map: Map): Promise<boolean> {

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

/** 
 * Prompts the user to enter the name of the file, which will be loaded locally using fs.readFileSync 
 * containing a map in json_map type which will be converted to a new equivalent map which satisfies the Map type
 * @returns {Map | boolean} converted map if the file was successfully uploaded, 
 * otherwise false if the user quits
 */
export function upload_map(): Map | boolean {

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
            banner(uploading_map);
            console.log("MAP UPLOADED!!")

            pause_screen();

            return JSON_to_map(new_map);
            
        }
        catch {
            console.log(`NO MAP CALLED ${name} WAS FOUND, PLEASE TRY AGAIN!!`)
            pause_screen();
        }
    }
}
