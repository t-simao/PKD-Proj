export type Menu = {
    menu: string,
    options: Array<string>
}

export const mainMenu: Menu = {
    menu: `
    ============================
    |   Welcome To PATHLY :)   |
    |--------------------------|
    |  A) New Map              |
    |  B) Upload a Map         |
    |  C) Quit                 |
    ============================
`,
    options: ["a", "b", "c"]
};

export const mode_menu: Menu = { menu: `
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


export const your_map_menu: Menu = { menu: `
    ============================
    |         Your MAP         |
    |--------------------------|
    |  A) Add Place            |
    |  B) Add path             |
    |  C) Remove path          |
    |  D) Get Path             |
    |  E) Download Map         |
    |  F) Go Back              |
    |  q) Quit                 |
    ============================
`,
    options: ["a", "b", "c", "d", "e", "f", "q"]
};

export const pathways_menu: Menu = { menu: `
    ===================================
    |        Pathway types            |
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

export const getting_path: string = `
    ============================
    |       Getting Path       |
    ============================
`;

export const adding_place: string = `
    ============================
    |       Adding Place       |
    ============================
`;

export const adding_path: string = `
    ============================
    |       Adding Path        |
    ============================
`;

export const removing_path: string = `
    ============================
    |       Removing Path      |
    ============================
`;

export const barrier: string = "-----------------------------------------";
