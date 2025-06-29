// Fichier: backend/routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

const JWT_SECRET = 'votre_secret_jwt'; // Remplacez par une clé secrète forte

// Inscription d'un nouvel utilisateur
router.post('/register', (req, res) => {
  const { email, password, user_type } = req.body;

  if (!email || !password || !user_type) {
    return res.status(400).json({ message: 'Veuillez fournir email, mot de passe et type d'utilisateur.' });
  }

  // Hachage du mot de passe
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const sql = 'INSERT INTO users (email, password, user_type) VALUES (?, ?, ?)';
  db.run(sql, [email, hashedPassword, user_type], function (err) {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de l'inscription.", error: err.message });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: this.lastID, user_type }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  });
});

// Connexion d'un utilisateur
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Veuillez fournir email et mot de passe.' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.get(sql, [email], (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
    }
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Vérifier le mot de passe
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: user.id, user_type: user.user_type }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

module.exports = router;
