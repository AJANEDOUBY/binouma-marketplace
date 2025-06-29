// Fichier: frontend/src/components/HowItWorks.js

import React from 'react';

const HowItWorks = () => {
  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">Comment ça marche ?</h2>
      <div className="row text-center">
        <div className="col-md-4">
          <div className="card p-4 mb-3">
            <div className="card-body">
              <h5 className="card-title">1. Décrivez votre besoin</h5>
              <p className="card-text">Postez une annonce détaillée pour le service que vous recherchez.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-4 mb-3">
            <div className="card-body">
              <h5 className="card-title">2. Recevez des offres</h5>
              <p className="card-text">Les prestataires intéressés vous envoient leurs propositions.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-4 mb-3">
            <div className="card-body">
              <h5 className="card-title">3. Choisissez votre prestataire</h5>
              <p className="card-text">Sélectionnez le prestataire qui correspond le mieux à vos attentes.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
