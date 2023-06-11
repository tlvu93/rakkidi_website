export interface WeblinkData {
  url: string;
  type: {
    title: string;
  };
}

export interface ProjectCardData {
  _id: string;
  projectCategory: ProjectCategory;
  coverImage?: string;
  title: string;
  description: string;
  weblinks?: WeblinkData[];
  tags: Tags[];
}

export interface Tags {
  title: string;
}

export interface ProjectCategory {
  name: string;
}

export interface ProjectGroupProps {
  projects: ProjectCategory;
}

export interface AllProjectResponse {
  allProject: ProjectCardData[];
}
