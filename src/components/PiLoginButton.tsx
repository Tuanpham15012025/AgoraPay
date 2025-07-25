```tsx
import React from 'react';
declare global {
  interface Window {
    Pi: any;
  }
}

export const PiLoginButton = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const handleLogin = async () => {
    try {
      const scopes = ['username', 'payments'];
      const user = await window.Pi.authenticate(scopes, (error: any, user: any) => {
        if (error) return console.error(error);
        onLogin(user);
      });
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded"
    >
      Login with Pi
    </button>
  );
};
```
