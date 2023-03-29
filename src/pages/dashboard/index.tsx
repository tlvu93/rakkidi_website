import AppLayout from '@shared/layouts/app-layout';
import type { NextPage } from 'next';
import { MOCK_CARDS } from '../../mock-data';
import ProjectGroup from '../../feature/dashboard/project-group';
import { ProjectCategory } from 'feature/dashboard/interfaces';

const Dashboard: NextPage = () => {
  const projects = MOCK_CARDS;

  const projectsGroupedByCategory = projects.reduce((acc, project) => {
    const category = project.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(project);
    return acc;
  }, {} as ProjectCategory);

  return (
    <AppLayout>
      <ProjectGroup projects={projectsGroupedByCategory} />
    </AppLayout>
  );
};

export default Dashboard;
