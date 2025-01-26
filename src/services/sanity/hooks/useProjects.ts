import { useEffect, useState } from 'react';

import {
  AllProjectResponse,
  ProjectGroup,
  ProjectCardData
} from 'features/dashboard/interfaces';

import client from '../apollo-client';
import { GET_PROJECTS } from '../queries/queries';

interface UseProjectsReturn {
  projects: ProjectCardData[];
  getProjects: () => Promise<AllProjectResponse>;
}

interface UseGroupedProjectsReturn {
  groupedProjects: ProjectGroup;
}

const getProjects = async (): Promise<AllProjectResponse> => {
  const { data } = await client.query({
    query: GET_PROJECTS
  });

  return data;
};

export const getGroupedProjects = async (): Promise<ProjectGroup> => {
  const { data }: { data: AllProjectResponse } = await client.query({
    query: GET_PROJECTS
  });

  const { allProject } = data;

  const grouped = allProject.reduce((acc, project) => {
    const { projectCategory } = project;
    const { name } = projectCategory;

    if (!acc[name]) {
      acc[name] = [];
    }
    acc[name].push(project);
    return acc;
  }, {} as ProjectGroup);

  return grouped;
};

const useProjects = (): UseProjectsReturn => {
  const [projects, setProjects] = useState<ProjectCardData[]>([]);

  useEffect(() => {
    const fetchProject = async (): Promise<void> => {
      const data = await getProjects();
      setProjects(data.allProject);
    };
    fetchProject();
  }, []);

  return { projects, getProjects };
};

const useGroupedProjects = (): UseGroupedProjectsReturn => {
  const [groupedProjects, setGroupedProjects] = useState<ProjectGroup>(
    {} as ProjectGroup
  );

  useEffect(() => {
    const fetchGroupedProjects = async (): Promise<void> => {
      setGroupedProjects(await getGroupedProjects());
    };
    fetchGroupedProjects();
  }, []);

  return { groupedProjects };
};

export { useProjects, useGroupedProjects };
