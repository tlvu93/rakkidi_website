import { Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React from 'react';
import moment from 'moment';

type Props = {};

const DateRangePicker = (props: Props) => {
  // Get current date
  const currentDate = moment();
  const oneMonthBefore = moment().subtract(1, 'months');
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
        <DatePicker sx={{ width: '100%' }} defaultValue={oneMonthBefore} />
      </Grid>

      <Grid item sm={6}>
        <DatePicker sx={{ width: '100%' }} defaultValue={currentDate} />
      </Grid>
    </Grid>
  );
};

export default DateRangePicker;
