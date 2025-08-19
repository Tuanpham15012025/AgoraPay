import React, { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [status, setStatus] = useState("");

  // Đăng nhập bằng Pi Network SDK
  const loginWithPi = async () => {
    try {
      const scopes = ["payments"];
      const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      console.log("Auth result:", authResult);
      setUser(authResult.user);
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  // Callback nếu có giao dịch chưa hoàn tất
  const onIncompletePaymentFound = (payment) => {
    console.log("Incomplete payment:", payment);
  };

  // Gọi API backend để tạo payment
  const createPayment = async () => {
    try {
      const res = await fetch("http://localhost:5000/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 1,
          memo: "Test Payment 1π",
          metadata: { userId: user.uid }
        })
      });

      const data = await res.json();
      console.log("Payment created:", data);
      setPaymentId(data.paymentId);
      setStatus("Đang chờ Pi xác nhận...");
    } catch (err) {
      console.error("Error creating payment", err);
      setStatus("Lỗi khi tạo payment!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AgoraPay Test</h1>
      {!user ? (
        <button onClick={loginWithPi}>🔑 Login with Pi</button>
      ) : (
        <>
          <p>Xin chào {user.username}!</p>
          <button onClick={createPayment}>💳 Test Payment 1π</button>
          {paymentId && <p>Payment ID: {paymentId}</p>}
          <p>{status}</p>
        </>
      )}
    </div>
  );
}

export default App;
