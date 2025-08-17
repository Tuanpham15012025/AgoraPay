// src/components/PaymentTestButton.jsx
import { useEffect, useState } from "react";
import { initPi } from "../lib/pi";

export default function PaymentTestButton() {
  const [pi, setPi] = useState(null);
  const [status, setStatus] = useState("");
  const API_BASE = import.meta.env.VITE_BRIDGE_API || ""; // cùng domain -> để trống

  useEffect(() => {
    setPi(initPi());
  }, []);

  const startPayment = async () => {
    if (!pi) {
      setStatus("⚠️ Pi SDK not available. Please open in Pi Browser.");
      return;
    }

    try {
      setStatus("🔐 Logging in...");
      const auth = await pi.authenticate(
        ["username", "payments"],
        (pmt) => console.log("Incomplete payment found:", pmt)
      );
      const username = auth?.user?.username;
      if (!username) throw new Error("No Pi username from auth.");

      setStatus("🧾 Preparing payment...");
      const amount = Number(import.meta.env.VITE_TEST_AMOUNT || "1");
      const memo = "Test payment from AgoraPay";

      // (Tùy chọn) Gọi server để ràng buộc amount/memo từ phía server
      // Server sẽ trả lại payload để đưa vào Pi.createPayment
      const createRes = await fetch(`${API_BASE}/api/create-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          memo,
          metadata: { type: "test", source: "agorapay-ui", username },
        }),
      });
      if (!createRes.ok) throw new Error("create-payment failed");
      const paymentInput = await createRes.json();

      setStatus("💳 Opening Pi payment UI...");
      await pi.createPayment(paymentInput, {
        onReadyForServerApproval: async (paymentId) => {
          setStatus("⏳ Approving on server...");
          const res = await fetch(`${API_BASE}/api/approve`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId }),
          });
          if (!res.ok) throw new Error("Server approval failed");
          setStatus("✅ Approved. Waiting for blockchain tx...");
        },
        onReadyForServerCompletion: async (paymentId, txid) => {
          setStatus("⏳ Completing on server...");
          const res = await fetch(`${API_BASE}/api/complete`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId, txid }),
          });
          if (!res.ok) throw new Error("Server completion failed");
          setStatus("🎉 Payment completed!");
        },
        onCancel: (paymentId) => {
          console.warn("Payment cancelled:", paymentId);
          setStatus("⚠️ Payment cancelled");
        },
        onError: (error, payment) => {
          console.error("Payment error:", error, payment);
          setStatus(`❌ Error: ${error?.message || "Unknown"}`);
        },
      });
    } catch (e) {
      console.error(e);
      setStatus(`❌ Error: ${e?.message || "Unknown"}`);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 560, margin: "0 auto" }}>
      <h2>Step 11: Process a Transaction</h2>
      <button className="btn primary" onClick={startPayment}>Test Payment 1π</button>
      <p className="muted">Use Pi Browser (Testnet funds).</p>
      {status && <p className="status">{status}</p>}
    </div>
  );
}
