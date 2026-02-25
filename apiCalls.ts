import { Map } from "./lib/building";

// Server url
const api_url = "https://server-alpha-coral-83.vercel.app/maps";


/**
 * Fetches a building from the database 
 * @param id the building id
 * @returns the fetched building or null
 */
export async function fetchBuilding(id: string): Promise<Map | null> {
    try {
        const res = await fetch(`${api_url}/get/${id}`)
        if (!res.ok) return null;
        const data = await res.json();

        return data.map
    } catch (e) { 
        return null
    }
}

/**
 * Cretes a building in the database
 * @param id the building id
 * @returns the created building or null
 */
export async function createBuilding(id: string): Promise<Map | null> {
    try {
        const res = await fetch(`${api_url}/create/${id}`, {method: 'POST'})
        if (!res.ok) return null;
        const data = await res.json();

        return data.map
    } catch (e) { 
        return null
    }
}

/**
 * Saves a building in the database
 * @param id building id
 * @param map the new map of the building
 * @returns boolean
 */
export async function saveTheBuilding(id: string, map: Map): Promise<boolean> {
    try {
        const res = await fetch(`${api_url}/update/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ map })
        })
        return res.ok
    } catch (e) { return false }
}