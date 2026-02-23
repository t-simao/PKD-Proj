"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalid = invalid;
exports.is_valid = is_valid;
exports.get_user_input = get_user_input;
exports.user_add_path = user_add_path;
exports.user_rev_path = user_rev_path;
exports.user_get_path = user_get_path;
exports.main_menu = main_menu;
var promptSync = require("prompt-sync");
var prompt = promptSync();
var building_1 = require("./lib/building");
var Dijkstra_Alg_1 = require("./lib/Dijkstra_Alg");
var menus_1 = require("./menus");
function isOnlyNumbers(str) {
    return /^\d+$/.test(str);
}
function invalid() {
    console.log("Please enter a VALID option!!");
    console.log();
    prompt("PRESS ANY KEY TO TRY AGAIN!!");
}
function is_valid(arr, val) {
    return arr.includes(val) ? true : false;
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
        if (!is_valid(menu.options, choice)) {
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
}
function enter() {
    prompt("Press enter to continue ↵");
}
function user_add_place(map) {
    banner(menus_1.adding_place);
    var name = prompt("Name: ");
    var floorStr = prompt("Floor: ");
    while (!isOnlyNumbers(floorStr)) {
        console.log();
        console.log("Plase enter a number: ");
        floorStr = prompt("Floor: ");
    }
    var floor = parseInt(floorStr);
    (0, building_1.add_place)(map, name, floor);
    console.log(menus_1.barrier);
    console.log();
    enter();
    console.log();
    console.log(menus_1.barrier);
    console.log();
}
function isPathwayType(str) {
    return building_1.Pathway_type_arr.includes(str);
}
function user_add_path(map) {
    banner(menus_1.adding_path);
    var from = prompt("From: ");
    var allTypes = {
        a: "hallway_C",
        b: "hallway_S",
        c: "hallway_L",
        d: "elevator",
        e: "stairs",
        f: "ramp"
    };
    var choice = get_user_input(menus_1.pathways_menu);
    var user_type = allTypes[choice];
    if (isPathwayType(user_type)) {
        console.log();
        var to = prompt("To: ");
        (0, building_1.add_path)(map, from, user_type, to);
    }
    console.log(menus_1.barrier);
    console.log();
    enter();
    console.log();
    console.log(menus_1.barrier);
    console.log();
}
function user_rev_path(map) {
    banner(menus_1.removing_path);
    var from = prompt("From: ");
    console.log();
    var to = prompt("To: ");
    (0, building_1.rev_path)(map, from, to);
    console.log(menus_1.barrier);
    console.log();
    enter();
    console.log();
    console.log(menus_1.barrier);
    console.log();
}
function user_get_path(map) {
    banner(menus_1.geting_path);
    var from = prompt("From: ");
    console.log();
    var to = prompt("To: ");
    console.log();
    var choice = get_user_input(menus_1.mode_menu);
    var paths = {
        a: "stairs",
        b: "hallway_C"
    };
    if (choice === "c") {
        (0, Dijkstra_Alg_1.get_path)(map, from, to);
    }
    else {
        (0, Dijkstra_Alg_1.get_path)(map, from, to, paths[choice]);
    }
    console.log(menus_1.barrier);
    console.log();
    enter();
    console.log();
    console.log(menus_1.barrier);
    console.log();
}
function your_map(map) {
    var running = true;
    var choice = "";
    var actions = {
        a: function () { return user_add_place(map); },
        b: function () { return user_add_path(map); },
        c: function () { return user_rev_path(map); },
        d: function () { return user_get_path(map); },
        e: function () { return user_down_path(map); }
    };
    while (running) {
        choice = get_user_input(menus_1.your_map_menu);
        if (actions[choice] !== undefined) {
            actions[choice]();
        }
        else {
            running = false;
        }
    }
    console.log(menus_1.barrier);
}
function jsn_to_Map(map) {
    var user_map = prompt("YOUR MAP: ");
    //CHANGE THE MAP!!!!!!!!!!!!!!!!!!!!!!!!
    return your_map(map);
}
function user_down_path(map) { } //TO DO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function main_menu(map) {
    var running = true;
    while (running) {
        var choice = get_user_input(menus_1.mainMenu);
        var actions = {
            a: function () { return your_map(map); },
            b: function () { return jsn_to_Map(map); }
        };
        if (actions[choice] !== undefined) {
            actions[choice]();
        }
        else {
            return;
        }
    }
}
