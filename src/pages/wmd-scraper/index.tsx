import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  useTheme
} from '@mui/material';

import AppLayout from '@shared/layouts/app-layout';
import DateRangePicker from 'feature/wmd-scraper/components/DateRangePicker';
import DownloadButtons from 'feature/wmd-scraper/components/DownloadButtons';
import useLoginModal from 'feature/wmd-scraper/components/LoginModal';

import useAuth from 'feature/wmd-scraper/hooks/useAuth';
import React from 'react';

type Props = {};

const WMDScraper = (props: Props) => {
  const { isAuthenticated, login } = useAuth();
  const theme = useTheme();
  const { LoginModal, handleOpen } = useLoginModal(isAuthenticated);
  return (
    <>
      <AppLayout>
        <LoginModal login={login} />
        <Container maxWidth="sm">
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
            <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
              <Paper
                sx={{
                  padding: '1.5rem',
                  backgroundColor: theme.palette.background.paper,
                  gap: 2,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {isAuthenticated ? (
                  <>
                    <DateRangePicker />

                    <DownloadButtons />
                  </>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpen()}
                  >
                    Login
                  </Button>
                )}
              </Paper>
            </Box>
          </Box>
        </Container>
      </AppLayout>
    </>
  );
};

export default WMDScraper;
