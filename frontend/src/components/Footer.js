// Fichier: frontend/src/components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-4">
            <h5>Binou-ma</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">À propos</a></li>
              <li><a href="#" className="text-white text-decoration-none">Comment ça marche ?</a></li>
              <li><a href="#" className="text-white text-decoration-none">Témoignages</a></li>
              <li><a href="#" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <h5>Services</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Ménage</a></li>
              <li><a href="#" className="text-white text-decoration-none">Bricolage</a></li>
              <li><a href="#" className="text-white text-decoration-none">Jardinage</a></li>
              <li><a href="#" className="text-white text-decoration-none">Cours particuliers</a></li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <h5>Pour les prestataires</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Devenir prestataire</a></li>
              <li><a href="#" className="text-white text-decoration-none">Comment ça marche ?</a></li>
              <li><a href="#" className="text-white text-decoration-none">FAQ Prestataires</a></li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <h5>Suivez-nous</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none"><i className="fab fa-facebook-f"></i> Facebook</a></li>
              <li><a href="#" className="text-white text-decoration-none"><i className="fab fa-twitter"></i> Twitter</a></li>
              <li><a href="#" className="text-white text-decoration-none"><i className="fab fa-instagram"></i> Instagram</a></li>
            </ul>
          </div>
        </div>
        <hr className="bg-light" />
        <div className="row">
          <div className="col-12 text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} binou.ma. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
