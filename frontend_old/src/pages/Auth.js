// Fichier: frontend/src/pages/Auth.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', user_type: 'client' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
    try {
      const res = await axios.post(url, formData);
      login(res.data.token);
      navigate('/'); // Rediriger vers l'accueil après connexion/inscription
    } catch (err) {
      console.error('Erreur d\'authentification:', err.response.data.message);
      // Afficher une alerte à l'utilisateur ici
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input type="password" name="password" className="form-control" onChange={handleChange} required />
          </div>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Je suis un...</label>
              <select name="user_type" className="form-select" onChange={handleChange}>
                <option value="client">Client</option>
                <option value="prestataire">Prestataire</option>
              </select>
            </div>
          )}
          <button type="submit" className="btn btn-primary">{isLogin ? 'Se connecter' : 'S\'inscrire'}</button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className="btn btn-link mt-3">
          {isLogin ? 'Pas de compte ? Inscrivez-vous' : 'Déjà un compte ? Connectez-vous'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
