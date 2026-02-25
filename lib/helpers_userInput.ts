import * as promptSync from 'prompt-sync';
const prompt = promptSync();

import { type Map, type Node, Pathway_type_arr, type Pathway_type,} from './building';
import { type Menu, barrier} from './menus'
import { ph_empty, hash_id } from './hashtables';


export function isNumbers(str: string): boolean {
  return /^\d+$/.test(str);
}

export function isPathwayType(str: string): str is Pathway_type {
    return Pathway_type_arr.includes(str);
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

function enter(): void {
    prompt("Press enter to continue ↵");
}

export function restart_map(map: Map): void {
    
    map.places = ph_empty<string, Node>(15, hash_id);
    map.adj = [];
    map.nodes = [];
    map.size = 0;
}

export function invalid(): void {
    console.log("Please enter a VALID option!!");
    console.log();

    prompt("PRESS ANY KEY TO TRY AGAIN!!");
}

export function contains(arr: Array<string>, val: string): boolean {
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

        if(!contains(menu.options, choice)) { invalid(); }
        else { running = false; }

    }

    return choice;
}

export function display_extra_opt_menu(menu: Menu): string {

    let choice: string = "";
    let running: boolean = true;

    while(running) {
        console.log();
        console.log(barrier);
        console.log(menu.menu);

        choice = prompt("CHOICE: ");
        choice = choice.toLowerCase();

        if(!contains(menu.options, choice)) { invalid(); }
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