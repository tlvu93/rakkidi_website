import { useEffect } from 'react';

export const useWindowResize = (callback: () => void): void => {
  useEffect(() => {
    window.addEventListener('resize', callback);
    return (): void => window.removeEventListener('resize', callback);
  }, [callback]);
};
