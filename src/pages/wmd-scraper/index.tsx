import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import AppLayout from '@shared/layouts/app-layout';
import DateRangePicker from 'feature/wmd-scraper/components/DateRangePicker';
import DownloadButtons from 'feature/wmd-scraper/components/DownloadButtons';
import React from 'react';

type Props = {};

const WMDScraper = (props: Props) => {
  const theme = useTheme();
  return (
    <AppLayout>
      <Container maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Einfaches Tool um WMD Rechnungen runterzuladen
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Paper
              sx={{
                padding: '1.5rem',
                backgroundColor: theme.palette.background.paper,
                gap: 2,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <DateRangePicker />

              <DownloadButtons />
            </Paper>
          </Box>
        </Box>
      </Container>
    </AppLayout>
  );
};

export default WMDScraper;
