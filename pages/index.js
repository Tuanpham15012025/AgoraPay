import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.Pi) {
      // Khởi tạo SDK ở client
      window.Pi.init({ version: "2.0" });
    }
  }, []);

  const handleLogin = async () => {
    try {
      const scopes = ["username", "payments"];
      const auth = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      console.log("User auth:", auth);
      setUser(auth.user);
    } catch (err) {
      console.error(err);
    }
  };

  const onIncompletePaymentFound = (payment) => {
    console.log("Incomplete payment found:", payment);
  };

  const handlePayment = async () => {
    try {
      const payment = await window.Pi.createPayment({
        amount: 1,
        memo: "Test Payment 1π",
        metadata: { project: "AgoraPay" }
      }, {
        onReadyForServerApproval: (paymentId) => {
          console.log("onReadyForServerApproval", paymentId);
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          console.log("onReadyForServerCompletion", paymentId, txid);
        },
        onCancel: (paymentId) => {
          console.log("onCancel", paymentId);
          setPaymentStatus("❌ Payment canceled");
        },
        onError: (err, payment) => {
          console.error("onError", err, payment);
          setPaymentStatus("❌ Error: " + err);
        }
      });

      console.log("Payment created:", payment);
      setPaymentStatus("✅ Payment started...");
    } catch (err) {
      console.error(err);
      setPaymentStatus("❌ Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AgoraPay Test</h1>

      {!user ? (
        <button onClick={handleLogin}>🔑 Login with Pi</button>
      ) : (
        <>
          <p>👋 Hello, {user.username}</p>
          <button onClick={handlePayment}>💳 Test Payment 1π</button>
        </>
      )}

      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
}
