import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let auth = false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/login', { email, password });
      if (response.data.auth) {
        navigate("/principal");// mettre à jour l'état isLoggedIn à true pour la redirection vers la page principale
      } else navigate("/testcomp");
    } catch (err) {
      console.error(err);
      setError('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  return (
    <div>    <img src="https://scontent.cdninstagram.com/v/t1.15752-9/293558223_1184855078914133_5227506387825766741_n.png?stp=dst-png_s320x320&_nc_cat=104&ccb=1-7&_nc_sid=5a057b&_nc_ohc=-7KlQnO2PJ4AX_wtQ_f&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=03_AdS6sqoGtonY6PAC8BALoU8O0aYDNaDKU9sJ91phUN2uGg&oe=648DE044" alt="Description de l'image" class="photo-profil"></img>
      <div class="login-page" >

        <div class="form">
          <h1 >Se connecter</h1>
          <form onSubmit={handleSubmit} class="login-form">
            <label htmlFor="username">Nom d'utilisateur :</label>
            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <label htmlFor="password">Mot de passe :</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            {error && <div class="error-message" style={{ color: 'red' }}>{error}</div>}
            <button class="btn" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default Login;
