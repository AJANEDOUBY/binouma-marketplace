// Fichier : frontend/src/App.js

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import BecomeProvider from './components/BecomeProvider';
import HowItWorks from './components/HowItWorks';
import CreateService from './components/CreateService';  // Import unique

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/become-provider" element={<BecomeProvider />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/create-service" element={<CreateService />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
