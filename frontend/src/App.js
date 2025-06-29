// Fichier : frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'; // Importation des styles globaux
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Auth from './pages/Auth';
import ClientDashboard from './pages/ClientDashboard';
import PrestataireDashboard from './pages/PrestataireDashboard';
import Profile from './pages/Profile';
import ServiceDetail from './pages/ServiceDetail';
import CreateService from './pages/CreateService';
import NotFound from './pages/NotFound';
import CreateService from './pages/CreateService'; // Assurez-vous que cette ligne est présente

// Composants
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
            <Route path="/create-service" element={<CreateService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
