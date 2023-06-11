export type ProjectCardProps = {
  data: ProjectCardData;
};

export interface WeblinkData {
  url: string;
  type: string;
}

export interface ProjectCardData {
  id: string;
  category: string;
  image: string;
  title: string;
  description: string;
  weblinks?: WeblinkData[];
  tags: string[];
}

export interface CardGroupProps {
  projects: ProjectCardData[];
}

export interface ProjectCategory {
  [x: string]: ProjectCardData[];
}

export interface ProjectGroupProps {
  projects: ProjectCategory;
}
