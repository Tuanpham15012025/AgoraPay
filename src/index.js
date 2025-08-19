// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";

// App cơ bản
function App() {
  // Hàm khởi tạo Pi SDK
  const initPi = () => {
    if (window.Pi) {
      window.Pi.init({
        version: "2.0",
        sandbox: false, // true nếu muốn test môi trường sandbox
        apiKey: "jrl5fohqann2fph1po6nucvh58hlnietgeremezubvcb8aamedjwkfl1kmveawnf",
      });
      alert("✅ Pi SDK đã khởi tạo thành công!");
    } else {
      alert("❌ Không tìm thấy Pi SDK!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>AgoraPay Test</h2>
      <button
        onClick={initPi}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          background: "#6C5CE7",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Khởi tạo Pi SDK
      </button>
    </div>
  );
}

// Render ra root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
