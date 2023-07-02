import { Box, Typography } from '@mui/material';
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <Box sx={{ textAlign: 'center', display: hidden ? 'none' : 'block' }}>
          <Typography variant="h3">Aufträge Berechnen</Typography>
          <Typography variant="body1">
            Berechnen Sie Ihre Auftragsberechnung spielend leicht,
            <br /> indem Sie Ihre Auftragsdatei problemlos in das dafür
            vorgesehene Feld ziehen.
          </Typography>
        </Box>
        <div style={{ display: hidden ? 'flex' : 'none' }}>
          <OrderList />
        </div>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            alignContent: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2
          }}
        >
          <FileDropzone />
          <CustomOrder />
        </Box>
        <PriceList />
      </Box>
    </AppLayout>
  );
};

export default ContractCalculator;
