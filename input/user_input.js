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
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_add_path = user_add_path;
exports.user_rev_path = user_rev_path;
exports.user_get_path = user_get_path;
exports.use_map = use_map;
exports.main_menu = main_menu;
exports.reMap = reMap;
var promptSync = require("prompt-sync");
var prompt = promptSync();
var building_1 = require("../lib/building");
var Dijkstra_Alg_1 = require("../lib/Dijkstra_Alg");
var menus_1 = require("./menus");
var read_write_1 = require("./read_write");
var helpers_userInput_1 = require("./helpers_userInput");
var list_1 = require("../lib/list");
var apiCalls_1 = require("./apiCalls");
var mapID = '';
var map;
function user_add_place(map) {
    (0, helpers_userInput_1.banner)(menus_1.adding_place);
    var name = prompt("Name: ");
    if ((0, helpers_userInput_1.quit)(name))
        return;
    var floorStr = prompt("Floor: ");
    if (floorStr === "q")
        return;
    while (!(0, helpers_userInput_1.isNumbers)(floorStr)) {
        console.log();
        console.log("Plase enter a number: ");
        floorStr = prompt("Floor: ");
        if ((0, helpers_userInput_1.quit)(floorStr))
            return;
    }
    var floor = parseInt(floorStr);
    console.log();
    (0, building_1.add_place)(map, name, floor);
    (0, helpers_userInput_1.pause_screen)();
}
function user_add_path(map) {
    (0, helpers_userInput_1.banner)(menus_1.adding_path);
    var from = prompt("From: ");
    if ((0, helpers_userInput_1.quit)(from))
        return;
    var allTypes = {
        a: "hallway_C",
        b: "hallway_S",
        c: "hallway_L",
        d: "elevator",
        e: "stairs",
        f: "ramp"
    };
    var choice = (0, helpers_userInput_1.display_extra_opt_menu)(menus_1.pathways_menu);
    if ((0, helpers_userInput_1.quit)(choice))
        return;
    console.log(menus_1.barrier);
    var user_type = allTypes[choice];
    if ((0, helpers_userInput_1.isPathwayType)(user_type)) {
        console.log();
        var to = prompt("To: ");
        console.log(menus_1.barrier);
        (0, building_1.add_path)(map, from, user_type, to);
    }
    (0, helpers_userInput_1.pause_screen)();
}
function user_rev_path(map) {
    (0, helpers_userInput_1.banner)(menus_1.removing_path);
    var from = prompt("From: ");
    if ((0, helpers_userInput_1.quit)(from))
        return;
    var to = prompt("To: ");
    if ((0, helpers_userInput_1.quit)(to))
        return;
    console.log();
    console.log(menus_1.barrier);
    (0, building_1.rev_path)(map, from, to);
    (0, helpers_userInput_1.pause_screen)();
}
function user_get_path(map) {
    (0, helpers_userInput_1.banner)(menus_1.getting_path);
    var from = prompt("From: ");
    if ((0, helpers_userInput_1.quit)(from))
        return;
    var to = prompt("To: ");
    if ((0, helpers_userInput_1.quit)(to))
        return;
    console.log();
    var choice = (0, helpers_userInput_1.display_extra_opt_menu)(menus_1.mode_menu);
    var paths = {
        a: "stairs",
        b: "hallway_C",
        c: "elevator"
    };
    if ((0, helpers_userInput_1.quit)(choice))
        return;
    console.log();
    console.log(menus_1.path_banner);
    console.log();
    console.log(menus_1.barrier);
    if (choice === "d") {
        (0, Dijkstra_Alg_1.get_path)(map, from, to);
    }
    else {
        (0, Dijkstra_Alg_1.get_path)(map, from, to, paths[choice]);
    }
    (0, helpers_userInput_1.pause_screen)();
}
function use_map(map) {
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
                                case 0: return [4 /*yield*/, save_choice()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); }
                    };
                    _a.label = 1;
                case 1:
                    if (!running) return [3 /*break*/, 8];
                    choice = (0, helpers_userInput_1.get_user_input)(menus_1.your_map_menu);
                    if ((0, helpers_userInput_1.quit)(choice))
                        return [2 /*return*/, false];
                    if (!(choice === "e")) return [3 /*break*/, 3];
                    return [4 /*yield*/, actions[choice]()];
                case 2:
                    if (_a.sent()) {
                        (0, helpers_userInput_1.pause_screen)();
                        return [2 /*return*/, false];
                    }
                    (0, helpers_userInput_1.pause_screen)();
                    return [3 /*break*/, 7];
                case 3:
                    if (!(choice === "f")) return [3 /*break*/, 4];
                    running = false;
                    return [3 /*break*/, 7];
                case 4:
                    if (!(choice !== undefined)) return [3 /*break*/, 6];
                    return [4 /*yield*/, actions[choice]()];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    running = false;
                    _a.label = 7;
                case 7: return [3 /*break*/, 1];
                case 8:
                    console.log(menus_1.barrier);
                    return [2 /*return*/, true];
            }
        });
    });
}
function upload() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res = (0, read_write_1.upload_map)();
                    if (typeof (res) === "boolean")
                        return [2 /*return*/, true];
                    map = res;
                    mapID = '';
                    return [4 /*yield*/, use_map(map)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function upload_choice() {
    return __awaiter(this, void 0, void 0, function () {
        var choice, actions;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    choice = "";
                    actions = {
                        a: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, upload()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); },
                        b: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, fetchTheBuilding()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); }
                    };
                    choice = (0, helpers_userInput_1.get_user_input)(menus_1.cloud_local_choices);
                    if (!(choice === "c")) return [3 /*break*/, 1];
                    return [2 /*return*/, false];
                case 1:
                    if (!(actions[choice] !== undefined)) return [3 /*break*/, 3];
                    return [4 /*yield*/, actions[choice]()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [2 /*return*/, false];
            }
        });
    });
}
function main_menu() {
    return __awaiter(this, void 0, void 0, function () {
        var running, choice, actions, actions;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    running = true;
                    _a.label = 1;
                case 1:
                    if (!running) return [3 /*break*/, 9];
                    if (!!map) return [3 /*break*/, 5];
                    choice = (0, helpers_userInput_1.get_user_input)(menus_1.mainMenu);
                    actions = {
                        a: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, createNewBuilding()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); },
                        b: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, upload_choice()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); },
                    };
                    if (!(actions[choice] !== undefined)) return [3 /*break*/, 3];
                    return [4 /*yield*/, actions[choice]()];
                case 2:
                    running = _a.sent();
                    return [3 /*break*/, 4];
                case 3: return [2 /*return*/];
                case 4: return [3 /*break*/, 8];
                case 5:
                    choice = (0, helpers_userInput_1.get_user_input)(menus_1.alt_mainMenu);
                    actions = {
                        a: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, createNewBuilding()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); },
                        b: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, use_map(map)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); },
                        c: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, upload_choice()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); },
                    };
                    if (!(actions[choice] !== undefined)) return [3 /*break*/, 7];
                    return [4 /*yield*/, actions[choice]()];
                case 6:
                    running = _a.sent();
                    return [3 /*break*/, 8];
                case 7: return [2 /*return*/];
                case 8: return [3 /*break*/, 1];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function save_choice() {
    return __awaiter(this, void 0, void 0, function () {
        var choice, actions;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    choice = "";
                    actions = {
                        a: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, read_write_1.download_map)(map)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); },
                        b: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, saveBuildingChanges()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); }
                    };
                    choice = (0, helpers_userInput_1.get_user_input)(menus_1.save_choices);
                    if (!(choice === "c")) return [3 /*break*/, 1];
                    return [2 /*return*/, false];
                case 1:
                    if (!(actions[choice] !== undefined)) return [3 /*break*/, 3];
                    return [4 /*yield*/, actions[choice]()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3: return [2 /*return*/, false];
                case 4: return [2 /*return*/, false];
            }
        });
    });
}
//DATA BASE:
function reMap(map) {
    var newMap = (0, building_1.make_map)();
    for (var _i = 0, _a = map.nodes; _i < _a.length; _i++) {
        var node = _a[_i];
        (0, building_1.add_place)(newMap, node.name, node.floor);
    }
    var i = 0;
    while (i < map.size) {
        var name_1 = map.nodes[i].name;
        var li = map.adj[i];
        while (!(0, list_1.is_null)(li)) {
            var f = (0, list_1.head)(li);
            var name_to = map.nodes[f.to].name;
            (0, building_1.add_path)(newMap, name_1, f.type, name_to);
            li = (0, list_1.tail)(li);
        }
        i++;
    }
    return newMap;
}
/**
 * takes an id from the user and fetches the building
 * @returns boolean
 */
function fetchTheBuilding() {
    return __awaiter(this, void 0, void 0, function () {
        var user_map, building;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Enter the name of your map!!");
                    user_map = prompt("Name: ");
                    if ((0, helpers_userInput_1.quit)(user_map))
                        return [2 /*return*/, true];
                    console.log("\nFetching map '".concat(user_map, "'..."));
                    return [4 /*yield*/, (0, apiCalls_1.fetchBuilding)(user_map)];
                case 1:
                    building = _a.sent();
                    if (!building) return [3 /*break*/, 3];
                    console.log("Map fetched");
                    mapID = user_map;
                    map = reMap(building);
                    return [4 /*yield*/, use_map(map)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    console.log("\nFailed to fetch the Map, ".concat(user_map, " does not exist"));
                    (0, helpers_userInput_1.pause_screen)();
                    return [2 /*return*/, true];
            }
        });
    });
}
/**
 * If id exixts, takes the edited map and ads it as the map for the id
 * @param map the edited map
 * @returns void
 */
function saveBuildingChanges() {
    return __awaiter(this, void 0, void 0, function () {
        var save;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!mapID) return [3 /*break*/, 2];
                    return [4 /*yield*/, createNewBuilding()];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [4 /*yield*/, (0, apiCalls_1.saveTheBuilding)(mapID, map)];
                case 3:
                    save = _a.sent();
                    if (save) {
                        console.log('map saved');
                    }
                    else {
                        console.log('Failed to save');
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
/**
 * Createsa new building in the database
 * @returns boolean
 */
function createNewBuilding() {
    return __awaiter(this, void 0, void 0, function () {
        var user_map, building;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user_map = prompt("Enter name: ");
                    if ((0, helpers_userInput_1.quit)(user_map))
                        return [2 /*return*/, true];
                    console.log("\nCreating new map '".concat(user_map, "'..."));
                    return [4 /*yield*/, (0, apiCalls_1.createBuilding)(user_map, map)];
                case 1:
                    building = _a.sent();
                    if (!building) return [3 /*break*/, 3];
                    console.log("Map created and saved!");
                    mapID = user_map;
                    map = reMap(building);
                    return [4 /*yield*/, use_map(map)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    console.log("\nFailed to created map.");
                    (0, helpers_userInput_1.pause_screen)();
                    return [2 /*return*/, true];
            }
        });
    });
}
