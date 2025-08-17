// api/create-payment.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { amount, memo, metadata } = req.body || {};
    const expected = Number(process.env.EXPECTED_AMOUNT || "1");
    if (Number(amount) !== expected) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // Bạn có thể thêm các kiểm tra khác: user, rate limit, lưu DB, v.v.
    // Trả về payload để đưa thẳng vào Pi.createPayment phía frontend
    return res.status(200).json({
      amount: expected,
      memo: memo || "AgoraPay Test Payment",
      metadata: metadata || { source: "agorapay" },
    });
  } catch (e) {
    console.error("create-payment error:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
}
