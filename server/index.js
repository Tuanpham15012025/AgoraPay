import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const PI_API_URL = "https://api.minepi.com/v2/payments";

// Lấy API key từ Pi Developer Portal
const PI_API_KEY = process.env.PI_API_KEY;

// 1. Tạo payment
app.post("/create-payment", async (req, res) => {
  try {
    const { amount, memo, metadata } = req.body;

    const response = await fetch(PI_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Key ${PI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, memo, metadata }),
    });

    const data = await response.json();
    console.log("Create payment response:", data);

    res.json({ paymentId: data.identifier, data });
  } catch (err) {
    console.error("Error creating payment:", err);
    res.status(500).json({ error: "Failed to create payment" });
  }
});

// 2. Xác minh payment (Pi gọi ngược lại endpoint này)
app.post("/verify-payment", async (req, res) => {
  try {
    const payment = req.body;
    console.log("Payment callback từ Pi:", payment);

    // TODO: Update database tại đây (nếu có)
    // Ví dụ: mark order as paid

    res.json({ success: true });
  } catch (err) {
    console.error("Error verifying payment:", err);
    res.status(500).json({ error: "Failed to verify payment" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
