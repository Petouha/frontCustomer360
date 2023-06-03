import React, { useState } from "react";
import Login from "./assets/components/Login/login"
import Principal from "./assets/components/Principal/principal.jsx";
import Profil from "./assets/components/Profil/profil"
import { Routes, Route } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLogout() {
    setLoggedIn(false);
  }

  return (
    // <div className="App">
    //   {loggedIn ? (
    //     <Principal onLogout={handleLogout} />
    //   ) : (
    //     <Login onLogin={handleLogin} />
    //   )}
    // </div>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/principal" element={<Principal />} />
      <Route path="/profil" element={<Profil />} />
    </Routes>
  );
}

export default App;
