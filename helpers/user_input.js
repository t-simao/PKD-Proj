"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalid = invalid;
exports.is_valid = is_valid;
exports.get_user_input = get_user_input;
exports.extra_opt_menu = extra_opt_menu;
exports.user_add_path = user_add_path;
exports.user_rev_path = user_rev_path;
exports.user_get_path = user_get_path;
exports.main_menu = main_menu;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
const building_1 = require("../lib/building");
const Dijkstra_Alg_1 = require("../lib/Dijkstra_Alg");
const menus_1 = require("./menus");
const apiCalls_1 = require("./apiCalls");
const fileHandler_1 = require("./fileHandler");
let mapID;
let map;
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
    let choice = "";
    let running = true;
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
    let choice = "";
    let running = true;
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
}
function pause_screen() {
    console.log(menus_1.barrier);
    console.log();
    enter();
    console.log();
    console.log(menus_1.barrier);
    console.log();
}
function enter() {
    prompt("Press enter to continue ↵");
}
function quit_banner() {
    console.log(menus_1.barrier);
    console.log(`TYPE "q" to quit!!!`);
    console.log(menus_1.barrier);
    console.log();
}
function quit(str) {
    str = str.toLowerCase();
    return str === "q" ? true : false;
}
function user_add_place(map) {
    banner(menus_1.adding_place);
    quit_banner();
    const name = prompt("Name: ");
    if (quit(name))
        return;
    let floorStr = prompt("Floor: ");
    if (floorStr === "q")
        return;
    while (!isOnlyNumbers(floorStr)) {
        console.log();
        console.log("Plase enter a number: ");
        floorStr = prompt("Floor: ");
        if (quit(floorStr))
            return;
    }
    const floor = parseInt(floorStr);
    (0, building_1.add_place)(map, name, floor);
    pause_screen();
}
function isPathwayType(str) {
    return building_1.Pathway_type_arr.includes(str);
}
function user_add_path(map) {
    banner(menus_1.adding_path);
    quit_banner();
    const from = prompt("From: ");
    if (quit(from))
        return;
    const allTypes = {
        a: "hallway_C",
        b: "hallway_S",
        c: "hallway_L",
        d: "elevator",
        e: "stairs",
        f: "ramp"
    };
    let choice = extra_opt_menu(menus_1.pathways_menu);
    if (quit(choice))
        return;
    const user_type = allTypes[choice];
    if (isPathwayType(user_type)) {
        console.log();
        const to = prompt("To: ");
        (0, building_1.add_path)(map, from, user_type, to);
    }
    pause_screen();
}
function user_rev_path(map) {
    banner(menus_1.removing_path);
    quit_banner();
    const from = prompt("From: ");
    if (quit(from))
        return;
    const to = prompt("To: ");
    if (quit(to))
        return;
    (0, building_1.rev_path)(map, from, to);
    pause_screen();
}
function user_get_path(map) {
    banner(menus_1.getting_path);
    quit_banner();
    const from = prompt("From: ");
    if (quit(from))
        return;
    const to = prompt("To: ");
    if (quit(to))
        return;
    console.log();
    const choice = extra_opt_menu(menus_1.mode_menu);
    const paths = {
        a: "stairs",
        b: "hallway_C",
        c: "elevator"
    };
    if (quit(choice))
        return;
    if (choice === "d") {
        (0, Dijkstra_Alg_1.get_path)(map, from, to);
    }
    else {
        (0, Dijkstra_Alg_1.get_path)(map, from, to, paths[choice]);
    }
    pause_screen();
}
function your_map(map) {
    return __awaiter(this, void 0, void 0, function* () {
        let running = true;
        let choice = "";
        const actions = {
            a: () => user_add_place(map),
            b: () => user_add_path(map),
            c: () => user_rev_path(map),
            d: () => user_get_path(map),
            e: () => __awaiter(this, void 0, void 0, function* () { return yield save_choice(); }),
        };
        while (running) {
            choice = get_user_input(menus_1.your_map_menu);
            if (quit(choice))
                return false;
            if (actions[choice] !== undefined) {
                yield actions[choice]();
            }
            else {
                running = false;
                mapID = "";
            }
        }
        console.log(menus_1.barrier);
        return true;
    });
}
/**
 * takes an id from the user and fetches the building
 * @returns boolean
 */
function fetchTheBuilding() {
    return __awaiter(this, void 0, void 0, function* () {
        let user_map = prompt("YOUR MAP: ");
        if (quit(user_map))
            return true;
        console.log(`\Fetching map '${user_map}'...`);
        const building = yield (0, apiCalls_1.fetchBuilding)(user_map);
        if (building) {
            console.log("Map fetched");
            mapID = user_map;
            map = (0, building_1.reMap)(building);
            return yield your_map(map);
        }
        console.log("Failed to fetch Map");
        pause_screen();
        return true;
    });
}
/**
 * If id exixts, takes the edited map and ads it as the map for the id
 * @param map the edited map
 * @returns void
 */
function saveBuildingChanges() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!mapID) {
            return yield createNewBuilding();
        }
        const save = yield (0, apiCalls_1.saveTheBuilding)(mapID, map);
        if (save) {
            console.log('map saved');
        }
        else {
            console.log('Failed to save');
        }
        pause_screen();
        return true;
    });
}
/**
 * Createsa new building in the database
 * @returns boolean
 */
function createNewBuilding() {
    return __awaiter(this, void 0, void 0, function* () {
        let user_map = prompt("Enter name: ");
        if (quit(user_map))
            return true;
        console.log(`\nCreating new map '${user_map}'...`);
        const building = yield (0, apiCalls_1.createBuilding)(user_map, map);
        if (building) {
            console.log("Map created and saved!");
            mapID = user_map;
            map = (0, building_1.reMap)(building);
            return yield your_map(map);
        }
        console.log("\nFailed to created map.");
        pause_screen();
        return true;
    });
}
function download() {
    return __awaiter(this, void 0, void 0, function* () {
        let name = prompt("Enter the name: ");
        console.log("Downloading map");
        const res = (0, fileHandler_1.download_map)(map, name);
        if (res) {
            console.log('Map downloaded!');
            return yield your_map(map);
        }
        else {
            console.log('Failed to save the map');
        }
        pause_screen();
        return true;
    });
}
function upload() {
    return __awaiter(this, void 0, void 0, function* () {
        let name = prompt("Enter the name: ");
        const res = (0, fileHandler_1.upload_map)(name);
        if (res) {
            map = res;
            console.log("Map loaded..");
            return yield your_map(map);
        }
        console.log('Failed to upload map');
        pause_screen();
        return true;
    });
}
function upload_choice() {
    return __awaiter(this, void 0, void 0, function* () {
        let choice = "";
        const actions = {
            a: () => __awaiter(this, void 0, void 0, function* () { return yield upload(); }),
            b: () => __awaiter(this, void 0, void 0, function* () { return yield fetchTheBuilding(); })
        };
        choice = get_user_input(menus_1.uploading_choices);
        if (choice === "c") {
            return false;
        }
        else if (actions[choice] !== undefined) {
            yield actions[choice]();
        }
        else {
            return false;
        }
        return true;
    });
}
function save_choice() {
    return __awaiter(this, void 0, void 0, function* () {
        let choice = "";
        const actions = {
            a: () => __awaiter(this, void 0, void 0, function* () { return yield saveBuildingChanges(); }),
            b: () => __awaiter(this, void 0, void 0, function* () { return yield download(); })
        };
        choice = get_user_input(menus_1.save_choices);
        if (choice === "c") {
            return false;
        }
        else if (actions[choice] !== undefined) {
            yield actions[choice]();
        }
        else {
            return false;
        }
        return true;
    });
}
function main_menu() {
    return __awaiter(this, void 0, void 0, function* () {
        let running = true;
        let choice = get_user_input(menus_1.mainMenu);
        const actions = {
            a: () => __awaiter(this, void 0, void 0, function* () { return yield createNewBuilding(); }),
            b: () => __awaiter(this, void 0, void 0, function* () { return yield upload_choice(); })
        };
        if (actions[choice] !== undefined) {
            running = yield actions[choice]();
            while (running) {
                choice = get_user_input(menus_1.alt_mainMenu);
                const actions = {
                    a: () => __awaiter(this, void 0, void 0, function* () { return yield createNewBuilding(); }),
                    b: () => __awaiter(this, void 0, void 0, function* () { return yield your_map(map); }),
                    c: () => __awaiter(this, void 0, void 0, function* () { return yield upload_choice(); })
                };
                if (actions[choice] !== undefined) {
                    running = yield actions[choice]();
                }
                else {
                    return;
                }
            }
        }
        else {
            return;
        }
    });
}
