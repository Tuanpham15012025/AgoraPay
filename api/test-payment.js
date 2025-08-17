export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { amount, memo, metadata } = req.body;

  // Check required fields
  if (!amount || !memo) {
    return res.status(400).json({ error: "amount and memo are required" });
  }

  try {
    const response = await fetch("https://sandbox-api.minepi.com/v2/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.PI_API_KEY}`,
      },
      body: JSON.stringify({
        amount,
        memo,
        metadata: metadata || {},
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
