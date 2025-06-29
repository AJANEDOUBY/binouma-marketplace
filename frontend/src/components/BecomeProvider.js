// Fichier: frontend/src/components/BecomeProvider.js

import React from 'react';
import { Link } from 'react-router-dom';

const BecomeProvider = () => {
  return (
    <section className="bg-success text-white text-center p-5 my-5">
      <div className="container">
        <h2>Devenez prestataire sur binou.ma</h2>
        <p className="lead">Rejoignez notre communauté de professionnels et trouvez de nouvelles opportunités.</p>
        <Link to="/auth" className="btn btn-light btn-lg mt-3">S'inscrire en tant que prestataire</Link>
      </div>
    </section>
  );
};

export default BecomeProvider;
