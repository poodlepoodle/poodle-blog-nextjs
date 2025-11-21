import { useEffect, useState } from 'react';

interface UseDebouncedStateProps {
  value: unknown;
  delay?: number;
}

export const useDebouncedState = ({
  value,
  delay = 500,
}: UseDebouncedStateProps) => {
  const [debouncedValue, setDebouncedValue] = useState<unknown>(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
