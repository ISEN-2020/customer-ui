import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    /*e.preventDefault();
    
    const loginData = {
      "email": email,
      "password": password,
      "admin_page": "false"
    };

    try {
      const response = await axios.post('/api/login', loginData);
      const { message, role, success } = response.data;

      if (success === "true") {*/
        navigate('/dashboard');
      /*} else {
        alert('Utilisateur inconnu ou mot de passe incorrect.');
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Une erreur est survenue lors de la tentative de connexion.');
    }*/
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