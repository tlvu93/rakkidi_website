import { Box } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import FileDropzone from 'feature/contract-calculator/file-dropzone';
import OrderList from 'feature/contract-calculator/order-item-list';
import { selectOrders } from 'feature/contract-calculator/order-slice';

import PriceList from 'feature/contract-calculator/price-list';
import React from 'react';

const ContractCalculator = () => {
  const orders = useAppSelector(selectOrders);

  const hidden = orders.length !== 0;

  return (
    <div>
      <Box sx={{ display: hidden ? 'flex' : 'none' }}>
        <OrderList />
      </Box>

      <PriceList />

      <Box sx={{ display: hidden ? 'none' : 'flex', height: '50vh' }}>
        <FileDropzone />
      </Box>
    </div>
  );
};

export default ContractCalculator;
