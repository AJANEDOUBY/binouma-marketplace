// Fichier: frontend/src/pages/Home.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import BecomeProvider from '../components/BecomeProvider';
import ServiceCard from '../components/ServiceCard'; // Importer ServiceCard

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
    <>
      <HeroSection />
      <div className="container mt-4">
        <h2 className="mb-4">Annonces de Services</h2>
        <div className="row">
          {services.map(service => (
            <div key={service.id} className="col-md-4 mb-4">
              <ServiceCard service={service} /> {/* Utiliser ServiceCard ici */}
            </div>
          ))}
        </div>
      </div>
      <HowItWorks />
      <BecomeProvider />
    </>
  );
};

export default Home;
