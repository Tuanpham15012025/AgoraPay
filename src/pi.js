// src/pi.js
export const initPi = () => {
  if (!window.Pi) {
    console.error("Pi SDK chưa được load. Kiểm tra script trong index.html");
    return null;
  }

  return window.Pi.init({
    version: "2.0",
    sandbox: true, // false khi lên mainnet
  });
};
