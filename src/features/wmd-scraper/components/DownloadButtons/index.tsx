import { Box, Typography, Stack, Button } from '@mui/material';
import React from 'react';

type Props = {
  downloadPDFZipped: () => void;
};

const DownloadButtons = ({ downloadPDFZipped }: Props): React.ReactElement => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Download
      </Typography>
      <Stack spacing={2}>
        <Button
          variant="contained"
          sx={{ width: '100%' }}
          onClick={() => downloadPDFZipped()}
          color="secondary"
        >
          DOWNLOAD AS ZIP
        </Button>
        <Button variant="contained" sx={{ width: '100%' }} color="secondary">
          CSV
        </Button>
      </Stack>
    </Box>
  );
};

export default DownloadButtons;
