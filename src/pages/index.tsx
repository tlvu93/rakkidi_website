import { Typography } from '@mui/material';
import type { NextPage } from 'next';

import PageMeta from '@shared/components/page-meta/page-meta';
import AppLayout from '@shared/layouts/app-layout';

const Home: NextPage = () => {
  return (
    <AppLayout>
      <PageMeta title="Home" />
      <Typography variant="h4" component="h1" gutterBottom>
        Rakkidi
      </Typography>
      <Typography sx={{ color: 'text.secondary' }}>
        A small collection of in-house tools. Pick one from the sidebar to get
        started.
      </Typography>
    </AppLayout>
  );
};

export default Home;
