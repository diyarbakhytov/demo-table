import { useEffect, useEffectEvent, useRef } from "react";

export function useDebouncedCallback<T extends (...args: never[]) => unknown>(
  callback: T,
  delay: number
) {
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(
    () => () => {
      if (!debounceTimerRef.current) return;

      clearTimeout(debounceTimerRef.current);
    },
    []
  );

  const setValue = useEffectEvent((...args: Parameters<T>) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => callback(...args), delay);
  });

  return setValue;
}
