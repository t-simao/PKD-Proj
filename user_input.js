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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var prompt_sync_1 = __importDefault(require("prompt-sync"));
var prompt = (0, prompt_sync_1.default)();
var building_1 = require("./lib/building");
var Dijkstra_Alg_1 = require("./lib/Dijkstra_Alg");
var menus_1 = require("./menus");
var apiCalls_1 = require("./apiCalls");
var functions_1 = require("./api/functions");
var mapID = '';
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
    quit_banner();
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
    (0, building_1.add_place)(map, name, floor);
    pause_screen();
}
function isPathwayType(str) {
    return building_1.Pathway_type_arr.includes(str);
}
function user_add_path(map) {
    banner(menus_1.adding_path);
    quit_banner();
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
    var user_type = allTypes[choice];
    if (isPathwayType(user_type)) {
        console.log();
        var to = prompt("To: ");
        (0, building_1.add_path)(map, from, user_type, to);
    }
    pause_screen();
}
function user_rev_path(map) {
    banner(menus_1.removing_path);
    quit_banner();
    var from = prompt("From: ");
    if (quit(from))
        return;
    var to = prompt("To: ");
    if (quit(to))
        return;
    (0, building_1.rev_path)(map, from, to);
    pause_screen();
}
function user_get_path(map) {
    banner(menus_1.getting_path);
    quit_banner();
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
        (0, Dijkstra_Alg_1.get_path)(map, from, to);
    }
    else {
        (0, Dijkstra_Alg_1.get_path)(map, from, to, paths[choice]);
    }
    pause_screen();
}
function your_map(map) {
    return __awaiter(this, void 0, void 0, function () {
        var running, choice, actions;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    running = true;
                    choice = "";
                    actions = {
                        a: function () { return user_add_place(map); },
                        b: function () { return user_add_path(map); },
                        c: function () { return user_rev_path(map); },
                        d: function () { return user_get_path(map); },
                        e: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, save_changes(map)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); },
                    };
                    _a.label = 1;
                case 1:
                    if (!running) return [3 /*break*/, 5];
                    choice = get_user_input(menus_1.your_map_menu);
                    if (quit(choice))
                        return [2 /*return*/, false];
                    if (!(actions[choice] !== undefined)) return [3 /*break*/, 3];
                    return [4 /*yield*/, actions[choice]()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    running = false;
                    mapID = '';
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5:
                    console.log(menus_1.barrier);
                    return [2 /*return*/, true];
            }
        });
    });
}
function jsn_to_Map() {
    return __awaiter(this, void 0, void 0, function () {
        var user_map, building, nice_building;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user_map = prompt("YOUR MAP: ");
                    if (quit(user_map))
                        return [2 /*return*/, true];
                    return [4 /*yield*/, (0, apiCalls_1.fetchBuilding)(user_map)];
                case 1:
                    building = _a.sent();
                    if (!building) return [3 /*break*/, 3];
                    mapID = user_map;
                    nice_building = (0, functions_1.reMap)(building);
                    return [4 /*yield*/, your_map(nice_building)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    //CHANGE THE MAP!!!!!!!!!!!!!!!!!!!!!!!!
                    pause_screen();
                    return [2 /*return*/, true];
            }
        });
    });
}
function save_changes(map) {
    return __awaiter(this, void 0, void 0, function () {
        var save;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!mapID) {
                        pause_screen();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (0, apiCalls_1.saveTheBuilding)(mapID, map)];
                case 1:
                    save = _a.sent();
                    if (save) {
                        console.log('map saved');
                    }
                    else {
                        console.log('Failed to save');
                    }
                    pause_screen();
                    return [2 /*return*/];
            }
        });
    });
}
function new_thing() {
    return __awaiter(this, void 0, void 0, function () {
        var user_map, building, nice_building;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user_map = prompt("YOUR MAP: ");
                    if (quit(user_map))
                        return [2 /*return*/, true];
                    console.log("\nCreating new map '".concat(user_map, "'..."));
                    return [4 /*yield*/, (0, apiCalls_1.createBuilding)(user_map)];
                case 1:
                    building = _a.sent();
                    if (!building) return [3 /*break*/, 3];
                    console.log("Map  created!");
                    mapID = user_map;
                    nice_building = (0, functions_1.reMap)(building);
                    return [4 /*yield*/, your_map(nice_building)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    //CHANGE THE MAP!!!!!!!!!!!!!!!!!!!!!!!!
                    console.log("\nFailed to create map.");
                    pause_screen();
                    return [2 /*return*/, true];
            }
        });
    });
}
function user_down_path(map) { } //TO DO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function main_menu() {
    return __awaiter(this, void 0, void 0, function () {
        var running, choice, actions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    running = true;
                    _a.label = 1;
                case 1:
                    if (!running) return [3 /*break*/, 5];
                    choice = get_user_input(menus_1.mainMenu);
                    actions = {
                        a: function () { return new_thing(); },
                        b: function () { return jsn_to_Map(); }
                    };
                    if (!(actions[choice] !== undefined)) return [3 /*break*/, 3];
                    return [4 /*yield*/, actions[choice]()];
                case 2:
                    running = _a.sent();
                    return [3 /*break*/, 4];
                case 3: return [2 /*return*/];
                case 4: return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
