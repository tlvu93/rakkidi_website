import { Box, Card, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import CustomTextField from './components/CustomTextField';
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
      <Typography>Manuelle Eingabe</Typography>
      <CustomTextField label="Name" />
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        <CustomTextField label="Height" />
        <CustomTextField label="Width" />
      </Box>
      <ColorButton>
        <AddIcon />
        Hinzufügen
      </ColorButton>
    </Card>
  );
};

export default CustomOrder;
