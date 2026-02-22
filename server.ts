import * as dotenv from 'dotenv';
dotenv.config()

import { Map } from './lib/building';
import { make_map, add_place, add_edge } from './lib/building';
import { is_null, head, tail } from './lib/list';
import { shortest_path } from './lib/Dijkstra_Alg';
import { findMap, createMap, addPlace } from './testing';
import express, {Express, Request, Response } from 'express';


const PORT = process.env.SR_PORT || 9000

const app: Express = express()
app.use(express.json())

app.get("/maps/get/:id", async (req, res) => {
    const map = await findMap(req.params.id)

    if (!map) return res.status(404).json({error: "Not found"});

    res.json(map);
})

app.post("/maps/create/:id", async (req, res) => {
    const map = await createMap(req.params.id, make_map());

    if (!map) return res.status(404).json({error: "Failed to create"});

    res.json(map);
})


app.listen(PORT, () => {
    console.log(`${PORT}`)
})