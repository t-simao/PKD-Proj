"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphs_1 = require("./lib/graphs");
const globals_1 = require("@jest/globals");
(0, globals_1.describe)("Simple floor creation testing", () => {
    (0, globals_1.test)("Create empty floor", () => {
        const eFloor = (0, graphs_1.wg_new)(0);
        (0, globals_1.expect)(eFloor.adj.length).toBe(0);
    });
});
//# sourceMappingURL=floor.test.js.map