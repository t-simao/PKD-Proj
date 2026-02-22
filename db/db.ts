import { MongoClient, Db } from 'mongodb'
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

console.log(username, password);


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

// connectDB()
