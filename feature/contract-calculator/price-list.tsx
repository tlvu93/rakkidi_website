import { useState, useEffect } from 'react';
import { Grid, Typography, Paper, Button } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import { FileWithDimension } from 'interfaces/ui';

const PriceList = () => {
  const orders: FileWithDimension[] = []; // TODO: Get from store
  const [price, setPrice] = useState(0);

  useEffect(() => {
    getPrice(orders);
  }, [orders]);

  function getPrice(orders: FileWithDimension[]) {
    let computedPrice = 0;
    orders.forEach((order) => {
      computedPrice +=
        Math.round((order.height * order.width * 40) / 10000) / 100;
    });
    setPrice(computedPrice);
  }

  return (
    <div>
      {price ? (
        <Grid container spacing={2} style={{ padding: 24 }}>
          <Grid item xs={12} sm={12} lg={12} xl={12}>
            <Paper style={{ display: 'flex', padding: 24 }}>
              <Typography style={{ flexGrow: 1 }} variant="h4">
                Gesamtpreis: {price}€
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  console.log('Clear order with redux');
                }}
                sx={{ margin: 1 }}
              >
                Clear All
              </Button>
            </Paper>
          </Grid>
        </Grid>
      ) : null}
    </div>
  );
};

export default PriceList;
