import { useEffect, useState } from 'react';
import { initPi } from '../lib/pi';

export default function LoginPanel() {
  const [pi, setPi] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const p = initPi();
    setPi(p);
  }, []);

  const handleLogin = async () => {
    try {
      if (!pi) {
        setError('Pi SDK not available. Please open in Pi Browser.');
        return;
      }
      const scopes = ['username', 'payments'];
      const onIncompletePaymentFound = (payment) => {
        console.log('Incomplete payment found:', payment);
      };
      const me = await pi.authenticate(scopes, onIncompletePaymentFound);
      setUser(me);
    } catch (e) {
      console.error(e);
      setError(e?.message || 'Login failed');
    }
  };

  if (!pi) {
    return (
      <div className="card">
        <p><strong>Open this app inside Pi Browser</strong> to enable Pi Login and Payments.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Pi Login</h2>
      {user ? (
        <p>Logged in as <strong>@{user?.username}</strong></p>
      ) : (
        <button className="btn" onClick={handleLogin}>Login with Pi</button>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
