import { useEffect, useRef } from 'react';

export function usePrevious(value) {
  const ref = useRef();

  const previousValue = ref.current;

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return previousValue;
}