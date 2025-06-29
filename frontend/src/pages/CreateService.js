// Fichier: frontend/src/pages/CreateService.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const CreateService = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    budget: ''
  });
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://binouma-marketplace.onrender.com/api/services', formData, {
        headers: { 'x-auth-token': auth.token }
      });
      alert('Service créé avec succès !');
      navigate('/client-dashboard'); // Rediriger vers le tableau de bord client
    } catch (err) {
      console.error('Erreur lors de la création du service:', err.response.data.message);
      alert('Erreur: ' + err.response.data.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h2>Créer une nouvelle annonce de service</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Titre du service</label>
            <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} rows="5" required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Catégorie</label>
            <input type="text" className="form-control" id="category" name="category" value={formData.category} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="budget" className="form-label">Budget (€)</label>
            <input type="number" className="form-control" id="budget" name="budget" value={formData.budget} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Créer le service</button>
        </form>
      </div>
    </div>
  );
};

export default CreateService;
