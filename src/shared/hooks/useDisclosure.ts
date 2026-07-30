import { useCallback, useMemo, useState } from 'react';

export interface UseDisclosureReturn {
  /** Whether the disclosure is currently open. */
  opened: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/** Boolean open/closed state with stable, memoised control callbacks. */
const useDisclosure = (initialState = false): UseDisclosureReturn => {
  const [opened, setOpened] = useState(initialState);

  const open = useCallback((): void => setOpened(true), []);
  const close = useCallback((): void => setOpened(false), []);
  const toggle = useCallback((): void => setOpened((prev) => !prev), []);

  return useMemo(
    () => ({ opened, open, close, toggle }),
    [opened, open, close, toggle]
  );
};

export default useDisclosure;
