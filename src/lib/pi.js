// src/lib/pi.js
export function initPi() {
  if (!window || !window.Pi) {
    console.warn("Pi SDK not found. Open this app in Pi Browser.");
    return null;
  }

  const sandbox =
    String(import.meta.env.VITE_PI_SANDBOX ?? "false").toLowerCase() === "true";

  try {
    window.Pi.init({ version: "2.0", sandbox });
  } catch (e) {
    console.error("Pi.init failed:", e);
  }

  // Trả về wrapper nhỏ cho tiện test
  return {
    authenticate: (scopes, onIncompletePaymentFound) =>
      window.Pi.authenticate(scopes, onIncompletePaymentFound),
    createPayment: (paymentData, callbacks) =>
      window.Pi.createPayment(paymentData, callbacks),
  };
}
