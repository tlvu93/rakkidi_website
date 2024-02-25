import { Box, Card, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { zodResolver } from '@hookform/resolvers/zod';
import ControlledTextField from '@shared/components/formControl/ControlledTextField';
import React from 'react';
import { Order, OrderSchema } from '@shared/interfaces/contract-calculator';
import ColorButton from './components/ColorButton';
import { useAppDispatch } from 'hooks';
import { addOrder } from './order-slice';

import { useForm } from 'react-hook-form';

type Props = {};

const CustomOrder = (props: Props) => {
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
