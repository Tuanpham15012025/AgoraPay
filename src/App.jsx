import React, { useState, useEffect } from "react";
import { initPi } from "./pi";
import "./styles.css";

function App() {
  const [piLoaded, setPiLoaded] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    initPi()
      .then(() => setPiLoaded(true))
      .catch((err) => console.error("Pi init error:", err));
  }, []);

  const handleLogin = async () => {
    if (!piLoaded) return alert("Pi SDK chưa load xong!");
    try {
      const result = await window.Pi.authenticate(["username", "payments"]);
      setUser(result.user);
      alert(`Xin chào ${result.user.username}`);
    } catch (err) {
      console.error(err);
      alert("Login thất bại!");
    }
  };

  const handleTestPayment = async () => {
    if (!piLoaded || !user) return alert("Login trước khi test payment!");
    try {
      const paymentResult = await window.Pi.requestPayment({
        recipient: "test-recipient-id",
        amount: 1,
        memo: "Test Payment 1π",
      });
      console.log("Payment result:", paymentResult);
      alert("Payment requested! Check console.");
    } catch (err) {
      console.error(err);
      alert("Payment thất bại!");
    }
  };

  return (
    <div className="container">
      <h1>AgoraPay Test</h1>
      {!user ? (
        <button onClick={handleLogin}>Login with Pi</button>
      ) : (
        <div>
          <p>Xin chào, {user.username}</p>
          <button onClick={handleTestPayment}>Test Payment 1π</button>
        </div>
      )}
    </div>
  );
}

export default App;
