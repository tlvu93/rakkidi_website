import AppLayout from '@shared/layouts/app-layout';
import type { NextPage } from 'next';
import ProjectGroup from '../../feature/dashboard/project-group';

import { useGroupedProjects } from 'services/sanity/hooks/useProjects';

const Dashboard: NextPage = () => {
  const { groupedProjects } = useGroupedProjects();

  return (
    <AppLayout>
      <ProjectGroup projects={groupedProjects} />
    </AppLayout>
  );
};

export default Dashboard;
