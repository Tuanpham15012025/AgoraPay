export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { paymentId, txid } = req.body || {};
    if (!paymentId || !txid) return res.status(400).json({ error: 'paymentId and txid required' });

    const base = 'https://api.minepi.com';
    const headers = {
   
