import AppLayout from '@shared/layouts/app-layout';
import type { NextPage } from 'next';
import { MOCK_CARDS } from '../../mock-data';
import ProjectGroup, { ProjectCategory } from './project-group';
import { useMemo } from 'react';

const Dashboard: NextPage = () => {
  const projects = MOCK_CARDS;

  const projectsSortedByCategory = useMemo(() => {
    return projects.reduce((acc, project) => {
      const category = project.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(project);
      return acc;
    }, {} as ProjectCategory);
  }, [projects]);

  return (
    <AppLayout>
      <ProjectGroup projects={projectsSortedByCategory} />
    </AppLayout>
  );
};

export default Dashboard;
