import { Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React from 'react';
import { Moment } from 'moment';
import { DateRange } from '@pages/wmd-scraper';

type Props = {
  dateRange: DateRange;
  setDateRange: (dateRange: DateRange) => void;
};

const DateRangePicker = ({ dateRange, setDateRange }: Props) => {
  const setDateFrom = (newValue: Moment | null) => {
    setDateRange({ ...dateRange, dateFrom: newValue });
  };

  const setDateTo = (newValue: Moment | null) => {
    setDateRange({ ...dateRange, dateTo: newValue });
  };

  return (
    <Grid container spacing={2}>
      <Grid item sm={6}>
        <Typography variant="h6" gutterBottom>
          Date from
        </Typography>
      </Grid>
      <Grid item sm={6}>
        <Typography variant="h6" gutterBottom>
          Date to
        </Typography>
      </Grid>
      <Grid item sm={6}>
        <DatePicker
          sx={{ width: '100%' }}
          value={dateRange.dateFrom}
          onChange={setDateFrom}
        />
      </Grid>

      <Grid item sm={6}>
        <DatePicker
          sx={{ width: '100%' }}
          value={dateRange.dateTo}
          onChange={setDateTo}
        />
      </Grid>
    </Grid>
  );
};

export default DateRangePicker;
