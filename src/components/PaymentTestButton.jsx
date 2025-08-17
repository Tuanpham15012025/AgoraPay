// src/components/PaymentTestButton.js
import { useEffect, useState } from "react";
import { initPi } from "../lib/pi";

export default function PaymentTestButton() {
  const [pi, setPi] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setPi(initPi());
  }, []);

  const startPayment = async () => {
    if (!pi) {
      setStatus("⚠️ Pi SDK not available. Open in Pi Browser.");
      return;
    }

    try {
      setStatus("🔄 Creating payment...");

      const amount = Number(import.meta.env.VITE_TEST_AMOUNT || "1");
      const memo = "Test payment from AgoraPay";

      // --- gọi backend để tạo payment ---
      const res = await fetch(
        `${import.meta.env.VITE_BRIDGE_API}/create-payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, memo, metadata: { source: "ui" } }),
        }
      );

      if (!res.ok) throw new Error("Server create-payment failed");
      const paymentData = await res.json();
      console.log("Payment created:", paymentData);

      // --- gọi Pi SDK ---
      await pi.createPayment(paymentData, {
        onReadyForServerApproval: async (paymentId) => {
          setStatus("⏳ Approving on server...");
          const res = await fetch(`${import.meta.env.VITE_BRIDGE_API}/approve`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId }),
          });
          if (!res.ok) throw new Error("Server approval failed");
          setStatus("✅ Approved. Awaiting blockchain tx...");
        },
        onReadyForServerCompletion: async (paymentId, txid) => {
          setStatus("⏳ Completing on server...");
          const res = await fetch(`${import.meta.env.VITE_BRIDGE_API}/complete`, {
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
    <div className="card">
      <h2>Step 11: Process a Transaction</h2>
      <button className="btn primary" onClick={startPayment}>
        Pay 1 Test-Pi
      </button>
      <p className="muted">Runs in Pi Browser with Testnet funds.</p>
      {status && <p className="status">{status}</p>}
    </div>
  );
}
