import { MongoClient, Db } from 'mongodb'
import * as dotenv from 'dotenv'
dotenv.config()
const username = process.env.USERNAME
const password = process.env.PASSWORD
const uri = `mongodb+srv://${username}:${password}@cluster0.mhxdv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);

let db: Db;

export async function connectDB(): Promise<Db> {
  if (!db) {
    await client.connect()
    const ping = await client.db("PKD-proj").command({ ping: 1})
    console.log(ping);
    db = client.db("PKD-proj");
  }

  return db;
}
