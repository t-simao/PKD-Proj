import { Map } from "./lib/building";

const api_url = "http://127.0.0.1:9000/maps";

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