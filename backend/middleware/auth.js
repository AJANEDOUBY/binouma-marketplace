// Fichier: backend/middleware/auth.js

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'votre_secret_jwt'; // Doit être la même clé secrète que dans auth.js

module.exports = function (req, res, next) {
  // Récupérer le token de l'en-tête
  const token = req.header('x-auth-token');

  // Vérifier si le token existe
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé, token manquant.' });
  }

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Ajouter l'utilisateur au payload de la requête
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide.' });
  }
};
