import { Box, Typography, Stack, Button } from '@mui/material';
import React from 'react';

type Props = {};

const DownloadButtons = (props: Props) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Download
      </Typography>
      <Stack spacing={2}>
        <Button variant="contained" sx={{ width: '100%' }}>
          DOWNLOAD AS ZIP
        </Button>
        <Button variant="contained" sx={{ width: '100%' }}>
          CSV
        </Button>
      </Stack>
    </Box>
  );
};

export default DownloadButtons;
