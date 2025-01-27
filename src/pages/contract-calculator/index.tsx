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
      <Box sx={{ height: '100vh', p: 2 }}>
        <OrderList />
      </Box>
    </AppLayout>
  );
};

export default ContractCalculator;
