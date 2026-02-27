import * as promptSync from 'prompt-sync';
const prompt = promptSync();

import { add_place, add_path, rev_path, type Map, type Pathway_type, make_map, remove_place} from '../lib/building';
import { get_path } from '../lib/Dijkstra_Alg';
import { adding_place, adding_path, removing_path, getting_path, mode_menu, your_map_menu, 
    barrier, mainMenu, pathways_menu, path_banner, alt_mainMenu, cloud_local_choices, save_choices, removing_place} from './menus'
import { download_map, upload_map } from './read_write';
import { banner, quit, isNumbers, pause_screen, isPathwayType, display_extra_opt_menu, 
    get_user_input} from './helpers_userInput';
import { head, is_null, tail } from '../lib/list';
import { createBuilding, fetchBuilding, saveTheBuilding } from './apiCalls';

let mapID: string = '';
let map: Map;

/**
 * Prompts the user for a name and floor and adds a place with that name and floor number in 
 * the provided map
 * @param {Map} map the map which the place will be added to
 */
function user_add_place(map: Map): void {

    banner(adding_place);

    const name = prompt("Name: ");

    if(quit(name)) return;
    
    let floorStr = prompt("Floor: ");
    if(floorStr === "q") return;

    while(!isNumbers(floorStr)) {

        console.log();
        console.log("Please enter a number: ")
        floorStr = prompt("Floor: ");

        if(quit(floorStr)) return;
        
    }

    const floor = parseInt(floorStr);

    console.log();
    add_place(map, name, floor);
    pause_screen();
}

/**
 * Prompts the user for a name and if a place with that name exists in the provided map it is removed
 * @param {Map} map the map which the place will be removed from
 */
function user_remove_place(map: Map): void {

    banner(removing_place);

    const name = prompt("Name: ");

    if(quit(name)) return;

    console.log();
    remove_place(map, name);
    pause_screen();
}

/**
 * Prompts the user for a source place, a pathway type, and a destination place.
 * If the user does not quit, the two way path is added to the provided map.
 *
 * @param {Map} map The map to modify.
 */
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

/**
 * Prompts the user for a source place and, a destination place.
 * If the user does not quit, the two way path is removed from the provided map.
 *
 * @param {Map} map The map to modify.
 */
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

/**
 * Prompts the user for a source place, a destination place and, a mode 
 * and displays the shortest path between source and destination according to the chosen mode
 * @param {Map} map the map the path is located in
 */
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

/**
 * Displays a menu and prompts the user for a option that leads to different actions
 * specified by the displayed menu
 * @param {Map} map the map which will be used to perform these actions
 * @returns {boolean} returns false if the user quits, true if the loop ends normally
 */
export async function use_map(map: Map): Promise<boolean> {

    let running = true;
    let choice = "";

    const actions: Record<string, () => void | boolean | Promise<boolean>> = {
        a: () => user_add_place(map),
        b: () => user_add_path(map),
        c: () => user_rev_path(map),
        d: () => user_remove_place(map),
        e: () => user_get_path(map),
        f: async () => await save_choice()
    }

    while(running) {
        choice = get_user_input(your_map_menu);
        if(quit(choice)) return false;
    

        if(choice === "e") {
            
            if(await actions[choice]()) {

                pause_screen();
                return false;
            }

            pause_screen();

        } else if(choice === "g") {

            running = false;

        } else if(choice !== undefined) {

            await actions[choice]();

        } else {

            running = false;
        }
    }

    console.log(barrier);
    return true;
}

/**
 * Prompts the user to upload a map from a file and, if successful,
 * sets it as the current map and launches the main map menu loop.
 *
 * @returns true if the user quits during upload, and if the use_map menu loop ends normally.  
 */
async function upload(): Promise<boolean> { 
    const res = upload_map();

    if(typeof(res) === "boolean") return true;
    map = res
    mapID = ''
    return await use_map(map);
}

/**
 * Displays a menu and prompts the user for a option that leads to different ways 
 * to upload a map
 * @param {Map} map the map which will be used to perform these actions
 * @returns {boolean} returns false if the user quits or selects option "c", true if the action ends normally
 */
async function upload_choice(): Promise<boolean> {

    let choice = "";
    const actions: Record<string, () => boolean | Promise<boolean>> = {
        a: async () => await upload(),
        b: async () => await fetchTheBuilding()
    }

    choice = get_user_input(cloud_local_choices);

    if(choice === "c") {

        return false;

    } else if(actions[choice] !== undefined){

        return await actions[choice]();

    } else {

        return false;
    }

}

/**
 * Displays the main menu and prompts the user for a option until the user quits
 * or the menu loop ends.
 *
 * If no map is currently loaded, presents the main menu with options to create a new building or upload a map. 
 * If a map is already loaded, presents an alternative menu with additional actions, like making a 
 * new map or uploading a new one.
 *
 * @returns {Promise<void>} returns false if the user quits or selects option "c", true if the action ends normally
 */
export async function main_menu(): Promise<void> {
    let running: boolean = true
    let choice;

    while(running) {
        if (!map) {
            choice = get_user_input(mainMenu);
            const actions: Record<string, () => boolean | Promise<boolean>> = {
                a: async () => await createNewBuilding(),
                b: async () => await upload_choice(),
            }
            if(actions[choice] !== undefined) {
                running = await actions[choice]();
            } else {
                return;
            }
        } else {
            choice = get_user_input(alt_mainMenu);
            const actions: Record<string, () => Promise<boolean> | boolean> = {
                a: async () => await createNewBuilding(),
                b: async () => await use_map(map),
                c: async () => await upload_choice(),
            }
            if(actions[choice] !== undefined) {
                running = await actions[choice]();
            } else {
                return;
            }
        }
    }
}

/**
 * Displays a menu and prompts the user for a option that leads to different ways 
 * to save the map
 * @returns {boolean} returns false if the user quits or selects option "c", true if the action ends normally
 */
async function save_choice(): Promise<boolean> {

    let choice = "";
    const actions: Record<string, () => Promise<boolean> | Promise<void>> = {
        a: async () => await download_map(map),
        b: async () => await saveBuildingChanges()
    }

    choice = get_user_input(save_choices);

    if(choice === "c") {

        return false;

    } else if(actions[choice] !== undefined){

        await actions[choice]();

    } else {

        return false;
    }

    return false;

}


//DATA BASE:
/**
 * Creates a new Map that is a clean copy of the provided map. Nodes with empty names are 
 * ignored, and all paths between valid nodes are preserved in the new map.
 * @param {Map} map - The original map to be copied and cleaned.
 * @returns {Map} A new map containing the same nodes and paths as the original,
 * but without any dummy nodes (nodes with empty names).
 */
export function reMap(map: Map): Map {
    let newMap = make_map();

    for (const node of map.nodes) {
        if (node.name === '') continue;
        add_place(newMap, node.name, node.floor);
    }

    let i = 0;
    while (i < map.nodes.length) {
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
 * @returns {boolean}
 */
async function fetchTheBuilding(): Promise<boolean> {

    console.log("Enter the name of your map!!")
    let user_map = prompt("Name: ");
    if (quit(user_map)) return true;

    console.log(`\nFetching map '${user_map}'...`);
    const building = await fetchBuilding(user_map)

    if (building) {
        console.log("Map fetched")
        mapID = user_map
        map = reMap(building) 
        return await use_map(map)
    }

    console.log(`\nFailed to fetch the Map, ${user_map} does not exist`) 
    pause_screen();
    return true;
}

/**
 * If id exists, takes the edited map and adds it as the map for the id
 * @returns void
 */
async function saveBuildingChanges(): Promise<boolean> {
    if (!mapID) {
        return await createNewBuilding()
    }

    const save = await saveTheBuilding(mapID, map);
    if (save) {
        console.log('map saved')
    } else {console.log('Failed to save')}

    return true
}


/**
 * Creates a new building in the database
 * @returns {boolean}
 */
async function createNewBuilding(): Promise<boolean> { 
    let user_map = prompt("Enter name: ");
    if (quit(user_map)) return true;

    console.log(`\nCreating new map '${user_map}'...`);
    const building = await createBuilding(user_map, map)

    if (building) {
        console.log("Map created and saved!");
        mapID = user_map
        map = reMap(building) 
        return await use_map(map)
    }

    console.log("\nFailed to create the map.");
    pause_screen();
    return true;
}
