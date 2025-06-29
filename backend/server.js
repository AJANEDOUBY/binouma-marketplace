// Fichier: backend/server.js

const express = require('express');
const cors = require('cors');
const db = require('./db');

// Importer les routes
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');
const applicationRoutes = require('./routes/applications');
const userRoutes = require('./routes/users');

// Initialiser l'application Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Pour parser le corps des requêtes en JSON

// Utiliser les routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/users', userRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('API binou.ma fonctionnelle !');
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
