import React, { useState } from "react";
import Login from "./assets/components/Login/login"
import Principal from "./assets/components/Principal/principal.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLogout() {
    setLoggedIn(false);
  }

  return (
    <div className="App">
      {loggedIn ? (
        <Principal onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
