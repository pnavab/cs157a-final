import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db = null;

export async function GET(req) {
  const id = req.url.slice(req.url.lastIndexOf('/') + 1);
  if (!db) {
    db = await open({
      filename: "./collection.db",
      driver: sqlite3.Database,
    });
  }
  try {
    const items = await db.all(`SELECT * FROM comment WHERE post_id = ${id}`);
    return Response.json(items);
  } catch (err) {
    return Response.json({ error: `Error finding comment ${id}`})
  }

}