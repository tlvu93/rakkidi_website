import { Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React from 'react';

type Props = {};

const DateRangePicker = (props: Props) => {
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
        <DatePicker sx={{ width: '100%' }} />
      </Grid>

      <Grid item sm={6}>
        <DatePicker sx={{ width: '100%' }} />
      </Grid>
    </Grid>
  );
};

export default DateRangePicker;
