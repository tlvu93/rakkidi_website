import { Box, Typography, Stack, Button } from '@mui/material';
import React from 'react';

type Props = {
  downloadInvoiceZipped: () => void;
};

const DownloadButtons = ({ downloadInvoiceZipped }: Props) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Download
      </Typography>
      <Stack spacing={2}>
        <Button
          variant="contained"
          sx={{ width: '100%' }}
          onClick={() => downloadInvoiceZipped()}
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
