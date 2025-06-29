// Fichier: frontend/src/pages/ServiceDetail.js

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const ServiceDetail = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const [service, setService] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/services/${id}`);
        setService(res.data);
        // Si l'utilisateur est le client propriétaire, charger les candidatures
        // Cette logique doit être affinée pour obtenir le user_id de l'auth context
        setLoading(false);
      } catch (err) {
        console.error('Erreur de chargement du service:', err);
        setLoading(false);
      }
    };
    fetchService();
  }, [id, auth]);

  const handleApply = async () => {
    try {
      await axios.post('https://binouma-marketplace.onrender.com/api/applications', { service_id: id }, {
        headers: { 'x-auth-token': auth.token }
      });
      alert('Candidature envoyée !');
    } catch (err) {
      console.error('Erreur lors de la candidature:', err.response.data.message);
      alert('Erreur: ' + err.response.data.message);
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!service) {
    return <p>Service non trouvé.</p>;
  }

  return (
    <div>
      <h2>{service.title}</h2>
      <p>{service.description}</p>
      <p><strong>Catégorie:</strong> {service.category}</p>
      <p><strong>Budget:</strong> {service.budget} €</p>
      <p><strong>Statut:</strong> {service.status}</p>

      {/* Logique d'affichage conditionnelle à améliorer avec le type d'utilisateur */}
      {auth.isAuthenticated && (
        <button onClick={handleApply} className="btn btn-success">Postuler</button>
      )}

      {/* Afficher les candidatures si l'utilisateur est le propriétaire */}
    </div>
  );
};

export default ServiceDetail;
