// api/create-payment.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount, memo, metadata, userAccessToken } = req.body || {};

    // 1. Kiểm tra đầu vào
    if (!userAccessToken) {
      return res.status(400).json({ error: "Missing Pi user token" });
    }

    // 2. Xác thực user Pi với Pi API
    let user;
    try {
      const verifyRes = await fetch("https://api.minepi.com/v2/me", {
        headers: { Authorization: `Bearer ${userAccessToken}` },
      });

      if (!verifyRes.ok) {
        return res.status(401).json({ error: "Invalid Pi user token" });
      }

      user = await verifyRes.json();
    } catch (err) {
      console.error("Pi API fetch failed:", err);
      return res.status(502).json({ error: "Failed to reach Pi API", details: err.message });
    }

    // 3. Tính toán giá động (mặc định 0.5 Pi nếu amount trống)
    const dynamicPrice = Number(amount) > 0 ? Number(amount) : 0.5;

    // 4. Tạo payload trả về frontend
    const payload = {
      status: "success",
      amount: dynamicPrice,
      memo: memo || `Payment for user ${user.username || "unknown"}`,
      metadata: metadata || { source: "agorapay", uid: user.uid },
      user: { username: user.username, uid: user.uid },
      paymentUrl: `https://sandbox.agorapay.vn/pay?amount=${dynamicPrice}&memo=${encodeURIComponent(
        memo || ""
      )}`,
    };

    return res.status(200).json(payload);
  } catch (e) {
    console.error("create-payment error:", e);
    return res.status(500).json({ error: "Internal server error", details: e.message });
  }
}
