import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import {open} from 'sqlite'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '..', 'database.sqlite');
export const ROLES = {ADMIN: 'ADMIN', USER: 'USER'};

const dbPromise = open({
  filename: dbPath,
  driver: sqlite3.Database
});
async function initDB(){
  try {
    const db = await dbPromise;
    await db.exec(`CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      teamName TEXT NOT NULL,
      unitName TEXT NOT NULL,
      topicName TEXT NOT NULL,
      instructor TEXT,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      fileName TEXT NOT NULL,
      filePath TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    await db.exec(`CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      refreshToken TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    const [username, password] = [process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD];
    if (!username || !password) {
      console.error("Missing ADMIN_USERNAME or ADMIN_PASSWORD in .env");
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.run(`INSERT OR IGNORE INTO users(username,password,role,createdAt) VALUES(?,?,?, datetime('now','localtime'))`, [username, hashedPassword, ROLES.ADMIN ]);
  }
  catch (err){
    console.error("Error when init DB", err.message);
  }
}

initDB();

export default dbPromise;
