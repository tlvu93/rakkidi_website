import React from 'react';

import { ButtonProps, styled, Button } from '@mui/material';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.primary.contrastText,

  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

export default ColorButton;
