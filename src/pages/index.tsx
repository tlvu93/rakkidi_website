import { Typography } from '@mui/material';
import type { NextPage } from 'next';

import AppLayout from '@shared/layouts/app-layout';

const Home: NextPage = () => {
  return (
    <AppLayout>
      <Typography> This is my home</Typography>
    </AppLayout>
  );
};

export default Home;
