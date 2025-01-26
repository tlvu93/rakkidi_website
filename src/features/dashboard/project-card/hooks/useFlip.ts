import { useState } from 'react';

interface FlipResult {
  flipped: boolean;
  flipCard: () => void;
}

const useFlip = (): FlipResult => {
  const [flipped, setFlipped] = useState(false);

  const flipCard = (): void => {
    setFlipped(!flipped);
  };

  return { flipped, flipCard };
};

export default useFlip;
