// Fichier: frontend/src/pages/ClientDashboard.js

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import ServiceCard from '../components/ServiceCard';

const ClientDashboard = () => {
  const { auth } = useContext(AuthContext);
  const [clientServices, setClientServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientServices = async () => {
      if (!auth.token || !auth.user) return; // S'assurer que le token et l'utilisateur sont disponibles
      try {
        const res = await axios.get('https://binouma-marketplace.onrender.com/api/services/my-services', {
          headers: { 'x-auth-token': auth.token }
        });
        setClientServices(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur de chargement des services du client:', err);
        setLoading(false);
      }
    };

    if (auth.isAuthenticated && auth.user) {
      fetchClientServices();
    } else if (auth.isAuthenticated && !auth.user) {
      // Si l'utilisateur n'est pas encore chargé dans le contexte, le charger
      axios.get('https://binouma-marketplace.onrender.com/api/users/profile', {
        headers: { 'x-auth-token': auth.token }
      }).then(res => {
        // Mettre à jour l'objet auth dans le contexte (nécessite une fonction setAuth dans AuthContext pour être réactif)
        // Pour l'instant, nous allons juste mettre à jour l'objet directement pour que fetchClientServices puisse l'utiliser
        auth.user = res.data; 
        fetchClientServices();
      }).catch(err => console.error('Erreur de chargement du profil utilisateur:', err));
    }
  }, [auth.token, auth.isAuthenticated, auth.user]);

  if (loading) {
    return <p>Chargement du tableau de bord...</p>;
  }

  return (
    <div>
      <h2>Tableau de Bord Client</h2>
      <p>Ici, vous pouvez gérer vos annonces de services et voir les candidatures des prestataires.</p>
      <Link to="/create-service" className="btn btn-success mb-4">Créer une nouvelle annonce</Link>

      <h3 className="mt-5">Mes Annonces de Services</h3>
      {clientServices.length === 0 ? (
        <p>Vous n'avez pas encore créé d'annonces de services.</p>
      ) : (
        <div className="row">
          {clientServices.map(service => (
            <div key={service.id} className="col-md-6 mb-4">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
