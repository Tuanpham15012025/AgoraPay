import React, { useState, useEffect } from "react";
import { initPi } from "./pi";

function App() {
  const [piLoaded, setPiLoaded] = useState(false);

  useEffect(() => {
    initPi()
      .then(() => setPiLoaded(true))
      .catch(err => console.error("Pi init error:", err));
  }, []);

  const handleLogin = async () => {
    if (!piLoaded) return alert("Pi SDK chưa load xong!");
    try {
      const scopes = ["username", "payments"];
      const result = await window.Pi.authenticate(scopes);
      console.log("Logged in user:", result.user);
      alert(`Xin chào ${result.user.username}`);
    } catch (err) {
      console.error(err);
      alert("Login thất bại!");
    }
  };

  return (
    <div>
      <h1>AgoraPay Test</h1>
      <button onClick={handleLogin}>Login with Pi</button>
    </div>
  );
}

export default App;
