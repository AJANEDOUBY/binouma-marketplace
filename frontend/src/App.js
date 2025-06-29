// Fichier : frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import de vos composants (exemple)
import Home from './components/Home';
import CreateService from './components/CreateService';
import ServicesList from './components/ServicesList';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/create-service">Créer un service</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/profile">Profil</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-service" element={<CreateService />} />
          <Route path="/services" element={<ServicesList />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
