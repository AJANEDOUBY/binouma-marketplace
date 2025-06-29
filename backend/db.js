// Fichier: backend/db.js

const sqlite3 = require('sqlite3').verbose();

// Se connecter à la base de données (crée le fichier s'il n'existe pas)
const db = new sqlite3.Database('./db.sqlite', (err) => {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données:', err.message);
  } else {
    console.log('Connecté à la base de données SQLite.');
    // Appeler la fonction pour créer les tables
    createTables();
  }
});

// Fonction pour créer les tables
const createTables = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      user_type TEXT CHECK(user_type IN ('client', 'prestataire')) NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      budget REAL,
      status TEXT CHECK(status IN ('open', 'closed')) DEFAULT 'open',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES users (id)
    );

    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      service_id INTEGER NOT NULL,
      prestataire_id INTEGER NOT NULL,
      status TEXT CHECK(status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
      applied_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (service_id) REFERENCES services (id),
      FOREIGN KEY (prestataire_id) REFERENCES users (id)
    );
  `;

  db.exec(sql, (err) => {
    if (err) {
      console.error('Erreur lors de la création des tables:', err.message);
    } else {
      console.log('Tables créées ou déjà existantes.');
    }
  });
};

module.exports = db;
