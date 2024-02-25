import { StandardTextFieldProps, TextField } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface FormInputProps extends StandardTextFieldProps {
  control: Control<any, any, any>;
  name: string;
  label: string;
}

const ControlledTextField = ({
  name,
  control,
  label,
  ...textFieldProps
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          error={!!error}
          helperText={error ? error.message : ''}
          {...textFieldProps}
        />
      )}
    />
  );
};

export default ControlledTextField;
