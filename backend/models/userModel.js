import dbPromise from "./db.js";

// Create table if not exists
export async function initUserTable() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
    );
  `);
}

// Add user
export async function createUser(name, email, hashedPassword) {
  const db = await dbPromise;
  const result = await db.run(
    `INSERT INTO 
      users (name, email, password) 
    VALUES (?, ?, ?)`,
    [name, email, hashedPassword]
  );
  return result.lastID;
}

// Get user by email
export async function getUserByEmail(email) {
  const db = await dbPromise;
  return db.get(`SELECT * FROM users WHERE email = ?`, [email]);
}

/*
  gender TEXT,
  dateOfBirth DATE,
  address TEXT,
  joined DEFAULT CURRENT_TIMESTAMP,
  profileImage TEXT,
  bloodGroup TEXT,
  role TEXT DEFAULT 'user'

  gender, dateOfBirth, address, joined, profileImage, bloodGroup, role
  ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?
  null, null, null, null, null, 'user'
*/