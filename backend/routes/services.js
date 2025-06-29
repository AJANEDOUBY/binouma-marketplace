// Fichier: backend/routes/services.js

const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

// Créer une nouvelle annonce de service (protégé)
router.post('/', authMiddleware, (req, res) => {
  const { title, description, category, budget } = req.body;
  const client_id = req.user.id;

  if (req.user.user_type !== 'client') {
    return res.status(403).json({ message: 'Accès refusé. Seuls les clients peuvent poster des services.' });
  }

  const sql = 'INSERT INTO services (client_id, title, description, category, budget) VALUES (?, ?, ?, ?, ?)';
  db.run(sql, [client_id, title, description, category, budget], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la création du service.', error: err.message });
    }
    res.status(201).json({ id: this.lastID, ...req.body });
  });
});

// Récupérer toutes les annonces de services (public)
router.get('/', (req, res) => {
  const { category, search } = req.query;
  let sql = 'SELECT * FROM services WHERE status = \'open\'';
  const params = [];

  if (category) {
    sql += ' AND category = ?';
    params.push(category);
  }

  if (search) {
    sql += ' AND (title LIKE ? OR description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la récupération des services.', error: err.message });
    }
    res.json(rows);
  });
});

// Récupérer un service par ID (public)
router.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM services WHERE id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Service non trouvé.' });
    }
    res.json(row);
  });
});

// Récupérer les services créés par l'utilisateur connecté (client)
router.get('/my-services', authMiddleware, (req, res) => {
  const client_id = req.user.id;

  if (req.user.user_type !== 'client') {
    return res.status(403).json({ message: 'Accès refusé. Seuls les clients peuvent voir leurs services.' });
  }

  const sql = 'SELECT * FROM services WHERE client_id = ?';
  db.all(sql, [client_id], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la récupération de vos services.', error: err.message });
    }
    res.json(rows);
  });
});

// Mettre à jour une annonce de service (protégé)
router.put('/:id', authMiddleware, (req, res) => {
  const { title, description, category, budget, status } = req.body;
  const client_id = req.user.id;

  const sqlSelect = 'SELECT * FROM services WHERE id = ? AND client_id = ?';
  db.get(sqlSelect, [req.params.id, client_id], (err, service) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur serveur.' });
    }
    if (!service) {
      return res.status(404).json({ message: 'Service non trouvé ou non autorisé.' });
    }

    const sqlUpdate = 'UPDATE services SET title = ?, description = ?, category = ?, budget = ?, status = ? WHERE id = ?';
    db.run(sqlUpdate, [title, description, category, budget, status, req.params.id], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la mise à jour.' });
      }
      res.json({ message: 'Service mis à jour avec succès.' });
    });
  });
});

// Supprimer une annonce de service (protégé)
router.delete('/:id', authMiddleware, (req, res) => {
  const client_id = req.user.id;

  const sqlSelect = 'SELECT * FROM services WHERE id = ? AND client_id = ?';
  db.get(sqlSelect, [req.params.id, client_id], (err, service) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur serveur.' });
    }
    if (!service) {
      return res.status(404).json({ message: 'Service non trouvé ou non autorisé.' });
    }

    const sqlDelete = 'DELETE FROM services WHERE id = ?';
    db.run(sqlDelete, [req.params.id], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la suppression.' });
      }
      res.json({ message: 'Service supprimé avec succès.' });
    });
  });
});

module.exports = router;