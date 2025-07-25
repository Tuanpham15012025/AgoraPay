import React, { useState } from 'react';
import { initPi } from '../pi-sdk';

function PiLogin() {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    await initPi();
    const scopes = ['username', 'payments'];
    try {
      const user = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      setUser(user);
      console.log("Authenticated user:", user);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const onIncompletePaymentFound = (payment) => {
    console.log("Incomplete payment:", payment);
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl mb-4">Pi Payment Login</h2>
      {user ? (
        <div>
          <p>Welcome, {user.username}</p>
        </div>
      ) : (
        <button onClick={handleLogin} className="bg-yellow-500 text-white px-4 py-2 rounded">
          Login with Pi
        </button>
      )}
    </div>
  );
}

export default PiLogin;
