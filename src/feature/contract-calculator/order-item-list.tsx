import { Box, Grid } from '@mui/material';

import { useAppSelector } from 'hooks';
import FileDropzone from './file-dropzone';
import OrderItem from './order-Item';
import { selectOrders } from './order-slice';

const OrderList = () => {
  const orders = useAppSelector(selectOrders);

  return (
    <>
      {orders ? (
        <>
          <Grid container spacing={2} style={{ padding: 24 }}>
            {orders.map((currentOrder) => (
              <Grid key={currentOrder.id} item xs={12} sm={6} lg={4} xl={3}>
                <OrderItem order={currentOrder} />
              </Grid>
            ))}
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Box
                sx={{
                  backgroundColor: 'black',
                  height: '100%',
                  minHeight: '212px' // as big as a OrderItem Card is
                }}
              >
                <FileDropzone />
              </Box>
            </Grid>
          </Grid>
        </>
      ) : (
        'No Orders'
      )}
    </>
  );
};

export default OrderList;
