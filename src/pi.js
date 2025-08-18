export const initPi = () => {
  return new Promise((resolve, reject) => {
    const checkPi = () => {
      if (window.Pi) {
        const pi = window.Pi.init({ version: "2.0", sandbox: true });
        resolve(pi);
      } else {
        setTimeout(checkPi, 100);
      }
    };
    checkPi();
  });
};
