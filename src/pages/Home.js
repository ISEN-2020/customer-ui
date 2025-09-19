import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Veuillez saisir un email');
      return;
    }
    // Auth mockée: on stocke l'email et on navigue
    sessionStorage.setItem('username', email);
    navigate('/dashboard');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="container">
      <div className="form-column">
        <div className="header">
          <h2>Bibliothèque Cloud Native</h2>
          <p>Bienvenue ! Veuillez vous connecter à votre compte.</p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Adresse Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de Passe"
            required
          />
          <button className="blue-btn" type="submit">Connexion</button>
          <button className="white-btn" onClick={handleRegister}>S'inscrire</button>
        </form>
      </div>

      <div className="image-column">
        <img src="/Knowledge-rafiki.png" alt="Bibliothèque" />
      </div>
    </div>
  );
};

export default Home;