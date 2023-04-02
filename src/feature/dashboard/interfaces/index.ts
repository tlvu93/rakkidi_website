export interface WeblinkData {
  url: string;
  type: string;
}

export interface ProjectCardData {
  id: string;
  projectCategory: { name: string };
  image: string;
  title: string;
  description: string;
  weblinks?: WeblinkData[];
  tags: string[];
}

export interface ProjectCategory {
  [x: string]: ProjectCardData[];
}

export interface ProjectGroupProps {
  projects: ProjectCategory;
}

export interface AllProjectResponse {
  allProject: ProjectCardData[];
}
