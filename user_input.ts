import * as promptSync from 'prompt-sync';
const prompt = promptSync();

import { add_place, add_path, rev_path, type Map, Pathway_type_arr, type Pathway_type} from './lib/building';
import { get_path } from './lib/Dijkstra_Alg';
import { adding_place, adding_path, removing_path, geting_path, mode_menu, type Menu, your_map_menu, 
    barrier, mainMenu, pathways_menu } from './menus'

function isOnlyNumbers(str: string): boolean {
  return /^\d+$/.test(str);
}

export function invalid(): void {
    console.log("Please enter a VALID option!!");
    console.log();

    prompt("PRESS ANY KEY TO TRY AGAIN!!");
}

export function is_valid<T>(arr: Array<string>, val: string): boolean {
    return arr.includes(val) ? true : false;
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

function banner(str: string) {

    process.stdout.write('\x1Bc'); //CLEARS THE TERMINAL LIKE CONSOLE.CLEAR()
    console.log(barrier);
    console.log(str);
}

function enter(): void {
    prompt("Press enter to continue ↵");
}

function user_add_place(map: Map): void {

    banner(adding_place);
    const name = prompt("Name: ");
    
    let floorStr = prompt("Floor: ");
    while(!isOnlyNumbers(floorStr)) {

        console.log();
        console.log("Plase enter a number: ")
        floorStr = prompt("Floor: ");

    }

    const floor = parseInt(floorStr);

    add_place(map, name, floor);

    console.log(barrier);
    console.log();

    enter();
    console.log();

    console.log(barrier);
    console.log();
}

function isPathwayType(str: string): str is Pathway_type {
    return Pathway_type_arr.includes(str);
}

export function user_add_path(map: Map): void {
    banner(adding_path);
    const from = prompt("From: ");

    const allTypes: Record<string, string> = {
        a: "hallway_C",
        b: "hallway_S",
        c: "hallway_L",
        d: "elevator",
        e: "stairs",
        f: "ramp"
    };
    
    let choice = get_user_input(pathways_menu);
    const user_type = allTypes[choice];

    if(isPathwayType(user_type)) {

        console.log();
        const to = prompt("To: ");

    
        add_path(map, from, user_type, to);
    } 
    
    console.log(barrier);
    console.log();

    enter();
    console.log();

    console.log(barrier);
    console.log();

}

export function user_rev_path(map: Map): void {
    banner(removing_path);
    const from = prompt("From: ");

    console.log();
    const to = prompt("To: ");

    
    rev_path(map, from, to);

    console.log(barrier);
    console.log();

    enter();
    console.log();

    console.log(barrier);
    console.log();
}

export function user_get_path(map: Map): void {
    banner(geting_path);
    const from = prompt("From: ");

    console.log();
    const to = prompt("To: ");

    console.log();

    const choice = get_user_input(mode_menu);

    const paths: Record<string, Pathway_type> = {
        a: "stairs",
        b: "hallway_C",
        c: "elevator"
    }

    if(choice === "d") {

        get_path(map, from, to);

    } else {

        get_path(map, from, to, paths[choice]);
    }

    console.log(barrier);
    console.log();

    enter();
    console.log();

    console.log(barrier);
    console.log();
}

function your_map(map: Map): void {

    let running = true;
    let choice = "";

    const actions: Record<string, () => void> = {
        a: () => user_add_place(map),
        b: () => user_add_path(map),
        c: () => user_rev_path(map),
        d: () => user_get_path(map),
        e: () => user_down_path(map)
    }

    while(running) {
        choice = get_user_input(your_map_menu);
        
        if(actions[choice] !== undefined) {

            actions[choice]();

        } else { running = false; }
    }

    console.log(barrier);
}

function jsn_to_Map(map: Map): void { //TO DO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let user_map = prompt("YOUR MAP: ");

    //CHANGE THE MAP!!!!!!!!!!!!!!!!!!!!!!!!

    return your_map(map);
}

function user_down_path(map: Map): void {} //TO DO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export function main_menu(map: Map): void {
    let running = true;

    while(running) {

        let choice = get_user_input(mainMenu);
        const actions: Record<string, () => void> = {
            a: () => your_map(map),
            b: () => jsn_to_Map(map)
        }

        if(actions[choice] !== undefined) {

            actions[choice]();

        } else {

            return;
        }
    }
}