export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { transactionId, status, amount } = req.body;

    console.log("Callback received:", req.body);

    // Xử lý logic xác nhận giao dịch tại đây (update DB...)

    return res.status(200).json({ message: "Callback processed", received: req.body });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
}
