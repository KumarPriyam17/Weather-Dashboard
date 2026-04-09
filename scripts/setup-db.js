const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../weather.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

    // Favorites table
    db.run(`CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    city_name TEXT,
    latitude REAL,
    longitude REAL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

    console.log('Database initialized at ' + dbPath);
});

db.close();
