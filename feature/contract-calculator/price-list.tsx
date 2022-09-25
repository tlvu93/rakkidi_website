import { Button, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Order } from 'interfaces/contract-calculator';
import { clearOrder, selectOrders } from './order-slice';

const PriceList = () => {
  const orders = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();

  const [price, setPrice] = useState(0);

  useEffect(() => {
    function getPrice(orders: Order[]) {
      let computedPrice = 0;
      orders.forEach((order) => {
        computedPrice +=
          Math.round((order.height * order.width * 40) / 10000) / 100;
      });

      setPrice(computedPrice);
    }

    getPrice(orders);
  }, [orders, price]);

  return (
    <div>
      {price ? (
        <Grid container spacing={2} style={{ padding: 24 }}>
          <Grid item xs={12} sm={12} lg={12} xl={12}>
            <Paper style={{ display: 'flex', padding: 24 }}>
              <Typography style={{ flexGrow: 1 }} variant="h4">
                Gesamtpreis: {(Math.round(price * 100) / 100).toFixed(2)}€
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => dispatch(clearOrder())}
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
