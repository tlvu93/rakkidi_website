import type { NextPage } from 'next';
import AppLayout from '@shared/layouts/app-layout';
import {
  AllProjectResponse,
  ProjectGroup as IProjectGroup
} from 'feature/dashboard/interfaces';
import ProjectGroup from 'feature/dashboard/project-group';
import client from 'services/sanity/apollo-client';
import { GET_PROJECTS } from 'services/sanity/queries/queries';
interface DashboardProps {
  pageProps: {
    groupedProjects: IProjectGroup;
  };
}

const Dashboard: NextPage<DashboardProps> = ({ pageProps }) => {
  const { groupedProjects } = pageProps;
  return (
    <AppLayout>
      {groupedProjects && <ProjectGroup projects={groupedProjects} />}
    </AppLayout>
  );
};

export async function getStaticProps() {
  const { data }: { data: AllProjectResponse } = await client.query({
    query: GET_PROJECTS
  });

  const { allProject } = data;

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
    },
    revalidate: 10
  };
}

export default Dashboard;
