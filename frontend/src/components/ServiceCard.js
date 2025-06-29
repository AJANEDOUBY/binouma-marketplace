// Fichier: frontend/src/components/ServiceCard.js

import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{service.title}</h5>
        <p className="card-text flex-grow-1">{service.description.substring(0, 100)}...</p>
        <p className="mb-1"><strong>Catégorie:</strong> {service.category}</p>
        <p className="mb-3"><strong>Budget:</strong> {service.budget} €</p>
        <Link to={`/service/${service.id}`} className="btn btn-primary mt-auto">Voir Détails</Link>
      </div>
    </div>
  );
};

export default ServiceCard;
