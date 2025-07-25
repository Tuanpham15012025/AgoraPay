export const initPi = async () => {
  if (!window?.Pi) {
    console.warn("Pi SDK not found");
    return;
  }

  try {
    await window.Pi.init({ version: "2.0", sandbox: true });
    console.log("Pi SDK initialized");
  } catch (err) {
    console.error("Pi SDK init error:", err);
  }
};
