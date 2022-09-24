import React from 'react';
import { Grid } from '@mui/material';

import OrderItem from './order-Item';
import { Order } from 'interfaces/contract-calculator';

const OrderList = () => {
  const orders: Order[] = []; // TODO get orders from redux

  return (
    <div>
      {orders ? (
        <div>
          <Grid container spacing={2} style={{ padding: 24 }}>
            {orders.map((currentOrder) => (
              <Grid key={currentOrder.name} item xs={12} sm={6} lg={4} xl={3}>
                <OrderItem
                  order={currentOrder}
                  remove={(order: Order) => {
                    console.log('redux remove function');
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        'No Orders'
      )}
    </div>
  );
};

export default OrderList;
