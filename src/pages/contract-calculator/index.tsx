import { Box, Typography } from '@mui/material';
import React from 'react';

import AppLayout from '@shared/layouts/app-layout';
import CustomOrder from 'features/contract-calculator/custom-order';
import OrderList from 'features/contract-calculator/order-item-list';
import { selectOrders } from 'features/contract-calculator/order-slice';
import { useAppSelector } from 'hooks';

const ContractCalculator = (): React.ReactElement => {
  const orders = useAppSelector(selectOrders);

  const hidden = orders.length === 0;

  return (
    <AppLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {hidden && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3">Contract Calculator</Typography>
            <Typography variant="body1">
              Calculate your orders easily by dragging your files into the
              upload area or entering dimensions manually.
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CustomOrder />
        </Box>

        <Box sx={{ width: '100%' }}>
          <OrderList />
        </Box>
      </Box>
    </AppLayout>
  );
};

export default ContractCalculator;
