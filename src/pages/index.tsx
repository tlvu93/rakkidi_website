import { Typography } from '@mui/material';
import AppLayout from '@shared/layouts/app-layout';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <AppLayout>
      <Typography> This is my home</Typography>
    </AppLayout>
  );
};

export default Home;
