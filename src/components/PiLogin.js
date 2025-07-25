// src/components/PiLogin.js
import React, { useEffect } from 'react';

const PiLogin = () => {
  useEffect(() => {
    if (window?.Pi) {
      window.Pi.init({
        version: "2.0",
        sandbox: true,
      });
    }
  }, []);

  const handleLogin = async () => {
    try {
      const scopes = ["username", "payments"];
      const authResult = await window.Pi.authenticate(scopes);
      alert("Welcome " + authResult.user.username);
      console.log("Authentication result:", authResult);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
      Login with Pi
    </button>
  );
};

export default PiLogin;
