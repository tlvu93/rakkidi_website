import { Typography } from '@mui/material';
import AppLayout from 'layouts/app-layout';
import type { NextPage } from 'next';

const Dashboard: NextPage = () => {
  return (
    <AppLayout>
      <Typography> This is my Dashboard</Typography>
    </AppLayout>
  );
};

export default Dashboard;
