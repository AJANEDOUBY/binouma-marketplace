// Fichier: frontend/src/components/Navbar.js

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">binou.ma</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Accueil</Link>
            </li>
            {auth.isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profil</Link>
                </li>
                {/* Liens conditionnels basés sur le type d'utilisateur à ajouter ici */}
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>Déconnexion</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/auth">Connexion / Inscription</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      {/* Section des catégories (à affiner avec de vraies catégories) */}
      <div className="bg-light py-2 d-none d-lg-block">
        <div className="container d-flex justify-content-around">
          <a href="#" className="text-dark text-decoration-none">Ménage</a>
          <a href="#" className="text-dark text-decoration-none">Bricolage</a>
          <a href="#" className="text-dark text-decoration-none">Jardinage</a>
          <a href="#" className="text-dark text-decoration-none">Cours</a>
          <a href="#" className="text-dark text-decoration-none">Informatique</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
