export function initPi() {
  if (typeof window === 'undefined' || !window.Pi) {
    return null; // Not in Pi Browser or SDK not loaded
  }
  const sandbox = import.meta.env.VITE_PI_SANDBOX === 'true';
  // Initialize Pi SDK
  window.Pi.init({ version: '2.0', sandbox });
  return window.Pi;
}
