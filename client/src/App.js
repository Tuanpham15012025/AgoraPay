import React, { useState } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [response, setResponse] = useState(null);

  const handlePayment = async () => {
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, memo }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: error.message });
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>AgoraPay Demo</h1>
      <input
        type="number"
        placeholder="Nhập số tiền"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Nội dung"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <br />
      <button onClick={handlePayment}>Tạo thanh toán</button>

      {response && (
        <div style={{ marginTop: "1rem" }}>
          <pre>{JSON.stringify(response, null, 2)}</pre>
          {response.paymentUrl && (
            <a href={response.paymentUrl} target="_blank" rel="noreferrer">
              👉 Thanh toán ngay
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
