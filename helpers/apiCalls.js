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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchBuilding = fetchBuilding;
exports.createBuilding = createBuilding;
exports.saveTheBuilding = saveTheBuilding;
// Server url
const api_url = "https://server-alpha-coral-83.vercel.app/maps";
/**
 * Fetches a building from the database
 * @param id the building id
 * @returns the fetched building or null
 */
function fetchBuilding(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(`${api_url}/get/${id}`);
            if (!res.ok)
                return null;
            const data = yield res.json();
            return data.map;
        }
        catch (e) {
            return null;
        }
    });
}
/**
 * Cretes a building in the database
 * @param id the building id
 * @returns the created building or null
 */
function createBuilding(id, map) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(`${api_url}/create/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'Application/json' },
                body: JSON.stringify({ map })
            });
            if (!res.ok)
                return null;
            const data = yield res.json();
            return data.map;
        }
        catch (e) {
            return null;
        }
    });
}
/**
 * Saves a building in the database
 * @param id building id
 * @param map the new map of the building
 * @returns boolean
 */
function saveTheBuilding(id, map) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(`${api_url}/update/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'Application/json' },
                body: JSON.stringify({ map })
            });
            return res.ok;
        }
        catch (e) {
            return false;
        }
    });
}
