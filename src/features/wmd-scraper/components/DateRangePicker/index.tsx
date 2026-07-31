import { Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Moment } from 'moment';
import React from 'react';

import { DateRange } from '@pages/wmd-scraper';

type Props = {
  dateRange: DateRange;
  setDateRange: (dateRange: DateRange) => void;
};

const DateRangePicker = ({
  dateRange,
  setDateRange
}: Props): React.ReactElement => {
  const setDateFrom = (newValue: Moment | null): void => {
    setDateRange({ ...dateRange, dateFrom: newValue });
  };

  const setDateTo = (newValue: Moment | null): void => {
    setDateRange({ ...dateRange, dateTo: newValue });
  };

  // The captions used to be standalone <h6> headings in a separate Grid row,
  // so neither picker had a programmatic label. Using the picker's own `label`
  // keeps the same visible text but wires it to the input.
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <DatePicker
          label="Date from"
          sx={{ width: '100%' }}
          value={dateRange.dateFrom}
          onChange={setDateFrom}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <DatePicker
          label="Date to"
          sx={{ width: '100%' }}
          value={dateRange.dateTo}
          onChange={setDateTo}
        />
      </Grid>
    </Grid>
  );
};

export default DateRangePicker;
