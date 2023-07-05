import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import { useSignIn } from 'react-auth-kit';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const signIn = useSignIn();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/login', { email, password });
      if (response.data.auth) {
        console.log(response.data.token);
        signIn({
          token: response.data.token,
          expiresIn: 60,
          tokenType: String,
          authState: { email: email }
        });
        localStorage.setItem("email", response.data.email);
        navigate("/principal");
      }
    } catch (err) {
      console.error(err);
      setError('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  return (
    <div>    <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/293558223_1184855078914133_5227506387825766741_n.png?stp=dst-png_s206x206&_nc_cat=104&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeHXCXsHY8fmNrswsgk5mEoTndNUCUxrDtOd01QJTGsO0-8UkQQC1yaPFIm0WXdte0xWgSqbDT2hl8iStNAPtZjy&_nc_ohc=5Y6enf0uVS0AX9dabql&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTalnUwnPc2qanrNteqZYAlnnUwzEPG2eC_qbWw3RgIkQ&oe=64C6C904" alt="Description de l'image" class="photo-profil"></img>
      <div class="login-page" >

        <div class="form">
          <h1 class="login-title">Se connecter</h1>
          <form onSubmit={handleSubmit} class="login-form">
            <label htmlFor="username">Nom d'utilisateur :</label>
            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <label htmlFor="password">Mot de passe :</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            {error && <div class="error-message" style={{ color: 'red' }}>{error}</div>}
            <button class="btn login-button" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default Login;
