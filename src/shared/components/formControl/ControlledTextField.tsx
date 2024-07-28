import { StandardTextFieldProps, TextField } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> extends StandardTextFieldProps {
  control: Control<T>;
  name: string;
  label: string;
}

const ControlledTextField = <T extends FieldValues>({
  name,
  control,
  label,
  ...textFieldProps
}: FormInputProps<T>) => {
  return (
    <Controller
      name={name as Path<T>}
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
