import { Typography } from '@mui/material';
import React from 'react';

import PageMeta from '@shared/components/page-meta/page-meta';
import AppLayout from '@shared/layouts/app-layout';

const StickerMaker = (): React.ReactElement => {
  return (
    <AppLayout>
      <PageMeta title="Sticker maker" />
      <Typography variant="h4" component="h1" gutterBottom>
        Sticker maker
      </Typography>
      <Typography sx={{ color: 'text.secondary' }}>
        This tool has not been built yet.
      </Typography>
    </AppLayout>
  );
};

export default StickerMaker;
