
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('./db.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    userType TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clientId INTEGER,
    title TEXT,
    description TEXT,
    category TEXT,
    budget REAL,
    FOREIGN KEY (clientId) REFERENCES users (id)
  )`);
});

// Basic route
app.get('/', (req, res) => {
  res.send('Backend for binou.ma is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
