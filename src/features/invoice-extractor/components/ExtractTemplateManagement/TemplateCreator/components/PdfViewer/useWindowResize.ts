import { useEffect, useCallback } from 'react';

const useWindowResize = (callback: () => void) => {
  const memoizedCallback = useCallback(callback, [callback]);

  useEffect(() => {
    const handleResize = () => {
      memoizedCallback();
    };

    window.addEventListener('resize', handleResize);

    // Call the callback once on mount to set initial dimensions
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [memoizedCallback]);
};

export default useWindowResize;
