"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumbers = isNumbers;
exports.isPathwayType = isPathwayType;
exports.quit_banner = quit_banner;
exports.quit = quit;
exports.restart_map = restart_map;
exports.invalid = invalid;
exports.contains = contains;
exports.get_user_input = get_user_input;
exports.display_extra_opt_menu = display_extra_opt_menu;
exports.banner = banner;
exports.pause_screen = pause_screen;
var promptSync = require("prompt-sync");
var prompt = promptSync();
var building_1 = require("./building");
var menus_1 = require("./menus");
var hashtables_1 = require("./hashtables");
function isNumbers(str) {
    return /^\d+$/.test(str);
}
function isPathwayType(str) {
    return building_1.Pathway_type_arr.includes(str);
}
function quit_banner() {
    console.log(menus_1.barrier);
    console.log("TYPE \"q\" to quit!!!");
    console.log(menus_1.barrier);
    console.log();
}
function quit(str) {
    str = str.toLowerCase();
    return str === "q" ? true : false;
}
function enter() {
    prompt("Press enter to continue ↵");
}
function restart_map(map) {
    map.places = (0, hashtables_1.ph_empty)(15, hashtables_1.hash_id);
    map.adj = [];
    map.nodes = [];
    map.size = 0;
}
function invalid() {
    console.log("Please enter a VALID option!!");
    console.log();
    prompt("PRESS ANY KEY TO TRY AGAIN!!");
}
function contains(arr, val) {
    return arr.includes(val);
}
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
function banner(str) {
    process.stdout.write('\x1Bc'); //CLEARS THE TERMINAL LIKE CONSOLE.CLEAR()
    console.log(menus_1.barrier);
    console.log(str);
    quit_banner();
}
function pause_screen() {
    console.log(menus_1.barrier);
    console.log();
    enter();
}
