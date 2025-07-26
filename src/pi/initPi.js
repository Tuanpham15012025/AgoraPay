// src/pi/initPi.js

export const initPiSdk = async () => {
  if (!window.Pi) {
    console.error("Pi SDK not found. Make sure pi-sdk.js is loaded in index.html");
    return;
  }

  try {
    const response = await window.Pi.init({
      version: "2.0" // Production mode (mặc định)
      // KHÔNG dùng sandbox: true
    });
    console.log("✅ Pi SDK initialized:", response);
  } catch (error) {
    console.error("❌ Failed to initialize Pi SDK:", error);
  }
};
