import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  useTheme
} from '@mui/material';
import moment, { Moment } from 'moment';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import AppLayout from '@shared/layouts/app-layout';
import DateRangePicker from 'features/wmd-scraper/components/DateRangePicker';
import DownloadButtons from 'features/wmd-scraper/components/DownloadButtons';
import useLoginModal from 'features/wmd-scraper/components/LoginModal';
import ScraperProgressWS from 'features/wmd-scraper/components/ScraperProgressWS';
import useWMDService from 'features/wmd-scraper/hooks/useWMDService';

export type DateRange = {
  dateFrom: Moment | null;
  dateTo: Moment | null;
};

const defaultDateRange = {
  dateFrom: moment().subtract(1, 'months'),
  dateTo: moment()
};

const WMDScraper = (): React.ReactElement => {
  const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange);
  const [scrapingSuccess, setScrapingSuccess] = useState<boolean>(false);

  const {
    isAuthenticated,
    login,
    logout,
    getPDFsZipped,
    triggerScraper,
    setIsScraping,
    isScraping
  } = useWMDService();

  const theme = useTheme();
  const { LoginModal, handleOpen } = useLoginModal(isAuthenticated);

  const downloadPDFZipped = (): void => {
    if (!dateRange.dateFrom || !dateRange.dateTo) {
      toast.error('Please provide a date range');
      return;
    }

    getPDFsZipped(dateRange.dateFrom, dateRange.dateTo);
  };

  const submitTriggerScraper = (): void => {
    setScrapingSuccess(false);
    if (!dateRange.dateFrom || !dateRange.dateTo) {
      toast.error('Please provide a date range');
      return;
    }

    triggerScraper(dateRange.dateFrom, dateRange.dateTo);
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

                    <Button
                      variant="contained"
                      sx={{ width: '100%' }}
                      disabled={isScraping}
                      onClick={() => submitTriggerScraper()}
                    >
                      {isScraping ? (
                        <>Trigger Scraping...</>
                      ) : (
                        <>Trigger Scraping</>
                      )}
                    </Button>

                    <ScraperProgressWS
                      isScraping={isScraping}
                      setIsScraping={setIsScraping}
                      setScrapingSuccess={setScrapingSuccess}
                    />

                    {scrapingSuccess && (
                      <DownloadButtons downloadPDFZipped={downloadPDFZipped} />
                    )}

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
