"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumbers = isNumbers;
exports.isPathwayType = isPathwayType;
exports.quit_banner = quit_banner;
exports.quit = quit;
exports.enter = enter;
exports.invalid = invalid;
exports.contains = contains;
exports.get_user_input = get_user_input;
exports.display_extra_opt_menu = display_extra_opt_menu;
exports.banner = banner;
exports.pause_screen = pause_screen;
var promptSync = require("prompt-sync");
var prompt = promptSync();
var building_1 = require("../lib/building");
var menus_1 = require("./menus");
//Checks if a string only contains numbers
function isNumbers(str) {
    return /^\d+$/.test(str);
}
//Checks if a string is a valid Pathway_type
function isPathwayType(str) {
    return building_1.Pathway_type_arr.includes(str);
}
//Prints how user can quit
function quit_banner() {
    console.log(menus_1.barrier);
    console.log("TYPE \"q\" to quit!!!");
    console.log(menus_1.barrier);
    console.log();
}
//Checks if a string is equal to "Q" or "q"
function quit(str) {
    str = str.toLowerCase();
    return str === "q";
}
//Prints how user can continue
function enter() {
    prompt("Press enter to continue ↵");
}
//Prints some text which tells the user that the option they have chosen is invalid
function invalid() {
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
function contains(arr, val) {
    return arr.includes(val);
}
/**
 * Displays the provided menu and aks the user for input repeatedly until it
 * retrieves a valid choice from the user corresponding to one of the options provided by the menu
 * @param {Menu} menu containing the string which represents will be displayed and its valid options
 * @returns {string} The choice selected by the user from the menu options
 */
function get_user_input(menu) {
    var choice = "";
    var running = true;
    while (running) {
        process.stdout.write('\x1Bc'); //CLEARS THE TERMINAL LIKE CONSOLE.CLEAR()
        console.log();
        console.log(menus_1.barrier);
        console.log(menu.menu);
        choice = prompt("CHOICE: ");
        choice = choice.toLowerCase();
        if (!contains(menu.options, choice)) {
            invalid();
        }
        else {
            running = false;
        }
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
function display_extra_opt_menu(menu) {
    var choice = "";
    var running = true;
    while (running) {
        console.log();
        console.log(menus_1.barrier);
        console.log(menu.menu);
        choice = prompt("CHOICE: ");
        choice = choice.toLowerCase();
        if (!contains(menu.options, choice)) {
            invalid();
        }
        else {
            running = false;
        }
    }
    return choice;
}
//Runs the quit_banner() function rigth after displaying the provided string
function banner(str) {
    process.stdout.write('\x1Bc'); //CLEARS THE TERMINAL LIKE CONSOLE.CLEAR()
    console.log(menus_1.barrier);
    console.log(str);
    quit_banner();
}
//Asks user to press enter to continue 
function pause_screen() {
    console.log(menus_1.barrier);
    console.log();
    enter();
}
