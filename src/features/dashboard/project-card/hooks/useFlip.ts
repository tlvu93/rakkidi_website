import { useState } from 'react';

const useFlip = () => {
  const [flipped, setFlipped] = useState(false);

  const flipCard = () => {
    setFlipped(!flipped);
  };

  return { flipped, flipCard };
};

export default useFlip;
