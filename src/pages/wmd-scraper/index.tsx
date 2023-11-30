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
import ScraperProgressWS from 'feature/wmd-scraper/components/ScraperProgressWS';

import useWMDService from 'feature/wmd-scraper/hooks/useWMDService';
import moment from 'moment';
import { Moment } from 'moment';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

export type DateRange = {
  dateFrom: Moment | null;
  dateTo: Moment | null;
};

const defaultDateRange = {
  dateFrom: moment().subtract(1, 'months'),
  dateTo: moment()
};

const WMDScraper = () => {
  const [dateRange, setDateRange] = React.useState<DateRange>(defaultDateRange);

  const { isAuthenticated, login, logout, getInvoicesZipped } = useWMDService();
  const theme = useTheme();
  const { LoginModal, handleOpen } = useLoginModal(isAuthenticated);

  const downloadInvoiceZipped = () => {
    if (!dateRange.dateFrom || !dateRange.dateTo) {
      toast.error('Please provide a date range');
      return;
    }

    getInvoicesZipped(dateRange.dateFrom, dateRange.dateTo);
  };

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
                    <DateRangePicker
                      dateRange={dateRange}
                      setDateRange={setDateRange}
                    />

                    <DownloadButtons
                      downloadInvoiceZipped={downloadInvoiceZipped}
                    />
                    <ScraperProgressWS />

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 4
                      }}
                    >
                      <Button color="error" onClick={() => logout()}>
                        Logout
                      </Button>
                    </Box>
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
