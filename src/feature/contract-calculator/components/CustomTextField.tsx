import { TextField, TextFieldProps } from '@mui/material';
import React, { FC } from 'react';

type Props = TextFieldProps;

const CustomTextField: FC<Props> = (props) => {
  return (
    <TextField
      fullWidth
      sx={{
        '& .MuiInputLabel-root': {
          color: '#535A6D'
        },
        '& .MuiOutlinedInput-root': {
          '& > fieldset': {
            borderColor: '#535A6D'
          }
        }
      }}
      {...props}
    />
  );
};

export default CustomTextField;
