```ts
export const fetchPiBalance = async (userId: string): Promise<number> => {
  // Simulate fetching balance from Pi backend
  return new Promise((resolve) => {
    setTimeout(() => resolve(42.0), 1000);
  });
};
```
