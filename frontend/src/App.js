 1 // Fichier: frontend/src/App.js
    2
    3 import React from 'react';
    4 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    5 import './App.css'; // Importation des styles globaux
    6 import { AuthProvider } from './context/AuthContext';
    7
    8 // Importer les pages
    9 import Home from './pages/Home';
   10 import Auth from './pages/Auth';
   11 import ClientDashboard from './pages/ClientDashboard';
   12 import PrestataireDashboard from './pages/PrestataireDashboard';
   13 import Profile from './pages/Profile';
   14 import ServiceDetail from './pages/ServiceDetail';
   15 import NotFound from './pages/NotFound';
   16 import CreateService from './pages/CreateService'; // Importer CreateService
   17
   18 // Importer les composants
   19 import Navbar from './components/Navbar';
   20 import Footer from './components/Footer';
   21
   22 function App() {
   23   return (
   24     <AuthProvider>
   25       <Router>
   26         <Navbar />
   27         <main className="container mt-4">
   28           <Routes>
   29             <Route path="/" element={<Home />} />
   30             <Route path="/auth" element={<Auth />} />
   31             <Route path="/client-dashboard" element={<ClientDashboard />} />
   32             <Route path="/prestataire-dashboard" element={<PrestataireDashboard />} />
   33             <Route path="/profile" element={<Profile />} />
   34             <Route path="/service/:id" element={<ServiceDetail />} />
   35             <Route path="/create-service" element={<CreateService />} />
   36             <Route path="*" element={<NotFound />} />
   37           </Routes>
   38         </main>
   39         <Footer />
   40       </Router>
   41     </AuthProvider>
   42   );
   43 }
   44
   45 export default App;
Fix App.js route for CreateService
