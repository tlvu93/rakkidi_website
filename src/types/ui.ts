import { ReactElement, KeyboardEvent, MouseEvent } from 'react';

/**
 * Function type for handling drawer toggle events
 * @param open - Boolean indicating whether to open or close the drawer
 * @returns Event handler function for keyboard and mouse events
 */
export type ToggleDrawerHandler = (
  open: boolean
) => (event: KeyboardEvent | MouseEvent) => void;

/**
 * Represents a navigation link in the sidebar
 * @interface SidebarLink
 */
export interface SidebarLink {
  /** Display name of the link */
  name: string;
  /** Route/path the link navigates to */
  route: string;
  /** Icon element to display next to the link */
  icon: ReactElement;
}

/**
 * Props for components that can trigger drawer toggle
 */
export interface DrawerToggleProps {
  /** Handler function for toggling the drawer */
  onToggle: ToggleDrawerHandler;
  /** Current open state of the drawer */
  isOpen: boolean;
}
