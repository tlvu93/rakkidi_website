import type { ReactElement } from 'react';

/** Toggles the navigation drawer between its open and closed state. */
export type ToggleDrawer = () => void;

/** A single entry in the sidebar navigation. */
export interface SidebarLink {
  /** Label shown in the drawer. */
  name: string;
  /** Route the entry navigates to. */
  route: string;
  /** Icon rendered next to the label. */
  icon: ReactElement;
}
