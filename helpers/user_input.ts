import  promptSync from 'prompt-sync';
const prompt = promptSync();

import { add_place, add_path, rev_path, type Map, Pathway_type_arr, type Pathway_type, reMap, make_map} from '../lib/building';
import { get_path } from '../lib/Dijkstra_Alg';
import { adding_place, adding_path, removing_path, getting_path, mode_menu, type Menu, your_map_menu, 
    barrier, mainMenu, pathways_menu, alt_mainMenu, uploading_choices, save_choices } from './menus'
import { fetchBuilding, createBuilding, saveTheBuilding } from './apiCalls';
import { download_map, upload_map } from './fileHandler';

let mapID: string;
let map: Map;

function isOnlyNumbers(str: string): boolean {
  return /^\d+$/.test(str);
}

export function invalid(): void {
    console.log("Please enter a VALID option!!");
    console.log();

    prompt("PRESS ANY KEY TO TRY AGAIN!!");
}

export function is_valid<T>(arr: Array<string>, val: string): boolean {
    return arr.includes(val)
}

export function get_user_input(menu: Menu): string {

    let choice: string = "";
    let running: boolean = true;

    while(running) {
        
        process.stdout.write('\x1Bc'); //CLEARS THE TERMINAL LIKE CONSOLE.CLEAR()
        console.log();
        console.log(barrier);
        console.log(menu.menu);

        choice = prompt("CHOICE: ");
        choice = choice.toLowerCase();

        if(!is_valid(menu.options, choice)) { invalid(); }
        else { running = false; }

    }

    return choice;
}

export function extra_opt_menu(menu: Menu): string {

    let choice: string = "";
    let running: boolean = true;

    while(running) {
        console.log();
        console.log(barrier);
        console.log(menu.menu);

        choice = prompt("CHOICE: ");
        choice = choice.toLowerCase();

        if(!is_valid(menu.options, choice)) { invalid(); }
        else { running = false; }
    }

    return choice;
}

function banner(str: string): void {

    process.stdout.write('\x1Bc'); //CLEARS THE TERMINAL LIKE CONSOLE.CLEAR()
    console.log(barrier);
    console.log(str);
}

function pause_screen(): void {

    console.log(barrier);
    console.log();

    enter();
    console.log();

    console.log(barrier);
    console.log();

}

function enter(): void {
    prompt("Press enter to continue ↵");
}

function quit_banner(): void {
    console.log(barrier);
    console.log(`TYPE "q" to quit!!!`);
    console.log(barrier);
    console.log();
}

function quit(str: string): boolean {
    str = str.toLowerCase();
    return str === "q" ? true : false;
}

function user_add_place(map: Map): void {

    banner(adding_place);
    quit_banner();

    const name = prompt("Name: ");

    if(quit(name)) return;
    
    let floorStr = prompt("Floor: ");
    if(floorStr === "q") return;

    while(!isOnlyNumbers(floorStr)) {

        console.log();
        console.log("Plase enter a number: ")
        floorStr = prompt("Floor: ");

        if(quit(floorStr)) return;
        
    }

    const floor = parseInt(floorStr);

    add_place(map, name, floor);

    pause_screen();
}

function isPathwayType(str: string): str is Pathway_type {
    return Pathway_type_arr.includes(str);
}

export function user_add_path(map: Map): void {
    banner(adding_path);
    quit_banner();

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
    
    let choice = extra_opt_menu(pathways_menu);
    if(quit(choice)) return;

    const user_type = allTypes[choice];

    if(isPathwayType(user_type)) {

        console.log();
        const to = prompt("To: ");

    
        add_path(map, from, user_type, to);
    } 
    
    pause_screen();
}

export function user_rev_path(map: Map): void {
    banner(removing_path);
    quit_banner();

    const from = prompt("From: ");
    if(quit(from)) return;

    const to = prompt("To: ");
    if(quit(to)) return;
    
    rev_path(map, from, to);

    pause_screen();
}

export function user_get_path(map: Map): void {
    banner(getting_path);
    quit_banner();

    const from = prompt("From: ");
    if(quit(from)) return;

    const to = prompt("To: ");
    if(quit(to)) return;

    console.log();

    const choice = extra_opt_menu(mode_menu);

    const paths: Record<string, Pathway_type> = {
        a: "stairs",
        b: "hallway_C",
        c: "elevator"
    }

    if(quit(choice)) return;

    if(choice === "d") {

        get_path(map, from, to);

    } else {

        get_path(map, from, to, paths[choice]);
    }

    pause_screen();
}

async function your_map(map: Map): Promise<boolean> {

    let running = true;
    let choice = "";

    const actions: Record<string, () => void | Promise<void | boolean>> = {
        a: () => user_add_place(map),
        b: () => user_add_path(map),
        c: () => user_rev_path(map),
        d: () => user_get_path(map),
        e: async () => await save_choice(),
    }

    while(running) {
        choice = get_user_input(your_map_menu);
        if(quit(choice)) return false;

        if(actions[choice] !== undefined) {

            await actions[choice]();

        } else { running = false; mapID = "";}
    }

    console.log(barrier);
    return true;
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
        return await your_map(map)
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
async function saveBuildingChanges(): Promise<boolean> {
    if (!mapID) {
        return await createNewBuilding()
    }

    const save = await saveTheBuilding(mapID, map);
    if (save) {
        console.log('map saved')
    } else {console.log('Failed to save')}

    pause_screen()
    return true
}

/**
 * Createsa new building in the database
 * @returns boolean
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
        return await your_map(map)
    }

    console.log("\nFailed to created map.");
    pause_screen();
    return true;
}

 async function download(): Promise<boolean> {
    let name = prompt("Enter the name: ");
    console.log("Downloading map")

    const res = download_map(map, name);

    if(res) {
        console.log('Map downloaded!')
        return await your_map(map)
    } else {console.log('Failed to save the map');}
    
    pause_screen()
    return true
}

async function upload(): Promise<boolean> {
    let name = prompt("Enter the name: ");
    const res = upload_map(name)

    if (res) {
        map = res
        console.log("Map loaded..")
        return await your_map(map)
    }

    console.log('Failed to upload map')
    pause_screen()
    return true
}

async function upload_choice(): Promise<boolean> {

    let choice = "";
    const actions: Record<string, () => boolean | Promise<boolean>> = {
        a: async () => await upload(),
        b: async () => await fetchTheBuilding()
    }

    choice = get_user_input(uploading_choices);

    if(choice === "c") {

        return false;

    } else if(actions[choice] !== undefined) {

        await actions[choice]();

    } else {

        return false;
    }

    return true;

}

async function save_choice(): Promise<boolean> {

    let choice = "";
    const actions: Record<string, () => boolean | Promise<boolean>> = {
        a: async () => await saveBuildingChanges(),
        b: async () => await download()
    }

    choice = get_user_input(save_choices);

    if(choice === "c") {

        return false;

    } else if(actions[choice] !== undefined) {

        await actions[choice]();

    } else {

        return false;
    }

    return true;

}

export async function main_menu(): Promise<void> {
    let running: boolean = true

    let choice = get_user_input(mainMenu);
    const actions: Record<string, () => Promise<boolean>> = {
        a: async () => await createNewBuilding(),
        b: async () => await upload_choice()
    }

    if(actions[choice] !== undefined) {

        running = await actions[choice]();

            while(running) {

        choice = get_user_input(alt_mainMenu);
        const actions: Record<string, () => Promise<boolean>> = {
            a: async () => await createNewBuilding(),
            b: async () => await your_map(map),
            c: async () => await upload_choice()
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