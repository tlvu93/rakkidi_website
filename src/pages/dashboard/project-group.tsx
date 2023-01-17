import { Grid } from '@mui/material';
import ProjectCard, { ProjectCardData } from 'feature/dashboard/project-card';

export interface ProjectCategory {
  [x: string]: ProjectCardData[];
}

interface CardGroupProps {
  projects: ProjectCardData[];
}

const ProjectCardRow = ({ projects }: CardGroupProps) => (
  <Grid container spacing={4}>
    {projects.map((project) => (
      <Grid
        key={project.title}
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

type ProjectGroupProps = {
  projects: ProjectCategory;
};

const ProjectGroup = ({ projects }: ProjectGroupProps) => {
  return (
    <>
      {Object.entries(projects).map(([category, projects]) => (
        <>
          <h1 key={category}>{category}</h1>
          <ProjectCardRow projects={projects} />
        </>
      ))}
    </>
  );
};
export default ProjectGroup;
