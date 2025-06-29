// Fichier: backend/routes/applications.js

const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

// Postuler à un service (réservé aux prestataires)
router.post('/', authMiddleware, (req, res) => {
  const { service_id } = req.body;
  const prestataire_id = req.user.id;

  if (req.user.user_type !== 'prestataire') {
    return res.status(403).json({ message: 'Seuls les prestataires peuvent postuler.' });
  }

  const sql = 'INSERT INTO applications (service_id, prestataire_id) VALUES (?, ?)';
  db.run(sql, [service_id, prestataire_id], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la candidature.', error: err.message });
    }
    res.status(201).json({ id: this.lastID, service_id, prestataire_id, status: 'pending' });
  });
});

// Récupérer les candidatures pour un service (réservé au client propriétaire)
router.get('/service/:service_id', authMiddleware, (req, res) => {
  const { service_id } = req.params;
  const client_id = req.user.id;

  // Vérifier si l'utilisateur est le client qui a posté le service
  const sqlService = 'SELECT client_id FROM services WHERE id = ?';
  db.get(sqlService, [service_id], (err, service) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur serveur.' });
    }
    if (!service || service.client_id !== client_id) {
      return res.status(403).json({ message: 'Non autorisé à voir ces candidatures.' });
    }

    const sql = `
      SELECT a.*, u.email as prestataire_email
      FROM applications a
      JOIN users u ON a.prestataire_id = u.id
      WHERE a.service_id = ?
    `;
    db.all(sql, [service_id], (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des candidatures.' });
      }
      res.json(rows);
    });
  });
});

// Mettre à jour le statut d'une candidature (réservé au client propriétaire)
router.put('/:id', authMiddleware, (req, res) => {
  const { status } = req.body; // 'accepted' ou 'rejected'
  const { id } = req.params;
  const client_id = req.user.id;

  if (!['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Statut invalide.' });
  }

  // Vérifier que l'utilisateur est bien le client propriétaire du service lié à la candidature
  const sqlCheck = `
    SELECT s.client_id
    FROM applications a
    JOIN services s ON a.service_id = s.id
    WHERE a.id = ?
  `;
  db.get(sqlCheck, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur serveur.' });
    }
    if (!result || result.client_id !== client_id) {
      return res.status(403).json({ message: 'Non autorisé à modifier cette candidature.' });
    }

    const sqlUpdate = 'UPDATE applications SET status = ? WHERE id = ?';
    db.run(sqlUpdate, [status, id], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la mise à jour.' });
      }
      res.json({ message: `Candidature ${status} avec succès.` });
    });
  });
});

module.exports = router;
