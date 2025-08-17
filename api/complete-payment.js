// api/complete-payment.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payment = req.body; // Pi sẽ gửi payload payment về đây

    // ✅ TODO: bạn cần verify chữ ký (signature) từ Pi để đảm bảo callback là thật
    // Dùng process.env.PI_API_KEY hoặc PUBLIC_KEY để xác thực

    // Ví dụ: chỉ log ra trước
    console.log("Payment completed:", payment);

    // ✅ Ở bước thực tế, bạn có thể:
    // 1. Lưu thông tin payment vào DB (MongoDB, MySQL, Postgres, ...)
    // 2. Cập nhật trạng thái đơn hàng là "đã thanh toán"
    // 3. Thông báo cho frontend biết để unlock tính năng

    return res.status(200).json({ success: true });
  } catch (e) {
    console.error("complete-payment error:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
}
