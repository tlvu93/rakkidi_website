import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Typography,
  Box,
  Divider
} from '@mui/material';
import { ReactElement, useState, useEffect } from 'react';

import { Order } from '@shared/interfaces/contract-calculator';
import { useAppDispatch, useAppSelector } from 'hooks';

import { selectOrders, removeOrder, clearOrder } from './order-slice';

const OrderList = (): ReactElement => {
  const orders = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    setDate(new Date().toISOString().split('T')[0]);
  }, []);

  const calculatePrice = (height: number, width: number): number => {
    return Number((((height * width) / 10000) * 0.04).toFixed(2));
  };

  const totalPrice = orders.reduce(
    (sum, order) => sum + calculatePrice(order.height, order.width),
    0
  );

  return (
    <Card sx={{ mt: 2, maxWidth: 800, mx: 'auto' }}>
      <CardContent>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              INVOICE
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date: {date || '---'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Invoice #: INV-2025-001
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" color="text.secondary">
              Your Company Name
            </Typography>
            <Typography variant="body2" color="text.secondary">
              123 Business St
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Business City, 12345
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Table sx={{ minHeight: 400 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Item Description
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Dimensions</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                  }}
                >
                  Price
                  <Tooltip title="Price is calculated as (height * width / 10000) * 0.04€">
                    <InfoIcon
                      sx={{ ml: 1, fontSize: 16, color: 'text.secondary' }}
                    />
                  </Tooltip>
                </div>
              </TableCell>
              <TableCell width={50} />
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: 'text.disabled' }}>-</TableCell>
                  <TableCell sx={{ color: 'text.disabled' }}>-</TableCell>
                  <TableCell sx={{ color: 'text.disabled' }} align="right">
                    -
                  </TableCell>
                  <TableCell />
                </TableRow>
              ))
            ) : (
              <>
                {orders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>
                      {order.height}mm × {order.width}mm
                    </TableCell>
                    <TableCell align="right" sx={{ fontFamily: 'monospace' }}>
                      {calculatePrice(order.height, order.width).toFixed(2)}€
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => dispatch(removeOrder(order.id))}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {/* Fill remaining space with empty rows */}
                {Array.from({ length: Math.max(0, 5 - orders.length) }).map(
                  (_, index) => (
                    <TableRow key={`empty-${index}`}>
                      <TableCell sx={{ color: 'text.disabled' }}>-</TableCell>
                      <TableCell sx={{ color: 'text.disabled' }}>-</TableCell>
                      <TableCell sx={{ color: 'text.disabled' }} align="right">
                        -
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  )
                )}
              </>
            )}
            <TableRow
              sx={{
                borderTop: 2,
                backgroundColor: 'action.hover',
                '& td': { fontWeight: 'bold' }
              }}
            >
              <TableCell colSpan={2}>
                <Typography fontWeight="bold">Total Price</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}
              >
                {totalPrice.toFixed(2)}€
              </TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => dispatch(clearOrder())}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrderList;
