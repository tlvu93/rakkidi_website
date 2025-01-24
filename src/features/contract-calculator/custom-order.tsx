import { zodResolver } from '@hookform/resolvers/zod';
import AddIcon from '@mui/icons-material/Add';
import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

import ControlledTextField from '@shared/components/formControl/ControlledTextField';
import { Order, OrderSchema } from '@shared/interfaces/contract-calculator';
import { useAppDispatch } from 'hooks';

import ColorButton from './components/ColorButton';
import { addOrder } from './order-slice';


const CustomOrder = () => {
  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm<Order>({
    resolver: zodResolver(OrderSchema)
  });

  const submitOrder = (order: Order) => {
    dispatch(addOrder(order as Order));
  };

  return (
    <Card
      sx={{
        display: 'flex',
        width: '26rem',
        height: '20rem',
        padding: '2rem',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px'
      }}
    >
      <form onSubmit={handleSubmit(submitOrder)}>
        <Box display={'flex'} flexDirection={'column'} gap={2}>
          <Typography variant="h5">Manuelle Eingabe</Typography>

          <ControlledTextField control={control} name="name" label="Name" />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <ControlledTextField
              control={control}
              name="height"
              label="Height"
              type="number"
            />
            <ControlledTextField
              control={control}
              name="width"
              label="Width"
              type="number"
            />
          </Box>
          <ColorButton type="submit" color="secondary">
            <AddIcon />
            Hinzufügen
          </ColorButton>
        </Box>
      </form>
    </Card>
  );
};

export default CustomOrder;
