"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.download_map = download_map;
exports.upload_map = upload_map;
const building_1 = require("../lib/building");
const list_1 = require("../lib/list");
const fs = __importStar(require("fs"));
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
    const nodes = map.nodes;
    const res = {
        Places: []
    };
    for (let i = 0; i < nodes.length; i = i + 1) {
        const currNode = nodes[i];
        let currNode_adj = map.adj[i];
        const curr_node_info = {
            from: currNode.name,
            floor: currNode.floor,
            paths: []
        };
        while (currNode_adj !== null) {
            const currPath = (0, list_1.head)(currNode_adj);
            const pathDst_id = currPath.to;
            const pathDst_name = (0, building_1.get_name_by_id)(map, pathDst_id);
            const path__type = currPath.type;
            const json_path = {
                to: pathDst_name,
                type: path__type
            };
            curr_node_info.paths.push(json_path);
            currNode_adj = (0, list_1.tail)(currNode_adj);
        }
        res.Places.push(curr_node_info);
    }
    const jsonData = JSON.stringify(res, null, 3);
    return jsonData;
}
function JSON_to_map(data) {
    let map = (0, building_1.make_map)();
    const places = data.Places;
    const count = places.length;
    for (let i = 0; i < count; i = i + 1) {
        const currPlace = get_place(places, i);
        const currPlace_floor = get_floor(places, i);
        (0, building_1.add_place)(map, currPlace, currPlace_floor);
    }
    for (let i = 0; i < count; i = i + 1) {
        const currPlace = get_place(places, i);
        const paths = get_paths(places, i);
        const pathCount = paths.length;
        for (let j = 0; j < pathCount; j = j + 1) {
            const dst = get_dst(paths, j);
            const pathType = get_type(paths, j);
            (0, building_1.add_path)(map, currPlace, pathType, dst);
        }
    }
    return map;
}
function download_map(map, name) {
    const jsonData = map_to_JSON(map);
    while (true) {
        try {
            fs.writeFileSync(`${name}.json`, jsonData);
            return true;
        }
        catch (_a) {
            return false;
        }
    }
}
function upload_map(name) {
    while (true) {
        try {
            const JSON_data = fs.readFileSync(`${name}.json`, "utf8");
            const new_map = JSON.parse(JSON_data);
            return JSON_to_map(new_map);
        }
        catch (_a) {
            console.log(`NO MAP CALLED ${name} WAS FOUND, PLEASE TRY AGAIN!!`);
            return;
        }
    }
}
// const m = make_map()
// add_place(m, 'james', 1);
// add_place(m, 'king', 1);
// add_place(m, 'mike', 2);
// add_place(m, 'kik', 2);
// add_place(m, 'oim', 3);
// download_map(m, "sung");
console.log(upload_map("sung"));
