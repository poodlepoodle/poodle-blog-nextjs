import { useEffect, useCallback } from 'react';

export const useKeyboardAction = (keyMaps: Record<string, () => void>) => {
  const handleKeyEvent = useCallback(
    (event: KeyboardEvent) => {
      const callback = keyMaps[event.key];
      if (callback) {
        event.preventDefault();
        callback();
      }
    },
    [keyMaps]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyEvent);
    };
  }, [handleKeyEvent]);
};
