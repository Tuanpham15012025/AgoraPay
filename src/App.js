import React, { useEffect } from "react";
import { initPiSdk } from "./pi/initPi";

function App() {
  useEffect(() => {
    initPiSdk(); // Khởi tạo SDK khi app mount
  }, []);

  return (
    <div>
      <h1>Welcome to AgoraPay</h1>
      {/* Các thành phần khác */}
    </div>
  );
}

export default App;
