import {fetchBuilding, createBuilding, saveTheBuilding} from '../input/apiCalls'
import { make_map, Map } from '../lib/building';

global.fetch = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

test('Case: Fetching data ', async () => {
    const map = {
        places: { keys: ["A", "B", "C"], values: [1, 2, 3], entries: 3 },
        nodes: ["A", "B", "C"],
        adj: [ [0, 1, 0], [1, 0, 1], [0, 1, 0] ],
        size: 3
    };

    (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
            _id: "james",
            map: map
        })
    });

    const res = await fetchBuilding("james");

    expect(fetch).toHaveBeenCalledWith(
        "https://server-alpha-coral-83.vercel.app/maps/get/james"
    );

    expect(res).toEqual(map);
})

test('Case: Fail fetch ', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
    });

    const res = await fetchBuilding("james")

    expect(fetch).toHaveBeenCalledWith(
        "https://server-alpha-coral-83.vercel.app/maps/get/james"
    );

    expect(res).toBe(null);

})


test('Case: Creating a building', async() => {
    const map = make_map()
    const fejk = {
        places: { keys: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
            values: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
            entries: 0 },
        nodes: [],
        adj: [],
        size: 0
    };

    (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
            _id: "james",
            map: fejk
        })
    })

    const res = await createBuilding('james', map)

    expect(fetch).toHaveBeenCalledWith(
        "https://server-alpha-coral-83.vercel.app/maps/create/james", {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ map })
        }
    )

    expect(res).toEqual(fejk)
})

test('Case: Fail Create ', async () => {
    const map = make_map();

    (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
    });

    const res = await createBuilding('james', map)

    expect(fetch).toHaveBeenCalledWith(
        "https://server-alpha-coral-83.vercel.app/maps/create/james", {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ map })
        }
    );

    expect(res).toBe(null);

})

test('Case: Updating building', async() => {
    const map: Map = make_map();

    (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
    })

    const res = await saveTheBuilding('james', map)

    expect(fetch).toHaveBeenCalledWith(
    "https://server-alpha-coral-83.vercel.app/maps/update/james", {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ map })
        }
    )

    expect(res).toBe(true)
})

test('Case: Fail Update ', async () => {
    const map = make_map();

    (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
    });

    const res = await saveTheBuilding('james', map)

    expect(fetch).toHaveBeenCalledWith(
        "https://server-alpha-coral-83.vercel.app/maps/update/james", {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ map })
        }
    );

    expect(res).toBe(false);

})




