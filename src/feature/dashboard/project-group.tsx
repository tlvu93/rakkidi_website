import { Grid } from '@mui/material';

import ProjectCard from 'feature/dashboard/project-card/project-card';
import { CardGroupProps } from './project-card/interfaces';
import { ProjectGroupProps } from './interfaces';

const ProjectCardRow = ({ projects }: CardGroupProps) => (
  <Grid container spacing={4}>
    {projects.map((project) => (
      <Grid
        key={project.id}
        item
        xs={12}
        md={12}
        lg={6}
        xl={4}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <ProjectCard data={project} />
      </Grid>
    ))}
  </Grid>
);

const ProjectGroup = ({ projects }: ProjectGroupProps) => {
  console.log(projects);
  return (
    <>
      {Object.entries(projects).map(([category, projects]) => (
        <div key={category}>
          <h1>{category}</h1>
          <ProjectCardRow projects={projects} />
        </div>
      ))}
    </>
  );
};
export default ProjectGroup;
