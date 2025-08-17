// api/create-payment.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { amount, memo, metadata, userAccessToken } = req.body || {};

    // 1. Xác thực user Pi
    if (!userAccessToken) {
      return res.status(400).json({ error: "Missing Pi user token" });
    }

    const verifyRes = await fetch("https://api.minepi.com/v2/me", {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    });

    if (!verifyRes.ok) {
      return res.status(401).json({ error: "Invalid Pi user token" });
    }
    const user = await verifyRes.json();

    // 2. Tính toán giá động (ví dụ: 0.5 Pi cho test)
    const dynamicPrice = Number(amount) > 0 ? Number(amount) : 0.5;

    // 3. Trả payload về frontend
    return res.status(200).json({
      amount: dynamicPrice,
      memo: memo || `Payment for user ${user.username}`,
      metadata: metadata || { source: "agorapay", uid: user.uid },
    });
  } catch (e) {
    console.error("create-payment error:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
}
