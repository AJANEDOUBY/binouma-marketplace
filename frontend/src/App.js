// Fichier: frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Importation des styles globaux
import { AuthProvider } from './context/AuthContext';

// Importer les pages
import Home from './pages/Home';
import Auth from './pages/Auth';
import ClientDashboard from './pages/ClientDashboard';
import PrestataireDashboard from './pages/PrestataireDashboard';
import Profile from './pages/Profile';
import ServiceDetail from './pages/ServiceDetail';
import NotFound from './pages/NotFound';

// Importer les composants
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route path="/prestataire-dashboard" element={<PrestataireDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
