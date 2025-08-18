import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    if (window.Pi) {
      // Khởi tạo SDK ngay khi load
      window.Pi.init({ version: "2.0", sandbox: true }); // sandbox:true để test
      console.log("✅ Pi SDK initialized");
    } else {
      console.error("❌ Pi SDK not found on window");
    }
  }, []);

  const handlePayment = async () => {
    try {
      if (!window.Pi) throw new Error("Pi SDK chưa load");

      const payment = await window.Pi.createPayment({
        amount: 1,
        memo: "AgoraPay Test Payment",
        metadata: { project: "agorapay" },
      });

      console.log("💳 Payment created:", payment);
    } catch (err) {
      console.error("❌ Error:", err.message);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>AgoraPay Test</h1>
      <button onClick={handlePayment}>💳 Test Payment 1π</button>
    </div>
  );
}

export default App;
