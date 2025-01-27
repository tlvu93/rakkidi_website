import { zodResolver } from '@hookform/resolvers/zod';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Card,
  CardContent,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText
} from '@mui/material';
import React, {
  FC,
  ReactElement,
  SyntheticEvent,
  useCallback,
  useState
} from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';

import {
  Order,
  OrderSchema,
  OrderType
} from '@shared/interfaces/contract-calculator';
import { useAppDispatch } from 'hooks';

import { addOrder } from './order-slice';
import { getDimension } from './utility/getDimension';

interface CustomOrderProps {
  onItemAdded?: () => void;
}

const CustomOrder: FC<CustomOrderProps> = ({ onItemAdded }): ReactElement => {
  const dispatch = useAppDispatch();
  const [tabValue, setTabValue] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Order>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      type: OrderType.Folienplott
    }
  });

  const submitOrder = (order: Order): void => {
    dispatch(addOrder(order as Order));
    onItemAdded?.();
  };

  const handleTabChange = (_event: SyntheticEvent, newValue: number): void => {
    setTabValue(newValue);
  };

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]): void => {
      const promises = acceptedFiles.map(async (file) => {
        return getDimension(file);
      });
      // Filter out all errors
      const resolvedPromises = Promise.all(
        promises.map((p) => p.catch(() => 'FAILED'))
      ).then((values) => values.filter((v) => v !== 'FAILED'));

      resolvedPromises.then((returnedValues) => {
        returnedValues.forEach((value) => {
          dispatch(addOrder(value as Order));
        });
        if (returnedValues.length > 0) {
          onItemAdded?.();
        }
      });
    },
    [dispatch, onItemAdded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      '.eps': [],
      '.pdf': []
    }
  });

  return (
    <div>
      <div className="space-y-6">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              color: 'text.secondary',
              '&.Mui-selected': {
                color: 'text.primary'
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'primary.main'
            }
          }}
        >
          <Tab label="Upload" />
          <Tab label="Manual Entry" />
        </Tabs>

        {tabValue === 0 && (
          <Card
            sx={{
              border: isDragActive ? '2px dashed #1976d2' : undefined,
              width: '100%'
            }}
          >
            <CardContent
              {...getRootProps()}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 216, // Exact height to match Manual Entry
                padding: 3,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <input {...getInputProps()} />
              <CloudUploadIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
              <div style={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {isDragActive
                    ? 'Drop files here'
                    : 'Drop files here or click to upload'}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', mt: 1 }}
                >
                  Supported formats: .jpeg, .png, .pdf, .eps
                </Typography>
              </div>
            </CardContent>
          </Card>
        )}

        {tabValue === 1 && (
          <Card
            sx={{
              width: '100%'
            }}
          >
            <CardContent
              sx={{
                padding: 3,
                height: 216 // Match Upload area height
              }}
            >
              <form onSubmit={handleSubmit(submitOrder)}>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr 1fr',
                      gap: 16
                    }}
                  >
                    <TextField
                      label="Name"
                      {...register('name')}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                    <TextField
                      label="Amount"
                      type="text"
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      {...register('amount')}
                      error={!!errors.amount}
                      helperText={errors.amount?.message}
                    />
                    <FormControl error={!!errors.type}>
                      <InputLabel>Type</InputLabel>
                      <Select label="Type" {...register('type')}>
                        <MenuItem value={OrderType.Folienplott}>
                          Folienplott
                        </MenuItem>
                        <MenuItem value={OrderType.Banner}>Banner</MenuItem>
                        <MenuItem value={OrderType.PVC}>PVC</MenuItem>
                        <MenuItem value={OrderType.Custom}>Custom</MenuItem>
                      </Select>
                      {errors.type && (
                        <FormHelperText>{errors.type.message}</FormHelperText>
                      )}
                    </FormControl>
                  </div>

                  {watch('type') === OrderType.Custom && (
                    <TextField
                      label="Custom Price"
                      type="number"
                      {...register('customPrice')}
                      error={!!errors.customPrice}
                      helperText={errors.customPrice?.message}
                    />
                  )}

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 16
                    }}
                  >
                    <TextField
                      label="Height (mm)"
                      type="text"
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      {...register('height')}
                      error={!!errors.height}
                      helperText={errors.height?.message}
                    />
                    <TextField
                      label="Width (mm)"
                      type="text"
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      {...register('width')}
                      error={!!errors.width}
                      helperText={errors.width?.message}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    startIcon={<AddIcon />}
                  >
                    Add File
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CustomOrder;
