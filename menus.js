"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.barrier = exports.removing_path = exports.adding_path = exports.adding_place = exports.getting_path = exports.pathways_menu = exports.your_map_menu = exports.mode_menu = exports.mainMenu = void 0;
exports.mainMenu = {
    menu: "\n    ============================\n    |   Welcome To PATHLY :)   |\n    |--------------------------|\n    |  A) New Map              |\n    |  B) Upload a Map         |\n    |  C) Quit                 |\n    ============================\n",
    options: ["a", "b", "c"]
};
exports.mode_menu = { menu: "\n    =====================================\n    |               Mode                |\n    |-----------------------------------|\n    |  A) Wheelchair - (Avoid Stairs)   |\n    |  B) Quite - (Avoid Crowded Places)|\n    |  C) Cardio - (Avoid Elevators)    |\n    |  D) None                          |\n    =====================================\n",
    options: ["a", "b", "c", "d"] };
exports.your_map_menu = { menu: "\n    ============================\n    |         Your MAP         |\n    |--------------------------|\n    |  A) Add Place            |\n    |  B) Add path             |\n    |  C) Remove path          |\n    |  D) Get Path             |\n    |  E) Download Map         |\n    |  F) Go Back              |\n    |  q) Quit                 |\n    ============================\n",
    options: ["a", "b", "c", "d", "e", "f", "q"] };
exports.pathways_menu = { menu: "\n    ===================================\n    |        Pathway types            |\n    |---------------------------------|\n    |  A) Hallway_C (Crowded Hallway) |\n    |  B) Hallway_S (Small Hallway)   |\n    |  C) Hallway_L (Long Hallway)    |\n    |  D) Elevator                    |\n    |  E) Stairs                      |\n    |  F) Ramp                        |\n    |  q) Quit                        |\n    ===================================\n",
    options: ["a", "b", "c", "d", "e", "f", "q"] };
exports.getting_path = "\n    ============================\n    |       Getting Path       |\n    ============================\n";
exports.adding_place = "\n    ============================\n    |       Adding Place       |\n    ============================\n";
exports.adding_path = "\n    ============================\n    |       Adding Path        |\n    ============================\n";
exports.removing_path = "\n    ============================\n    |       Removing Path      |\n    ============================\n";
exports.barrier = "-----------------------------------------";
