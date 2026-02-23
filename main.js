"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var building_1 = require("./lib/building");
var user_input_1 = require("./user_input");
process.stdout.write('\x1Bc'); //CLEARS THE TERMINAL LIKE CONSOLE.CLEAR()
var map = (0, building_1.make_map)();
(0, user_input_1.main_menu)(map);
console.log(map);
