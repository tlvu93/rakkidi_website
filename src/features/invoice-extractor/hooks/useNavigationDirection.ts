import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Direction = 'forward' | 'backward';

export const useNavigationDirection = (): Direction => {
  const router = useRouter();
  const [direction, setDirection] = useState<Direction>('forward');

  useEffect(() => {
    const handleRouteChange = (url: string): void => {
      // If going back to the main invoice-extractor page
      if (url === '/invoice-extractor') {
        setDirection('backward');
      } else {
        setDirection('forward');
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return (): void => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return direction;
};
