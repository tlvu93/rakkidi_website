import { useState, useCallback } from 'react';

/**
 * Interface for the return value of useFlip hook
 */
export interface UseFlipReturn {
  /** Current flipped state */
  flipped: boolean;
  /** Function to toggle the flipped state */
  flipCard: () => void;
  /** Function to set a specific flipped state */
  setFlipped: (state: boolean) => void;
}

/**
 * A hook for managing flip card animations
 * @param initialState - Optional initial flipped state (default: false)
 * @returns Object containing flipped state and control functions
 *
 * @example
 * ```tsx
 * const MyFlipCard = () => {
 *   const { flipped, flipCard } = useFlip();
 *
 *   return (
 *     <div onClick={flipCard} style={{ transform: flipped ? 'rotateY(180deg)' : '' }}>
 *       <div>Front Content</div>
 *       <div>Back Content</div>
 *     </div>
 *   );
 * };
 * ```
 */
export const useFlip = (initialState = false): UseFlipReturn => {
  const [flipped, setFlipped] = useState<boolean>(initialState);

  const flipCard = useCallback(() => {
    setFlipped((prev) => !prev);
  }, []);

  return {
    flipped,
    flipCard,
    setFlipped
  };
};

export default useFlip;
