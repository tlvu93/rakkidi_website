import { Box, Card, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import ColorButton from './components/ColorButton';

type Props = {};

const CustomOrder = (props: Props) => {
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
      <Typography variant="h5">Manuelle Eingabe</Typography>
      <TextField fullWidth label="Name" />
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        <TextField label="Height" />
        <TextField label="Width" />
      </Box>
      <ColorButton>
        <AddIcon />
        Hinzufügen
      </ColorButton>
    </Card>
  );
};

export default CustomOrder;
