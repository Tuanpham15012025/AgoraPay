import React, { useState, useEffect } from "react";
import { initPi } from "./pi";
import "./App.css";

function App() {
  const [piUser, setPiUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initPi();
  }, []);

  const handleLogin = async () => {
    if (!window.Pi) return alert("Pi SDK chưa load!");
    try {
      const scopes = ["username", "payments"];
      const result = await window.Pi.authenticate(scopes);
      setPiUser(result.user);
      alert(`Xin chào ${result.user.username}`);
    } catch (err) {
      console.error(err);
      alert("Đăng nhập thất bại!");
    }
  };

  const handleTestPayment = async () => {
    if (!piUser) return alert("Cần đăng nhập trước!");
    setLoading(true);
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: piUser.username,
          amount: 1,
          memo: "Test Payment AgoraPay",
        }),
      });
      const data = await res.json();
      console.log("Payment response:", data);
      alert(`Payment created: ${JSON.stringify(data)}`);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi tạo thanh toán");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <img src="/logo512.png" alt="AgoraPay Logo" className="w-24 h-24 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Welcome to AgoraPay</h1>
      {!piUser ? (
        <button
          onClick={handleLogin}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
        >
          Login with Pi
        </button>
      ) : (
        <>
          <p className="text-green-600 mb-2">Logged in as @{piUser.username}</p>
          <button
            onClick={handleTestPayment}
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg"
          >
            {loading ? "Processing..." : "Test Payment 1π"}
          </button>
        </>
      )}
    </div>
  );
}

export default App;
