import React, { useState } from 'react';
import authService from '../services/authService';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(email, password);
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };
  return (
    <div className="container">
      <div className="form-column">
        <div className="header">
          <h2>S'enregistrer</h2>
          <p>Devenez membre dès aujourd'hui !</p>
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
          <button className="blue-btn" type="submit">S'inscrire</button>
        </form>
      </div>

      <div className="image-column">
        <img src="/Login-rafiki.png"/>
      </div>
    </div>
  );
};

export default Register;