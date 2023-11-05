import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db = null;

//Get all users
export async function GET() {
  if (!db) {
    db = await open({
      filename: "./collection.db",
      driver: sqlite3.Database,
    });
  }
  const items = await db.all("SELECT * FROM user");

  return Response.json(items);
}

export async function POST(req) {
  const { username, password, fullname } = await req.json();
  if (!db) {
    db = await open ({
      filename: "./collection.db",
      driver: sqlite3.Database,
    });
  }
  
  try {
    const insertSql = `INSERT INTO user(username, fullname, password) VALUES("${username}", "${fullname}", "${password}")`;
    db.run(insertSql);
    return Response.json({ message: "User added successfully" });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Error adding user" });
  }
}