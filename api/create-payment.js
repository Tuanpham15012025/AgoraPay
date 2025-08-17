// /api/create-payment.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount, memo, metadata, uid } = req.body;

    if (!amount || !uid) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Ở đây bạn có thể tích hợp thêm check auth Pi Network nếu cần
    // Hoặc lưu giao dịch vào database (Firestore, Supabase...)

    const paymentData = {
      identifier: uid, // thường là user id
      amount,
      memo: memo || "AgoraPay Test Payment",
      metadata: metadata || { source: "AgoraPay" },
    };

    // Trả về cho frontend Pi SDK xử lý
    return res.status(200).json({
      success: true,
      payment: paymentData,
    });
  } catch (error) {
    console.error("Payment API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
