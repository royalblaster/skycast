import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [data, setData] = useState<T>(() => {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : initialValue;
    } catch (e) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {}
  }, [key, data]);

  return [data, setData] as const;
}
