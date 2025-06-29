// Fichier: backend/routes/users.js

const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

// Récupérer le profil de l'utilisateur connecté
router.get('/profile', authMiddleware, (req, res) => {
  const sql = 'SELECT id, email, user_type, created_at FROM users WHERE id = ?';
  db.get(sql, [req.user.id], (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
    }
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    res.json(user);
  });
});

// Mettre à jour le profil de l'utilisateur connecté
router.put('/profile', authMiddleware, (req, res) => {
  const { email, user_type } = req.body;
  const userId = req.user.id;

  if (!email || !user_type) {
    return res.status(400).json({ message: 'Veuillez fournir email et type d\'utilisateur.' });
  }

  const sql = 'UPDATE users SET email = ?, user_type = ? WHERE id = ?';
  db.run(sql, [email, user_type, userId], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la mise à jour.', error: err.message });
    }
    res.json({ message: 'Profil mis à jour avec succès.' });
  });
});

module.exports = router;
