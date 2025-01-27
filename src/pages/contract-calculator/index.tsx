import { Box } from '@mui/material';
import React from 'react';

import AppLayout from '@shared/layouts/app-layout';
import OrderList from 'features/contract-calculator/order-item-list';

const ContractCalculator = (): React.ReactElement => {
  return (
    <AppLayout>
      <Box sx={{ height: '100vh', p: 2 }}>
        <OrderList />
      </Box>
    </AppLayout>
  );
};

export default ContractCalculator;
