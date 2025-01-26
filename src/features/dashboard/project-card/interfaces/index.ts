import { ProjectCardData } from 'features/dashboard/interfaces';

export type ProjectCardProps = {
  data: ProjectCardData;
};

export interface CardGroupProps {
  projects: ProjectCardData[];
}
