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
exports.map = void 0;
exports.createMap = createMap;
exports.findMap = findMap;
exports.UpdateMap = UpdateMap;
exports.addPlace = addPlace;
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var db_1 = require("./db/db");
var building_1 = require("./lib/building");
var list_1 = require("./lib/list");
var Dijkstra_Alg_1 = require("./lib/Dijkstra_Alg");
exports.map = (0, building_1.make_map)();
// ---------- FLOOR 1 ----------
(0, building_1.add_place)(exports.map, "Entrance", 1); //0
(0, building_1.add_place)(exports.map, "Reception", 1); //1
(0, building_1.add_place)(exports.map, "Library", 1); //2
(0, building_1.add_place)(exports.map, "Café", 1); //3
(0, building_1.add_place)(exports.map, "HallA", 1); //4
(0, building_1.add_place)(exports.map, "Stairs1", 1); //5
(0, building_1.add_place)(exports.map, "Elevator1", 1); //6
// ---------- FLOOR 2 ----------
(0, building_1.add_place)(exports.map, "HallB", 2); //7
(0, building_1.add_place)(exports.map, "ComputerLab", 2); //8
(0, building_1.add_place)(exports.map, "StudyRoom", 2); //9
(0, building_1.add_place)(exports.map, "Lounge", 2); //10
(0, building_1.add_place)(exports.map, "Stairs2", 2); //11
(0, building_1.add_place)(exports.map, "Elevator2", 2); //12
// ---------- FLOOR 3 ----------
(0, building_1.add_place)(exports.map, "HallC", 3); //13
(0, building_1.add_place)(exports.map, "OfficeA", 3); //14
(0, building_1.add_place)(exports.map, "OfficeB", 3); //15
(0, building_1.add_place)(exports.map, "ConferenceRoom", 3); //16
(0, building_1.add_place)(exports.map, "Stairs3", 3); //17
(0, building_1.add_place)(exports.map, "Elevator3", 3); //18
(0, building_1.add_edge)(exports.map, "Entrance", "Hallway_S", "Reception");
(0, building_1.add_edge)(exports.map, "Reception", "Hallway_L", "HallA");
(0, building_1.add_edge)(exports.map, "HallA", "Hallway_S", "Library");
(0, building_1.add_edge)(exports.map, "HallA", "Hallway_L", "Café");
(0, building_1.add_edge)(exports.map, "HallA", "Hallway_L", "Stairs1");
(0, building_1.add_edge)(exports.map, "HallA", "Hallway_S", "Elevator1");
(0, building_1.add_edge)(exports.map, "HallB", "Hallway_L", "ComputerLab");
(0, building_1.add_edge)(exports.map, "HallB", "Hallway_S", "StudyRoom");
(0, building_1.add_edge)(exports.map, "HallB", "Hallway_L", "Lounge");
(0, building_1.add_edge)(exports.map, "HallC", "Hallway_S", "OfficeA");
(0, building_1.add_edge)(exports.map, "HallC", "Hallway_L", "OfficeB");
(0, building_1.add_edge)(exports.map, "HallC", "Hallway_L", "ConferenceRoom");
(0, building_1.add_edge)(exports.map, "HallC", "Hallway_L", "Elevator3");
(0, building_1.add_edge)(exports.map, "Stairs1", "Stairs", "Stairs2");
(0, building_1.add_edge)(exports.map, "Stairs2", "Stairs", "Stairs3");
(0, building_1.add_edge)(exports.map, "Elevator1", "Elevator", "Elevator2");
(0, building_1.add_edge)(exports.map, "Elevator2", "Elevator", "Elevator3");
(0, building_1.add_edge)(exports.map, "Stairs2", "Hallway_L", "HallB");
(0, building_1.add_edge)(exports.map, "Elevator2", "Hallway_L", "HallB");
(0, building_1.add_edge)(exports.map, "Stairs3", "Hallway_S", "HallC");
// shortest_path(map, "Entrance", "ConferenceRoom")
// console.log("---------------------------------------s")
function createMap(id, map) {
    return __awaiter(this, void 0, void 0, function () {
        var db, maps, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, db_1.connectDB)()];
                case 1:
                    db = _a.sent();
                    maps = db.collection("maps");
                    return [4 /*yield*/, maps.insertOne({
                            _id: id,
                            map: map
                        })];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
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
            (0, building_1.add_edge)(newMap, name_1, f.type, name_to);
            li = (0, list_1.tail)(li);
        }
        i++;
    }
    return newMap;
}
function findMap(id) {
    return __awaiter(this, void 0, void 0, function () {
        var db, maps, res, newMap;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, db_1.connectDB)()];
                case 1:
                    db = _a.sent();
                    maps = db.collection("maps");
                    return [4 /*yield*/, maps.findOne({ _id: id, })];
                case 2:
                    res = _a.sent();
                    if (!res || res.map === undefined)
                        return [2 /*return*/];
                    newMap = reMap(res.map);
                    return [2 /*return*/, { _id: res._id, map: newMap }];
            }
        });
    });
}
function UpdateMap(id, map) {
    return __awaiter(this, void 0, void 0, function () {
        var db, maps;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, db_1.connectDB)()];
                case 1:
                    db = _a.sent();
                    maps = db.collection("maps");
                    return [4 /*yield*/, maps.updateOne({ _id: id }, { $set: { map: map } })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function addPlace(id, name, floor) {
    return __awaiter(this, void 0, void 0, function () {
        var db, maps, map;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, db_1.connectDB)()];
                case 1:
                    db = _a.sent();
                    maps = db.collection("maps");
                    return [4 /*yield*/, findMap(id)];
                case 2:
                    map = _a.sent();
                    if (!map)
                        return [2 /*return*/];
                    (0, building_1.add_place)(map.map, name, floor);
                    return [4 /*yield*/, maps.updateOne({ _id: id }, { $set: { map: map.map } })];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
addPlace('building 2', 'megaChurch', 99);
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var b;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findMap("Building 1")];
                case 1:
                    b = _a.sent();
                    if (b === null || b === undefined)
                        return [2 /*return*/];
                    (0, Dijkstra_Alg_1.shortest_path)(b.map, "Entrance", "ConferenceRoom");
                    return [2 /*return*/];
            }
        });
    });
}
// main()
//db.users.findOne({ name: “Arafat” })
//db.maps.updateOne({ _id: "Arafat" }, { $set: { map: map } })
/**
 * fetch building
 * building_id = adwad
 * let building = findbyid(building_id)
 * ad_eddge(building)
 *
 * updateone(building, map: building)
 */
// createMap(map);
