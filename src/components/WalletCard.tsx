```tsx
import React from 'react';

export const WalletCard = ({ balance, username }: { balance: number; username: string }) => (
  <div className="border rounded-xl p-4 bg-white shadow-md max-w-sm mx-auto text-center">
    <h2 className="text-lg font-semibold mb-2">Welcome, {username}</h2>
    <p className="text-2xl text-green-600">{balance} π</p>
  </div>
);
```
