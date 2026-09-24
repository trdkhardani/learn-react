import { useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue !== null)
      return JSON.parse(storedValue);

    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, initialValue);
  }, [key, value]);

  return [value, setValue];
}