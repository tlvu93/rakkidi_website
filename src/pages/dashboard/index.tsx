import { Grid } from '@mui/material';
import ProjectCard from 'feature/dashboard/project-card';
import AppLayout from '@shared/layouts/app-layout';
import type { NextPage } from 'next';
import { MOCK_CARDS } from './mock-data';

const Dashboard: NextPage = () => {
  return (
    <AppLayout>
      <Grid container justifyContent="center" alignItems="center" spacing={8}>
        {MOCK_CARDS.map((project) => (
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
    </AppLayout>
  );
};

export default Dashboard;
