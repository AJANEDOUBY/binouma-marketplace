// Fichier: frontend/src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, isAuthenticated: false, user: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Ici, vous devriez vérifier la validité du token côté serveur
      // Pour la simplicité, nous allons juste définir l'état
      setAuth({ token, isAuthenticated: true, user: null }); // User sera chargé plus tard
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({ token, isAuthenticated: true, user: null });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
