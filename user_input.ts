import * as promptSync from 'prompt-sync';
const prompt = promptSync();

import { add_place, add_path, rev_path, type Map, type Pathway_type, make_map} from './lib/building';
import { get_path } from './lib/Dijkstra_Alg';
import { adding_place, adding_path, removing_path, getting_path, mode_menu, your_map_menu, 
    barrier, mainMenu, pathways_menu, path_banner, alt_mainMenu,
    uploading_choices} from './lib/menus'
import { download_map, upload_map } from './lib/read_write';
import { banner, quit, isNumbers, pause_screen, isPathwayType, display_extra_opt_menu, 
    get_user_input, restart_map } from './lib/helpers_userInput';
import { head, is_null, tail } from './lib/list';
import { createBuilding, fetchBuilding, saveTheBuilding } from './apiCalls';

let mapID = '';
let map = make_map();

function user_add_place(map: Map): void {

    banner(adding_place);

    const name = prompt("Name: ");

    if(quit(name)) return;
    
    let floorStr = prompt("Floor: ");
    if(floorStr === "q") return;

    while(!isNumbers(floorStr)) {

        console.log();
        console.log("Plase enter a number: ")
        floorStr = prompt("Floor: ");

        if(quit(floorStr)) return;
        
    }

    const floor = parseInt(floorStr);

    console.log();
    add_place(map, name, floor);
    pause_screen();
}

export function user_add_path(map: Map): void {
    banner(adding_path);

    const from = prompt("From: ");
    if(quit(from)) return;

    const allTypes: Record<string, string> = {
        a: "hallway_C",
        b: "hallway_S",
        c: "hallway_L",
        d: "elevator",
        e: "stairs",
        f: "ramp"
    };
    
    let choice = display_extra_opt_menu(pathways_menu);
    if(quit(choice)) return;

    console.log(barrier);

    const user_type = allTypes[choice];

    if(isPathwayType(user_type)) {

        console.log();
        const to = prompt("To: ");

        console.log(barrier);
        add_path(map, from, user_type, to);
    } 
    
    pause_screen();
}

export function user_rev_path(map: Map): void {
    banner(removing_path);

    const from = prompt("From: ");
    if(quit(from)) return;

    const to = prompt("To: ");
    if(quit(to)) return;
    
    console.log();
    console.log(barrier);

    rev_path(map, from, to);
    pause_screen();
}

export function user_get_path(map: Map): void {
    banner(getting_path);

    const from = prompt("From: ");
    if(quit(from)) return;

    const to = prompt("To: ");
    if(quit(to)) return;

    console.log();

    const choice = display_extra_opt_menu(mode_menu);

    const paths: Record<string, Pathway_type> = {
        a: "stairs",
        b: "hallway_C",
        c: "elevator"
    }

    if(quit(choice)) return;

        console.log();
        console.log(path_banner);
        console.log();
        
        console.log(barrier);

    if(choice === "d") {

        get_path(map, from, to);

    } else {

        get_path(map, from, to, paths[choice]);

    }

    pause_screen();
}

export function use_map(map: Map): boolean {

    let running = true;
    let choice = "";

    const actions: Record<string, () => void | boolean> = {
        a: () => user_add_place(map),
        b: () => user_add_path(map),
        c: () => user_rev_path(map),
        d: () => user_get_path(map),
        e: () => download_map(map)
    }

    while(running) {
        choice = get_user_input(your_map_menu);
        if(quit(choice)) return false;
    

        if(choice === "e") {
            
            if(actions[choice]()) {

                pause_screen();
                return false;
            }

            pause_screen();

        } else if(choice === "f") {

            running = false;

        } else if(choice !== undefined) {

            actions[choice]();

        } else {

            running = false;
        }
    }

    console.log(barrier);
    return true;
}

function upload(map: Map): boolean { 
    const res = upload_map(map);

    if(typeof(res) === "boolean") return true;
    
    return use_map(map);
}

function new_map(map: Map): boolean { 

    restart_map(map)
    
    return use_map(map);
}

async function upload_choice(map: Map): Promise<boolean> {

    let choice = "";
    const actions: Record<string, () => boolean | Promise<boolean>> = {
        a: () => upload(map),
        b: async () => await fetchTheBuilding()
    }

    choice = get_user_input(uploading_choices);

    if(choice === "c") {

        return false;

    } else if(actions[choice] !== undefined){

        return await actions[choice]();

    } else {

        return false;
    }

}

export async function main_menu(): Promise<void> {
    let running: boolean = true
    let choice = get_user_input(mainMenu);

    const actions: Record<string, () => boolean | Promise<boolean>> = {
        a: () => use_map(map),
        b: async () => await upload_choice(map)
    }

    if(actions[choice] !== undefined) {

        running = await actions[choice]();

            while(running) {

        choice = get_user_input(alt_mainMenu);
        const actions: Record<string, () => boolean> = {
            a: () => new_map(map),
            b: () => use_map(map),
            c: () => upload(map)
        }

        if(actions[choice] !== undefined) {

            running = await actions[choice]();

        } else {

            return;
        }
    }

    } else {

        return;
    }
}


//DATA BASE:
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


/**
 * takes an id from the user and fetches the building
 * @returns boolean
 */
async function fetchTheBuilding(): Promise<boolean> {
    let user_map = prompt("YOUR MAP: ");
    if (quit(user_map)) return true;

    console.log(`\Fetching map '${user_map}'...`);
    const building = await fetchBuilding(user_map)

    if (building) {
        console.log("Map fetched")
        mapID = user_map
        map = reMap(building) 
        return await use_map(map)
    }

    console.log("Failed to fetch Map")
    pause_screen();
    return true;
}

/**
 * If id exixts, takes the edited map and ads it as the map for the id
 * @param map the edited map
 * @returns void
 */
async function saveBuildingChanges(map: Map): Promise<void> {
    if (!mapID) {
        pause_screen()
        return
    }

    const save = await saveTheBuilding(mapID, map);
    if (save) {
        console.log('map saved')
    } else {console.log('Failed to save')}

    pause_screen()
}

/**
 * Createsa new building in the database
 * @returns boolean
 */
async function createNewBuilding(): Promise<boolean> { 
    let user_map = prompt("YOUR MAP: ");
    if (quit(user_map)) return true;

    console.log(`\nCreating new map '${user_map}'...`);
    const building = await createBuilding(user_map)

    if (building) {
        console.log("Map  created!");
        mapID = user_map
        map = reMap(building) 
        return await use_map(map)
    }

    console.log("\nFailed to create map.");
    pause_screen();
    return true;
}

