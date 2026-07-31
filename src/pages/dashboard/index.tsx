import { Box, Typography } from '@mui/material';
import type { NextPage } from 'next';

import PageMeta from '@shared/components/page-meta/page-meta';
import AppLayout from '@shared/layouts/app-layout';
import {
  AllProjectResponse,
  ProjectGroup as IProjectGroup
} from 'features/dashboard/interfaces';
import ProjectGroup from 'features/dashboard/project-group';
import client from 'services/sanity/apollo-client';
import { GET_PROJECTS } from 'services/sanity/queries/queries';
interface DashboardProps {
  pageProps: {
    groupedProjects: IProjectGroup;
  };
}

const Dashboard: NextPage<DashboardProps> = ({ pageProps }) => {
  const { groupedProjects } = pageProps;
  const hasProjects = Object.keys(groupedProjects ?? {}).length > 0;

  return (
    <AppLayout>
      <PageMeta title="Dashboard" />
      {/* A failed or empty Sanity query used to render a completely blank
          <main> with no explanation. */}
      {hasProjects ? (
        <ProjectGroup projects={groupedProjects} />
      ) : (
        <Box role="status" sx={{ py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Projects
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            No projects could be loaded right now. Please try again later.
          </Typography>
        </Box>
      )}
    </AppLayout>
  );
};

export async function getStaticProps(): Promise<{
  props: { groupedProjects: IProjectGroup };
}> {
  const { data } = await client.query<AllProjectResponse>({
    query: GET_PROJECTS
  });

  // Apollo Client 4 types `data` as possibly undefined, so a failed or empty
  // response no longer blows up the build with a destructuring TypeError.
  const allProject = data?.allProject ?? [];

  const groupedProjects = allProject.reduce((acc, project) => {
    const { projectCategory } = project;
    const { name } = projectCategory;

    if (!acc[name]) {
      acc[name] = [];
    }
    acc[name].push(project);
    return acc;
  }, {} as IProjectGroup);

  return {
    props: {
      groupedProjects
    }
  };
}

export default Dashboard;
