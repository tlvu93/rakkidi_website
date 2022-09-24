import React from 'react';
import { Grid } from '@mui/material';

import Order from './order';
import { FileWithDimension } from 'interfaces/ui';

const OrderList = () => {
  const orders: FileWithDimension[] = []; // TODO get orders from redux

  return (
    <div>
      {orders ? (
        <div>
          <Grid container spacing={2} style={{ padding: 24 }}>
            {orders.map((currentOrder) => (
              <Grid key={currentOrder.name} item xs={12} sm={6} lg={4} xl={3}>
                <Order
                  order={currentOrder}
                  remove={() => {
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
