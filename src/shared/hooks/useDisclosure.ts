import { useState } from 'react';

interface UseDisclosureReturn {
  opened: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const useDisclosure = (initialState = false): UseDisclosureReturn => {
  const [opened, setOpened] = useState(initialState);

  const open = (): void => setOpened(true);
  const close = (): void => setOpened(false);
  const toggle = (): void => setOpened((prev) => !prev);

  return { opened, open, close, toggle };
};

export default useDisclosure;
