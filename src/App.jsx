// src/App.jsx
import { useEffect, useState } from "react";
import "./App.css";
import PaymentTestButton from "./components/PaymentTestButton";
import { initPi } from "./lib/pi";

export default function App() {
  const [piUser, setPiUser] = useState(null);

  useEffect(() => {
    const pi = initPi();
    // Không login tự động; chỉ hiển thị khi user bấm Test Payment
    // Nếu muốn login trước thì uncomment:
    // (async () => {
    //   try {
    //     const auth = await pi.authenticate(["username", "payments"], () => {});
    //     setPiUser(auth.user);
    //   } catch {}
    // })();
  }, []);

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

      {piUser ? (
        <p className="text-green-600 font-semibold">Logged in as @{piUser.username}</p>
      ) : (
        <p className="text-gray-600">You’ll be asked to log in when paying.</p>
      )}

      <div style={{ height: 16 }} />
      <PaymentTestButton />

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
