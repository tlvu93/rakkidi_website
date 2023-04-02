import { useEffect, useState } from 'react';
import { GET_PROJECTS } from '../queries/queries';
import client from '../apollo-client';
import {
  AllProjectResponse,
  ProjectCardData,
  ProjectCategory
} from 'feature/dashboard/interfaces';

const getProjects = async () => {
  const { data } = await client.query({
    query: GET_PROJECTS
  });

  return data;
};

const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      const data = await getProjects();
      setProjects(data);
    };
    fetchProject();
  }, []);

  return { projects, getProjects };
};

const useGroupedProjects = () => {
  const [groupedProjects, setGroupedProjects] = useState<ProjectCategory>({});

  useEffect(() => {
    getGroupedProjects();
  }, []);

  const getGroupedProjects = async () => {
    const { data }: { data: AllProjectResponse } = await client.query({
      query: GET_PROJECTS
    });

    const { allProject } = data;

    console.log(allProject);

    const grouped = allProject.reduce((acc, project) => {
      const { projectCategory } = project;
      const { name } = projectCategory;
      console.log(name);
      if (!acc[name]) {
        acc[name] = [];
      }
      acc[name].push(project);
      return acc;
    }, {} as ProjectCategory);

    setGroupedProjects(grouped);
  };

  return { groupedProjects };
};

export { useProjects, useGroupedProjects };