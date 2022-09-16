interface ToggleDrawer {
  (open: boolean): (event: React.KeyboardEvent | React.MouseEvent) => void;
}

interface SidebarProps {
  drawerOpen: boolean;
  toggleDrawer: ToggleDrawer;
}

interface HeaderProps {
  toggleDrawer: ToggleDrawer
}

export interface SidebarLink {
    name: string;
    route: string;
    icon: JSX.Element;
  }
