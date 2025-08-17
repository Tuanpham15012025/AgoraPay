// api/approve.js
const PI_API_URL = "https://api.minepi.com/v2";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { paymentId } = req.body || {};
    if (!paymentId) return res.status(400).json({ error: "Missing paymentId" });

    const apiKey = process.env.PI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Server misconfigured: missing PI_API_KEY" });

    // 1) Lấy chi tiết payment để xác thực (số tiền/memo khớp kỳ vọng)
    const getResp = await fetch(`${PI_API_URL}/payments/${paymentId}`, {
      headers: { Authorization: `Key ${apiKey}` },
    });
    if (!getResp.ok) {
      const err = await getResp.text();
      console.error("GET payment failed:", err);
      return res.status(502).json({ error: "Failed to fetch payment" });
    }
    const payment = await getResp.json();

    const expected = Number(process.env.EXPECTED_AMOUNT || "1");
    const paidAmount =
      typeof payment?.amount !== "undefined"
        ? Number(payment.amount)
        : Number(payment?.data?.amount ?? NaN);

    if (Number.isNaN(paidAmount) || paidAmount !== expected) {
      console.error("Amount mismatch:", { expected, paidAmount });
      return res.status(400).json({ error: "Amount mismatch" });
    }

    // 2) Approve
    const approveResp = await fetch(`${PI_API_URL}/payments/${paymentId}/approve`, {
      method: "POST",
      headers: { Authorization: `Key ${apiKey}` },
    });
    if (!approveResp.ok) {
      const err = await approveResp.text();
      console.error("Approve failed:", err);
      return res.status(502).json({ error: "Approve request failed" });
    }

    const approveJson = await approveResp.json().catch(() => ({}));
    return res.status(200).json({ ok: true, approve: approveJson });
  } catch (e) {
    console.error("approve error:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
}
