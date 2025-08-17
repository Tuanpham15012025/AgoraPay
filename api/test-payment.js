// api/test-payment.js

export default async function handler(req, res) {
  // Chỉ cho phép POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { amount, memo, metadata } = req.body;

  // Kiểm tra các tham số bắt buộc
  if (!amount || !memo) {
    return res.status(400).json({ error: "amount and memo are required" });
  }

  try {
    // Gọi Pi Network sandbox API
    const response = await fetch("https://sandbox-api.minepi.com/v2/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.PI_API_KEY}`, // Load từ .env
      },
      body: JSON.stringify({
        amount,
        memo,
        metadata: metadata || {},
      }),
    });

    // Chuyển response sang JSON
    const data = await response.json();

    // Nếu Pi API trả về lỗi, forward lỗi đó về client
    if (!response.ok) {
      console.error("Pi API returned error:", data);
      return res.status(response.status).json({ error: data });
    }

    // Trả kết quả thành công
    res.status(200).json({ success: true, data });
  } catch (err) {
    // Log chi tiết lỗi fetch
    console.error("Fetch failed:", err);
    res.status(500).json({ error: "fetch failed", details: err.message });
  }
}
