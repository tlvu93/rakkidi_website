interface ToggleDrawer {
  (open: boolean): (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export interface SidebarLink {
  name: string;
  route: string;
  icon: JSX.Element;
}
