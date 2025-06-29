// Fichier: frontend/src/components/HeroSection.js

import React from 'react';

const HeroSection = () => {
  return (
    <section className="jumbotron text-center bg-light p-5 mb-4">
      <div className="container">
        <h1 className="jumbotron-heading">Trouvez le service qu'il vous faut, près de chez vous.</h1>
        <p className="lead text-muted">Des milliers de prestataires qualifiés prêts à vous aider.</p>
        <div className="input-group mt-4">
          <input type="text" className="form-control form-control-lg" placeholder="Rechercher un service..." />
          <button className="btn btn-primary btn-lg">Rechercher</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
