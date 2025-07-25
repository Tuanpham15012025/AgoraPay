import React from 'react';
import PiLogin from './components/PiLogin';

function App() {
  return (
    <div className="App" style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>AgoraPay</h1>
      <p>Peer-to-Peer Pi Payments</p>
      <PiLogin />
    </div>
  );
}

export default App;
