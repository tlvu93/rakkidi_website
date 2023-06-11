import { ProjectCardData } from 'feature/dashboard/interfaces';

export type ProjectCardProps = {
  data: ProjectCardData;
};

export interface CardGroupProps {
  projects: ProjectCardData[];
}
