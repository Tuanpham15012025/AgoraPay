import React from 'react';
import PiLogin from './components/PiLogin';
// Nếu bạn dùng PiAuth thay vì PiLogin, đổi lại dòng import trên

function App() {
  return (
    <div className="App">
      <h1>Welcome to AgoraPay</h1>
      <PiLogin />
    </div>
  );
}

export default App;
