import './styles.css';
import LoginPanel from './components/LoginPanel';
import PaymentTestButton from './components/PaymentTestButton';

export default function App() {
  return (
    <div className="container">
      <header>
        <img src="/logo.svg" alt="AgoraPay" className="logo" />
        <h1>Welcome to AgoraPay</h1>
        <p>Peer-to-peer Web3 payments on Pi Network. Secure Pi SDK authentication and payments.</p>
      </header>

      <main>
        <LoginPanel />
        <PaymentTestButton />

        <section className="card">
          <h2>Roadmap</h2>
          <ol>
            <li>MVP: Pi Login + sandbox payments</li>
            <li>User-to-User payments + Wallet UI</li>
            <li>Merchant APIs + Mainnet support</li>
            <li>Agora Marketplace + staking features</li>
          </ol>
        </section>

        <footer>
          <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>
          <span> · </span>
          <a href="/terms" target="_blank" rel="noreferrer">Terms of Service</a>
        </footer>
      </main>
    </div>
  );
}
