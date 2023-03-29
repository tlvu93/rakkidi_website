import { Grid } from '@mui/material';
import {
  CardGroupProps,
  ProjectGroupProps
} from 'feature/dashboard/interfaces';
import ProjectCard from 'feature/dashboard/project-card';

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
