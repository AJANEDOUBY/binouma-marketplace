// Fichier: frontend/src/components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center p-3 mt-5">
      <p>&copy; {new Date().getFullYear()} Binou-ma. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
