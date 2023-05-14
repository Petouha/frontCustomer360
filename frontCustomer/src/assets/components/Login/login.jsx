import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';



const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/login', { email, password });
      console.log(response.data.auth);
      const token = response.data.token;
      localStorage.setItem('token', token);
      setIsLoggedIn(true); // mettre à jour l'état isLoggedIn à true pour la redirection vers la page principale
    } catch (err) {
      console.error(err);
      setError('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  if (isLoggedIn) {
    return redirect("/frontCustomer/src/assets/components/Principal/principal"); // redirection vers la page principale
  }

  return (
    <div>
      <h1>Se connecter</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nom d'utilisateur :</label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label htmlFor="password">Mot de passe :</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Login in</button>
      </form>
    </div>
  );
};

export default Login;
