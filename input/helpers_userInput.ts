import * as promptSync from 'prompt-sync';
const prompt = promptSync();

import { type Map, type Node, Pathway_type_arr, type Pathway_type,} from '../lib/building';
import { type Menu, barrier} from './menus';
import { ph_empty, hash_id } from '../lib/hashtables';

//Checks if a string only contains numbers
export function isNumbers(str: string): boolean {
  return /^\d+$/.test(str);
}

//Checks if a string is a valid Pathway_type
export function isPathwayType(str: string): str is Pathway_type {
    return Pathway_type_arr.includes(str);
}

//Prints how user can quit
export function quit_banner(): void {
    console.log(barrier);
    console.log(`TYPE "q" to quit!!!`);
    console.log(barrier);
    console.log();
}

//Checks if a string is equal to "Q" or "q"
export function quit(str: string): boolean {
    str = str.toLowerCase();
    return str === "q";
}

//Prints how user can continue
export function enter(): void {
    prompt("Press enter to continue ↵");
}

//Prints some text which tells the user that the option they have chosen is invalid
export function invalid(): void {
    console.log("Please enter a VALID option!!");
    console.log();

    prompt("PRESS ANY KEY TO TRY AGAIN!!");
}

/** 
 * Checks if an array of strings contains the provided string
 * @param {Array<string>} arr an array of strings which will be checked
 * @param {string} val the string which is being searched
 * @returns {boolean} true if val is found in arr, otherwise returns false
 */
export function contains(arr: Array<string>, val: string): boolean {
    return arr.includes(val)
}

/** 
 * Displays the provided menu and aks the user for input repeatedly until it 
 * retrieves a valid choice from the user corresponding to one of the options provided by the menu
 * @param {Menu} menu containing the string which represents will be displayed and its valid options
 * @returns {string} The choice selected by the user from the menu options
 */
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

/** 
 * Displays the provided menu without clearing the terminal first 
 * and aks the user for input repeatedly until it retrieves a valid choice 
 * from the user corresponding to one of the options provided by the menu
 * @param {Menu} menu containing the string which represents will be displayed and its valid options
 * @returns {string} The choice selected by the user from the menu options
 */
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

//Runs the quit_banner() function rigth after displaying the provided string
export function banner(str: string): void {

    process.stdout.write('\x1Bc'); //CLEARS THE TERMINAL LIKE CONSOLE.CLEAR()
    console.log(barrier);
    console.log(str);
    quit_banner();
}

//Asks user to press enter to continue 
export function pause_screen(): void {

    console.log(barrier);
    console.log();

    enter();
}