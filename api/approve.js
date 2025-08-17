export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { paymentId } = req.body || {};
    if (!paymentId) return res.status(400).json({ error: 'paymentId required' });

    const base = 'https://api.minepi.com';
    const headers = {
      'Authorization': `Key ${process.env.PI_API_KEY}`,
      'Content-Type': 'application/json'
    };

    // 1) Fetch payment to validate
    const getResp = await fetch(`${base}/v2/payments/${paymentId}`, { headers });
    if (!getResp.ok) {
      const t = await getResp.text();
      return res.status(400).json({ error: 'Failed to fetch payment', details: t });
    }
    const payment = await getResp.json();

    // Basic validations
    const expectedAmount = Number(process.env.EXPECTED_AMOUNT || '1');
    if (payment?.app?.id && process.env.PI_APP_ID && payment.app.id !== process.env.PI_APP_ID) {
      return res.status(403).json({ error: 'App ID mismatch' });
    }
    if (Number(payment?.amount) !== expectedAmount) {
      return res.status(400).json({ error: 'Amount mismatch' });
    }
    if (payment?.status !== 'pending') {
      return res.status(400).json({ error: `Unexpected status: ${payment?.status}` });
    }

    // 2) Approve payment
    const approveResp = await fetch(`${base}/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers,
      body: JSON.stringify({})
    });

    const approveJson = await approveResp.json().catch(() => ({}));
    if (!approveResp.ok) {
      return res.status(400).json({ error: 'Approve failed', details: approveJson });
    }

    return res.status(200).json({ ok: true, approve: approveJson });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error', details: e?.message });
  }
}
