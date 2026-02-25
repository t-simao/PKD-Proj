"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.barrier = exports.path_banner = exports.uploading_map = exports.downloading_map = exports.removing_path = exports.adding_path = exports.adding_place = exports.getting_path = exports.save_choices = exports.uploading_choices = exports.pathways_menu = exports.your_map_menu = exports.mode_menu = exports.alt_mainMenu = exports.mainMenu = void 0;
exports.mainMenu = {
    menu: `
    ============================
    |   Welcome To PATHLY :)   |
    |--------------------------|
    |  A) New Map              |
    |  B) Upload a Map         |
    |  q) Quit                 |
    ============================
`,
    options: ["a", "b", "q"]
};
exports.alt_mainMenu = {
    menu: `
    ============================
    |   Welcome To PATHLY :)   |
    |--------------------------|
    |  A) New Map              |
    |  B) Countinue            |
    |  C) Upload a Map         |
    |  q) Quit                 |
    ============================
`,
    options: ["a", "b", "c", "q"]
};
exports.mode_menu = { menu: `
    =====================================
    |               Mode                |
    |-----------------------------------|
    |  A) Wheelchair - (Avoid Stairs)   |
    |  B) Quite - (Avoid Crowded Places)|
    |  C) Cardio - (Avoid Elevators)    |
    |  D) None                          |
    =====================================
`,
    options: ["a", "b", "c", "d"]
};
exports.your_map_menu = { menu: `
    ============================
    |         Your MAP         |
    |--------------------------|
    |  A) Add Place            |
    |  B) Add path             |
    |  C) Remove path          |
    |  D) Get Path             |
    |  E) save map             |
    |  G) go back              |
    |  q) Quit                 |
    ============================
`,
    options: ["a", "b", "c", "d", "e", "f", "g", "q"]
};
exports.pathways_menu = { menu: `
    ===================================
    |         Pathway types           |
    |---------------------------------|
    |  A) Hallway_C (Crowded Hallway) |
    |  B) Hallway_S (Small Hallway)   |
    |  C) Hallway_L (Long Hallway)    |
    |  D) Elevator                    |
    |  E) Stairs                      |
    |  F) Ramp                        |
    |  q) Quit                        |
    ===================================
`,
    options: ["a", "b", "c", "d", "e", "f", "q"]
};
exports.uploading_choices = { menu: `
    ===================================
    |           Uploading             |
    |---------------------------------|
    |  A) My Files                    |
    |  B) Cloud                       |
    |  C) Back                        |
    |  q) Quit                        |
    ===================================
`,
    options: ["a", "b", "c", "q"]
};
exports.save_choices = { menu: `
    ===================================
    |          Save/Download          |
    |---------------------------------|
    |  A) Save in the cloud           |
    |  B) Download locally            |
    |  C) Back                        |
    |  q) Quit                        |
    ===================================
`,
    options: ["a", "b", "c", "q"]
};
exports.getting_path = `
    ============================
    |       Getting Path       |
    ============================
`;
exports.adding_place = `
    ============================
    |       Adding Place       |
    ============================
`;
exports.adding_path = `
    ============================
    |       Adding Path        |
    ============================
`;
exports.removing_path = `
    ============================
    |      Removing Path       |
    ============================
`;
exports.downloading_map = `
    ============================
    |     Downloading Map      |
    ============================
`;
exports.uploading_map = `
    ============================
    |      Uploading Map       |
    ============================
`;
exports.path_banner = `
    ============================
    |        Your Path         |
    ============================
`;
exports.barrier = "-----------------------------------------";
