import React, { useState } from "react";
import Login from "./assets/components/Login/login"
import Principal from "./assets/components/Principal/principal.jsx";
import Profil from "./assets/components/Profil/profil"
import SemiCircle from "./assets/components/SemiCircle/SemiCircle";
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import { Consultation } from "./assets/components/Principal/Consultation";


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
      <Route path="/principal" element={<RequireAuth loginPath="/">
        <Principal />
      </RequireAuth>} />
      <Route path="/profil" element={<RequireAuth loginPath="/">
        <Profil />
      </RequireAuth>} />
      <Route path="/test" element={<Consultation></Consultation>}></Route>
    </Routes>
  );
}

export default App;
