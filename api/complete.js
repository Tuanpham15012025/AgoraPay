// api/complete.js
const PI_API_URL = "https://api.minepi.com/v2";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { paymentId, txid } = req.body || {};
    if (!paymentId) return res.status(400).json({ error: "Missing paymentId" });

    const apiKey = process.env.PI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Server misconfigured: missing PI_API_KEY" });

    // Có txid từ callback Pi SDK (onReadyForServerCompletion)
    const body = txid ? { txid } : {};

    const completeResp = await fetch(`${PI_API_URL}/payments/${paymentId}/complete`, {
      method: "POST",
      headers: {
        Authorization: `Key ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: Object.keys(body).length ? JSON.stringify(body) : undefined,
    });

    if (!completeResp.ok) {
      const err = await completeResp.text();
      console.error("Complete failed:", err);
      return res.status(502).json({ error: "Complete request failed" });
    }

    const completeJson = await completeResp.json().catch(() => ({}));
    return res.status(200).json({ ok: true, complete: completeJson });
  } catch (e) {
    console.error("complete error:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
}
