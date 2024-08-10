export interface WeblinkData {
  url: string;
  type: {
    title: string;
  };
}

export interface Tags {
  title: string;
}

export interface ProjectCategory {
  name: string;
}
export interface ProjectCardData {
  _id: string;
  projectCategory: ProjectCategory;
  coverImage?: { asset: { url: string } };
  title: string;
  description: string;
  weblinks?: WeblinkData[];
  tags?: Tags[];
}

export interface ProjectGroup {
  [key: string]: ProjectCardData[];
}

export interface ProjectGroupProps {
  projects: ProjectGroup;
}

export interface AllProjectResponse {
  allProject: ProjectCardData[];
}

export interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}
