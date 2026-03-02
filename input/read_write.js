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
exports.map_to_JSON = map_to_JSON;
exports.JSON_to_map = JSON_to_map;
exports.download_map = download_map;
exports.upload_map = upload_map;
var menus_1 = require("./menus");
var helpers_userInput_1 = require("./helpers_userInput");
var building_1 = require("../lib/building");
var list_1 = require("../lib/list");
var fs = require("fs");
var promptsync = require("prompt-sync");
var prompt = promptsync();
/**
 * Gets the name of the place stored at the provided index
 * @param {Array<json_node>} places the array which contains the json_node
 * @param {number} idx the index of the desired json_node
 * @returns {string} the name of the place which is stored in places at the idx'th index
 */
function get_place(places, idx) {
    return places[idx].from;
}
/**
 * Gets the floor of the place stored at the provided index
 * @param {Array<json_node>} places the array which contains the json_node
 * @param {number} idx the index of the desired json_node
 * @returns {number} the floor of the place which is stored in places at the idx'th index
 */
function get_floor(places, idx) {
    return places[idx].floor;
}
/**
 * Gets the paths array of the node stored at the provided index
 * @param {Array<json_node>} places the array which contains the json_node
 * @param {number} idx the index of the desired json_node
 * @returns {Array<json_edge>} array containing json_edges which represents
 * places which can be the reached directly from the desired json_node
 */
function get_paths(places, idx) {
    return places[idx].paths;
}
/**
 * Gets the to value of the json_edge stored at the provided index of json_edges
 * @param {Array<json_edge>} paths the array which contains the json_edges
 * @param {number} idx the index of the desired json_edge
 * @returns {string} the name of the destination place which is stored at the idx'th index
 */
function get_dst(paths, idx) {
    return paths[idx].to;
}
/**
 * Gets the type value of the json_edge stored at the provided index of json_edges
 * @param {Array<json_edge>} paths the array which contains the json_edges
 * @param {number} idx the index of the desired json_edge
 * @returns {string} the Pathway_type of the json_edge stored at the idx'th index
 */
function get_type(paths, idx) {
    return paths[idx].type;
}
/**
 * Given a map of type Map, it remakes the map to an equivalent but simpler formatted map
 * and later converts it into a JSON string
 * @param {Map} map the map which will be converted into a JSON string
 * @returns {string} the map converted into a JSON string
 */
function map_to_JSON(map) {
    var nodes = map.nodes;
    var res = {
        Places: []
    };
    for (var i = 0; i < nodes.length; i = i + 1) {
        var currNode = nodes[i];
        var currNode_adj = map.adj[i];
        var curr_node_info = {
            from: currNode.name,
            floor: currNode.floor,
            paths: []
        };
        while (currNode_adj !== null) {
            var currPath = (0, list_1.head)(currNode_adj);
            var pathDst_id = currPath.to;
            var pathDst_name = (0, building_1.get_name_by_id)(map, pathDst_id);
            var path__type = currPath.type;
            var json_edge = {
                to: pathDst_name,
                type: path__type
            };
            curr_node_info.paths.push(json_edge);
            currNode_adj = (0, list_1.tail)(currNode_adj);
        }
        res.Places.push(curr_node_info);
    }
    var jsonData = JSON.stringify(res, null, 3);
    return jsonData;
}
/**
 * Given a map of type json_map, it remakes the map to an equivalent map which satisfies the Map type
 * @param {json_map} data the map which will be converted
 * @returns {Map} the converted map
 */
function JSON_to_map(data) {
    var map = (0, building_1.make_map)();
    var places = data.Places;
    var count = places.length;
    for (var i = 0; i < count; i = i + 1) {
        var currPlace = get_place(places, i);
        var currPlace_floor = get_floor(places, i);
        (0, building_1.add_place)(map, currPlace, currPlace_floor);
    }
    for (var i = 0; i < count; i = i + 1) {
        var currPlace = get_place(places, i);
        var paths = get_paths(places, i);
        var pathCount = paths.length;
        for (var j = 0; j < pathCount; j = j + 1) {
            var dst = get_dst(paths, j);
            var pathType = get_type(paths, j);
            (0, building_1.add_path)(map, currPlace, pathType, dst);
        }
    }
    return map;
}
/**
 * Prompts the user to enter the name of the file which will be downloaded on their device
 * containing the map provided converting it to a json_map and writen the JSON file
 * locally using fs.writeFileSync
 * @param {Map} map the map which will be downloaded
 * @returns {false} if the user quits or after a successful download
 */
function download_map(map) {
    return __awaiter(this, void 0, void 0, function () {
        var jsonData, name_1;
        return __generator(this, function (_a) {
            jsonData = map_to_JSON(map);
            console.log();
            (0, helpers_userInput_1.banner)(menus_1.downloading_map);
            console.log("What do you want to name your file?");
            while (true) {
                name_1 = prompt("NAME: ");
                if ((0, helpers_userInput_1.quit)(name_1))
                    return [2 /*return*/, false];
                try {
                    fs.writeFileSync("".concat(name_1, ".json"), jsonData);
                    console.log(menus_1.barrier);
                    console.log("MAP SAVED!!");
                    console.log(menus_1.barrier);
                    return [2 /*return*/, false];
                }
                catch (_b) {
                    console.log("TRY AGAIN!!");
                    console.log("");
                }
            }
            return [2 /*return*/];
        });
    });
}
/**
 * Prompts the user to enter the name of the file, which will be loaded locally using fs.readFileSync
 * containing a map in json_map type which will be converted to a new equivalent map which satisfies the Map type
 * @returns {Map | boolean} converted map if the file was successfully uploaded,
 * otherwise false if the user quits
 */
function upload_map() {
    while (true) {
        console.log();
        (0, helpers_userInput_1.banner)(menus_1.uploading_map);
        console.log("Enter the name of your map!!");
        var name_2 = prompt("NAME: ");
        if ((0, helpers_userInput_1.quit)(name_2))
            return false;
        try {
            var JSON_data = fs.readFileSync("".concat(name_2, ".json"), "utf8");
            var new_map = JSON.parse(JSON_data);
            console.log();
            (0, helpers_userInput_1.banner)(menus_1.uploading_map);
            console.log("MAP UPLOADED!!");
            (0, helpers_userInput_1.pause_screen)();
            return JSON_to_map(new_map);
        }
        catch (_a) {
            console.log("NO MAP CALLED ".concat(name_2, " WAS FOUND, PLEASE TRY AGAIN!!"));
            (0, helpers_userInput_1.pause_screen)();
        }
    }
}
