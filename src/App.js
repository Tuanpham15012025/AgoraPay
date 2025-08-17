import React, { useState, useEffect } from "react";
import "./App.css";
import TestPayment from "./components/TestPayment";

function App() {
  const [piUser, setPiUser] = useState(null);
  const [loadingLogin, setLoadingLogin] = useState(false);

  // Hàm xử lý khi có giao dịch chưa hoàn tất
  const onIncompletePaymentFound = (payment) => {
    console.log("⚠️ Incomplete payment found:", payment);
    alert("Bạn có giao dịch chưa hoàn tất, vui lòng kiểm tra lại!");
  };

  // Khởi tạo Pi SDK
  useEffect(() => {
    if (window.Pi) {
      window.Pi.init({ version: "2.0" });
    } else {
      console.error("Pi SDK not found. Make sure you included the Pi JavaScript SDK script.");
    }
  }, []);

  // Xử lý đăng nhập
  const handleLogin = async () => {
    setLoadingLogin(true);
    try {
      const scopes = ["username", "payments"]; // Quyền cần lấy
      const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      console.log("✅ Login success:", authResult);
      setPiUser(authResult.user);
      alert(`Xin chào ${authResult.user.username}!`);
    } catch (error) {
      console.error("❌ Login failed:", error);
      alert("Đăng nhập thất bại, vui lòng thử lại.");
    } finally {
      setLoadingLogin(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex flex-col items-center justify-center p-6">
      <img src="/logo512.png" alt="AgoraPay Logo" className="w-24 h-24 mb-4" />
      <h1 className="text-4xl font-bold text-indigo-700 mb-2">Welcome to AgoraPay</h1>
      <p className="text-lg text-gray-700 max-w-xl text-center mb-6">
        AgoraPay is a peer-to-peer Web3 payment app built on Pi Network.
        Seamlessly send and receive Pi using secure Pi SDK authentication.
      </p>

      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-2xl mb-6">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Roadmap</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li><strong>Phase 1:</strong> MVP with Pi Login and sandbox payments</li>
          <li><strong>Phase 2:</strong> User-to-User Payments and Wallet UI</li>
          <li><strong>Phase 3:</strong> Integration with merchant APIs and Mainnet support</li>
          <li><strong>Phase 4:</strong> Launch Agora Marketplace and staking features</li>
        </ul>
      </div>

      {!piUser ? (
        <button
          onClick={handleLogin}
          disabled={loadingLogin}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow"
        >
          {loadingLogin ? "Logging in..." : "Login with Pi"}
        </button>
      ) : (
        <div className="flex flex-col items-center space-y-4 w-full max-w-md">
          <p className="text-green-600 font-semibold">Logged in as @{piUser.username}</p>
          
          {/* Component Test Payment */}
          <TestPayment piUser={piUser} />

        </div>
      )}

      <footer className="mt-10 text-sm text-gray-500">
        <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="underline mr-4">
          Privacy Policy
        </a>
        <a href="/terms-of-service.html" target="_blank" rel="noopener noreferrer" className="underline">
          Terms of Service
        </a>
      </footer>
    </div>
  );
}

export default App;
