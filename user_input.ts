import * as promptSync from 'prompt-sync';
const prompt = promptSync();

import { add_place, add_path, rev_path, type Map, Pathway_type_arr, type Pathway_type, make_map} from './lib/building';
import { get_path } from './lib/Dijkstra_Alg';
import { adding_place, adding_path, removing_path, getting_path, mode_menu, type Menu, your_map_menu, 
    barrier, mainMenu, pathways_menu, 
    path_banner,
    alt_mainMenu} from './menus'

import { download_map, upload_map } from './lib/read_write';

function isOnlyNumbers(str: string): boolean {
  return /^\d+$/.test(str);
}

export function invalid(): void {
    console.log("Please enter a VALID option!!");
    console.log();

    prompt("PRESS ANY KEY TO TRY AGAIN!!");
}

export function is_valid(arr: Array<string>, val: string): boolean {
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

export function banner(str: string): void {

    process.stdout.write('\x1Bc'); //CLEARS THE TERMINAL LIKE CONSOLE.CLEAR()
    console.log(barrier);
    console.log(str);
    quit_banner();
}

export function pause_screen(): void {

    console.log(barrier);
    console.log();

    enter();
}

function enter(): void {
    prompt("Press enter to continue ↵");
}

export function quit_banner(): void {
    console.log(barrier);
    console.log(`TYPE "q" to quit!!!`);
    console.log(barrier);
    console.log();
}

export function quit(str: string): boolean {
    str = str.toLowerCase();
    return str === "q" ? true : false;
}

function user_add_place(map: Map): void {

    banner(adding_place);

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

    console.log();
    add_place(map, name, floor);
    pause_screen();
}

function isPathwayType(str: string): str is Pathway_type {
    return Pathway_type_arr.includes(str);
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
    
    let choice = extra_opt_menu(pathways_menu);
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

    const choice = extra_opt_menu(mode_menu);

    const paths: Record<string, Pathway_type> = {
        a: "stairs",
        b: "hallway_C",
        c: "elevator"
    }

    if(quit(choice)) return;

    if(choice === "d") {

        console.log();
        console.log(path_banner);
        console.log();
        
        console.log(barrier);
        get_path(map, from, to);

    } else {

        console.log();
        console.log(path_banner);
        console.log();
        
        console.log(barrier);
        get_path(map, from, to, paths[choice]);

    }

    pause_screen();
}

function use_map(map: Map): boolean {

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

function jsn_to_Map(map: Map): boolean { 
    const res = upload_map();

    if(typeof(res) === "boolean") return true;
    
    map = res;
    return use_map(map);
}

export function main_menu(map: Map): void {
    let running: boolean = true
    let choice = get_user_input(mainMenu);

    const actions: Record<string, () => boolean> = {
        a: () => use_map(map),
        b: () => jsn_to_Map(map)
    }

    if(actions[choice] !== undefined) {

        running = actions[choice]();

            while(running) {

        choice = get_user_input(alt_mainMenu);
        const actions: Record<string, () => boolean> = {
            a: () => use_map(make_map()),
            b: () => use_map(map),
            c: () => jsn_to_Map(map)
        }

        if(actions[choice] !== undefined) {

            running = actions[choice]();

        } else {

            return;
        }
    }

    } else {

        return;
    }
}

