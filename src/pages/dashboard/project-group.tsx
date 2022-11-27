import { Grid } from '@mui/material';
import ProjectCard, { ProjectCardData } from 'feature/dashboard/project-card';

export interface ProjectCategory {
  [x: string]: ProjectCardData[];
}

interface CardGroupProps {
  projects: ProjectCardData[];
}

const CardRow = ({ projects }: CardGroupProps) => {
  return (
    <>
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
    </>
  );
};

const ProjectGroup = ({
  cardSortedByCategory
}: {
  cardSortedByCategory: ProjectCategory;
}) => {
  return (
    <>
      {Object.entries(cardSortedByCategory).map((category) => (
        <>
          <h1>{category[0]}</h1>
          <Grid container spacing={4}>
            <CardRow key={category[0]} projects={category[1]} />
          </Grid>
        </>
      ))}
    </>
  );
};
export default ProjectGroup;
