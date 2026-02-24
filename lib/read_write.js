"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.download_map = download_map;
exports.upload_map = upload_map;
var menus_1 = require("../menus");
var user_input_1 = require("../user_input");
var building_1 = require("./building");
var list_1 = require("./list");
var fs = require("fs");
var promptsync = require("prompt-sync");
var prompt = promptsync();
function get_place(places, idx) {
    return places[idx].from;
}
function get_floor(places, idx) {
    return places[idx].floor;
}
function get_paths(places, idx) {
    return places[idx].paths;
}
function get_dst(paths, idx) {
    return paths[idx].to;
}
function get_type(paths, idx) {
    return paths[idx].type;
}
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
            var json_path = {
                to: pathDst_name,
                type: path__type
            };
            curr_node_info.paths.push(json_path);
            currNode_adj = (0, list_1.tail)(currNode_adj);
        }
        res.Places.push(curr_node_info);
    }
    var jsonData = JSON.stringify(res, null, 3);
    return jsonData;
}
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
function download_map(map) {
    var jsonData = map_to_JSON(map);
    console.log();
    (0, user_input_1.banner)(menus_1.downloading_map);
    console.log("What do you want to name your file?");
    while (true) {
        var name_1 = prompt("NAME: ");
        if ((0, user_input_1.quit)(name_1))
            return false;
        try {
            fs.writeFileSync("".concat(name_1, ".json"), jsonData);
            console.log(menus_1.barrier);
            console.log("MAP SAVED!!");
            console.log(menus_1.barrier);
            return true;
        }
        catch (_a) {
            console.log("TRY AGAIN!!");
            console.log("");
        }
    }
}
function upload_map() {
    while (true) {
        console.log();
        (0, user_input_1.banner)(menus_1.uploading_map);
        console.log("Enter the name of your map!!");
        var name_2 = prompt("NAME: ");
        if ((0, user_input_1.quit)(name_2))
            return false;
        try {
            var JSON_data = fs.readFileSync("".concat(name_2, ".json"), "utf8");
            var map = JSON.parse(JSON_data);
            console.log();
            console.log((0, user_input_1.banner)(menus_1.uploading_map));
            console.log("MAP UPLOADED!!");
            (0, user_input_1.pause_screen)();
            return JSON_to_map(map);
        }
        catch (_a) {
            console.log("NO MAP CALLED ".concat(name_2, " WAS FOUND, PLEASE TRY AGAIN!!"));
            (0, user_input_1.pause_screen)();
        }
    }
}
