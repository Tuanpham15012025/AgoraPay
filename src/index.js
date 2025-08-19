import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Import Pi SDK từ window
const Pi = window.Pi;

if (Pi) {
  Pi.init({
    version: "2.0",
    sandbox: false,
    apiKey: process.env.REACT_APP_PI_API_KEY, // Lấy từ .env
  });
  console.log("✅ Pi SDK initialized with API Key");
} else {
  console.error("❌ Pi SDK not loaded");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
