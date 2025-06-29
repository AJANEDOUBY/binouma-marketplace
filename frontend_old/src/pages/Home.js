// Fichier: frontend/src/pages/Home.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/services');
        setServices(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur de chargement des services:', err);
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h1>Annonces de Services</h1>
      <div className="row">
        {services.map(service => (
          <div key={service.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description.substring(0, 100)}...</p>
                <p><strong>Catégorie:</strong> {service.category}</p>
                <p><strong>Budget:</strong> {service.budget} €</p>
                <Link to={`/service/${service.id}`} className="btn btn-primary">Voir Détails</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
