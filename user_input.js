"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalid = invalid;
exports.is_valid = is_valid;
exports.get_user_input = get_user_input;
exports.extra_opt_menu = extra_opt_menu;
exports.banner = banner;
exports.pause_screen = pause_screen;
exports.quit_banner = quit_banner;
exports.quit = quit;
exports.user_add_path = user_add_path;
exports.user_rev_path = user_rev_path;
exports.user_get_path = user_get_path;
exports.main_menu = main_menu;
var promptSync = require("prompt-sync");
var prompt = promptSync();
var building_1 = require("./lib/building");
var Dijkstra_Alg_1 = require("./lib/Dijkstra_Alg");
var menus_1 = require("./menus");
var read_write_1 = require("./lib/read_write");
function isOnlyNumbers(str) {
    return /^\d+$/.test(str);
}
function invalid() {
    console.log("Please enter a VALID option!!");
    console.log();
    prompt("PRESS ANY KEY TO TRY AGAIN!!");
}
function is_valid(arr, val) {
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
        if (!is_valid(menu.options, choice)) {
            invalid();
        }
        else {
            running = false;
        }
    }
    return choice;
}
function extra_opt_menu(menu) {
    var choice = "";
    var running = true;
    while (running) {
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
    quit_banner();
}
function pause_screen() {
    console.log(menus_1.barrier);
    console.log();
    enter();
}
function enter() {
    prompt("Press enter to continue ↵");
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
function user_add_place(map) {
    banner(menus_1.adding_place);
    var name = prompt("Name: ");
    if (quit(name))
        return;
    var floorStr = prompt("Floor: ");
    if (floorStr === "q")
        return;
    while (!isOnlyNumbers(floorStr)) {
        console.log();
        console.log("Plase enter a number: ");
        floorStr = prompt("Floor: ");
        if (quit(floorStr))
            return;
    }
    var floor = parseInt(floorStr);
    console.log();
    (0, building_1.add_place)(map, name, floor);
    pause_screen();
}
function isPathwayType(str) {
    return building_1.Pathway_type_arr.includes(str);
}
function user_add_path(map) {
    banner(menus_1.adding_path);
    var from = prompt("From: ");
    if (quit(from))
        return;
    var allTypes = {
        a: "hallway_C",
        b: "hallway_S",
        c: "hallway_L",
        d: "elevator",
        e: "stairs",
        f: "ramp"
    };
    var choice = extra_opt_menu(menus_1.pathways_menu);
    if (quit(choice))
        return;
    console.log(menus_1.barrier);
    var user_type = allTypes[choice];
    if (isPathwayType(user_type)) {
        console.log();
        var to = prompt("To: ");
        console.log(menus_1.barrier);
        (0, building_1.add_path)(map, from, user_type, to);
    }
    pause_screen();
}
function user_rev_path(map) {
    banner(menus_1.removing_path);
    var from = prompt("From: ");
    if (quit(from))
        return;
    var to = prompt("To: ");
    if (quit(to))
        return;
    console.log();
    console.log(menus_1.barrier);
    (0, building_1.rev_path)(map, from, to);
    pause_screen();
}
function user_get_path(map) {
    banner(menus_1.getting_path);
    var from = prompt("From: ");
    if (quit(from))
        return;
    var to = prompt("To: ");
    if (quit(to))
        return;
    console.log();
    var choice = extra_opt_menu(menus_1.mode_menu);
    var paths = {
        a: "stairs",
        b: "hallway_C",
        c: "elevator"
    };
    if (quit(choice))
        return;
    if (choice === "d") {
        console.log();
        console.log(menus_1.path_banner);
        console.log();
        console.log(menus_1.barrier);
        (0, Dijkstra_Alg_1.get_path)(map, from, to);
    }
    else {
        console.log();
        console.log(menus_1.path_banner);
        console.log();
        console.log(menus_1.barrier);
        (0, Dijkstra_Alg_1.get_path)(map, from, to, paths[choice]);
    }
    pause_screen();
}
function use_map(map) {
    var running = true;
    var choice = "";
    var actions = {
        a: function () { return user_add_place(map); },
        b: function () { return user_add_path(map); },
        c: function () { return user_rev_path(map); },
        d: function () { return user_get_path(map); },
        e: function () { return (0, read_write_1.download_map)(map); }
    };
    while (running) {
        choice = get_user_input(menus_1.your_map_menu);
        if (quit(choice))
            return false;
        if (choice === "e") {
            if (actions[choice]()) {
                pause_screen();
                return false;
            }
            pause_screen();
        }
        else if (choice === "f") {
            running = false;
        }
        else if (choice !== undefined) {
            actions[choice]();
        }
        else {
            running = false;
        }
    }
    console.log(menus_1.barrier);
    return true;
}
function jsn_to_Map(map) {
    var res = (0, read_write_1.upload_map)();
    if (typeof (res) === "boolean")
        return true;
    map = res;
    return use_map(map);
}
function main_menu(map) {
    var running = true;
    var choice = get_user_input(menus_1.mainMenu);
    var actions = {
        a: function () { return use_map(map); },
        b: function () { return jsn_to_Map(map); }
    };
    if (actions[choice] !== undefined) {
        running = actions[choice]();
        while (running) {
            choice = get_user_input(menus_1.alt_mainMenu);
            var actions_1 = {
                a: function () { return use_map((0, building_1.make_map)()); },
                b: function () { return use_map(map); },
                c: function () { return jsn_to_Map(map); }
            };
            if (actions_1[choice] !== undefined) {
                running = actions_1[choice]();
            }
            else {
                return;
            }
        }
    }
    else {
        return;
    }
}
