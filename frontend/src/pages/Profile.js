// Fichier: frontend/src/pages/Profile.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Profile = () => {
  const { auth } = useContext(AuthContext);
  const [profile, setProfile] = useState({ email: '', user_type: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { 'x-auth-token': auth.token }
        });
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur de chargement du profil:', err);
        setLoading(false);
      }
    };

    if (auth.token) {
      fetchProfile();
    }
  }, [auth.token]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/users/profile', profile, {
        headers: { 'x-auth-token': auth.token }
      });
      alert('Profil mis à jour !');
    } catch (err) {
      console.error('Erreur de mise à jour:', err.response.data.message);
    }
  };

  if (loading) {
    return <p>Chargement du profil...</p>;
  }

  return (
    <div>
      <h2>Mon Profil</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={profile.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Type de compte</label>
          <select name="user_type" className="form-select" value={profile.user_type} onChange={handleChange}>
            <option value="client">Client</option>
            <option value="prestataire">Prestataire</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Mettre à jour</button>
      </form>
    </div>
  );
};

export default Profile;
