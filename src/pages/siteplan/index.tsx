import { Typography } from '@mui/material';
import React from 'react';

import PageMeta from '@shared/components/page-meta/page-meta';
import AppLayout from '@shared/layouts/app-layout';

const SitePlan = (): React.ReactElement => {
  return (
    <AppLayout>
      <PageMeta title="Site plan" />
      <Typography variant="h4" component="h1" gutterBottom>
        Site plan
      </Typography>
      <Typography sx={{ color: 'text.secondary' }}>
        This tool has not been built yet.
      </Typography>
    </AppLayout>
  );
};

export default SitePlan;
