import { Box } from '@mui/material';
import { useAppSelector } from 'hooks';
import FileDropzone from 'feature/contract-calculator/file-dropzone';
import OrderList from 'feature/contract-calculator/order-item-list';
import { selectOrders } from 'feature/contract-calculator/order-slice';

import PriceList from 'feature/contract-calculator/price-list';
import AppLayout from '@shared/layouts/app-layout';
import React from 'react';
import CustomOrder from 'feature/contract-calculator/custom-order';

const ContractCalculator = () => {
  const orders = useAppSelector(selectOrders);

  const hidden = orders.length !== 0;

  return (
    <AppLayout>
      <Box sx={{ display: hidden ? 'flex' : 'none' }}>
        <OrderList />
      </Box>

      <Box sx={{ display: 'flex' }}>
        <FileDropzone />
        <CustomOrder />
      </Box>
      <PriceList />
    </AppLayout>
  );
};

export default ContractCalculator;
