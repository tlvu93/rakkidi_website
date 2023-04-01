export interface ProjectCardData {
  id: string;
  category: string;
  image: string;
  title: string;
  description: string;
  weblinks?: { url: string; type: string }[];
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
