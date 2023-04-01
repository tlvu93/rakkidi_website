import AppLayout from '@shared/layouts/app-layout';
import type { NextPage } from 'next';
import { MOCK_CARDS } from '../../mock-data';
import ProjectGroup from '../../feature/dashboard/project-group';
import { ProjectCategory } from 'feature/dashboard/interfaces';
import { useEffect, useState } from 'react';

const Dashboard: NextPage = () => {
  const [groupedProjects, setGroupedProjects] = useState<ProjectCategory>({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    setIsDataLoaded(true);
  }, []);

  useEffect(() => {
    const projectsGroupedByCategory = MOCK_CARDS.reduce((acc, project) => {
      const { category } = project;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(project);
      return acc;
    }, {} as ProjectCategory);

    setGroupedProjects(projectsGroupedByCategory);
  }, [isDataLoaded]);

  return (
    <AppLayout>
      <ProjectGroup projects={groupedProjects} />
    </AppLayout>
  );
};

export default Dashboard;
