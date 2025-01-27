import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
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
  Divider,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import React, { ReactElement, useState, useEffect } from 'react';

import {
  Order,
  ORDER_TYPE_PRICES,
  OrderType
} from '@shared/interfaces/contract-calculator';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  selectOrders,
  removeOrder,
  clearOrder,
  updateOrder
} from './order-slice';
import CustomOrder from './custom-order';
import { generateInvoicePdf } from './utility/generateInvoicePdf';

const OrderList = (): ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const orders = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<string>('');
  const [companyName, setCompanyName] = useState('Your Company Name');
  const [address1, setAddress1] = useState('123 Business St');
  const [address2, setAddress2] = useState('Business City, 12345');
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2025-001');

  useEffect(() => {
    setDate(new Date().toISOString().split('T')[0]);
  }, []);

  const calculatePrice = React.useCallback(
    (
      height: number,
      width: number,
      type: OrderType,
      amount: number,
      customPrice?: number
    ): number => {
      if (type === 'Custom' && customPrice !== undefined) {
        return Number((customPrice * amount).toFixed(2));
      }
      const pricePerSqm = ORDER_TYPE_PRICES[type] || 0;
      const sqMeters = (height * width) / 1000000; // Convert mm² to m²
      return Number((sqMeters * pricePerSqm * amount).toFixed(2));
    },
    []
  );

  const totalPrice = React.useMemo(
    () =>
      orders.reduce(
        (sum, order) =>
          sum +
          calculatePrice(
            order.height,
            order.width,
            order.type,
            order.amount,
            order.customPrice
          ),
        0
      ),
    [orders, calculatePrice]
  );

  const handleTypeChange = React.useCallback(
    (order: Order, newType: OrderType) => {
      const updatedOrder = {
        ...order,
        type: newType,
        customPrice: newType === 'Custom' ? 0 : undefined
      };
      dispatch(updateOrder(updatedOrder));
    },
    [dispatch]
  );

  const handleOrderUpdate = React.useCallback(
    (order: Order, updates: Partial<Order>) => {
      dispatch(updateOrder({ ...order, ...updates }));
    },
    [dispatch]
  );

  return (
    <Box>
      <Card sx={{ mt: 2, maxWidth: 800, mx: 'auto' }}>
        <CardContent>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                INVOICE
              </Typography>
              <TextField
                variant="standard"
                size="small"
                value={date || '---'}
                onChange={(e) => setDate(e.target.value)}
                sx={{ mb: 1, display: 'block' }}
              />
              <TextField
                variant="standard"
                size="small"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                sx={{ display: 'block' }}
              />
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <TextField
                variant="standard"
                size="small"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                sx={{ mb: 1, display: 'block', textAlign: 'right' }}
              />
              <TextField
                variant="standard"
                size="small"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                sx={{ mb: 1, display: 'block', textAlign: 'right' }}
              />
              <TextField
                variant="standard"
                size="small"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                sx={{ display: 'block', textAlign: 'right' }}
              />
            </Box>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Table sx={{ minHeight: 400 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  Item Description
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Dimensions</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end'
                    }}
                  >
                    Price
                    <Tooltip title="Price is calculated based on type: Folienplott (55€/m²), Banner (55€/m²), PVC (65€/m²)">
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
                      <TableCell>
                        <TextField
                          variant="standard"
                          size="small"
                          type="number"
                          value={order.amount}
                          onChange={(e) =>
                            handleOrderUpdate(order, {
                              amount: parseFloat(e.target.value) || 1
                            })
                          }
                          sx={{ width: 60 }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          variant="standard"
                          size="small"
                          value={order.name}
                          onChange={(e) =>
                            handleOrderUpdate(order, { name: e.target.value })
                          }
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        {order.height}mm × {order.width}mm
                      </TableCell>
                      <TableCell>
                        <FormControl size="small" fullWidth>
                          <Select
                            value={order.type}
                            onChange={(e) => {
                              handleTypeChange(
                                order,
                                e.target.value as OrderType
                              );
                            }}
                          >
                            <MenuItem value="Folienplott">Folienplott</MenuItem>
                            <MenuItem value="Banner">Banner</MenuItem>
                            <MenuItem value="PVC">PVC</MenuItem>
                            <MenuItem value="Custom">Custom</MenuItem>
                          </Select>
                        </FormControl>
                        {order.type === 'Custom' && (
                          <TextField
                            variant="standard"
                            size="small"
                            type="number"
                            label="Price"
                            value={order.customPrice || 0}
                            onChange={(e) =>
                              handleOrderUpdate(order, {
                                customPrice: parseFloat(e.target.value) || 0
                              })
                            }
                            sx={{ mt: 1 }}
                            fullWidth
                          />
                        )}
                      </TableCell>
                      <TableCell align="right" sx={{ fontFamily: 'monospace' }}>
                        {calculatePrice(
                          order.height,
                          order.width,
                          order.type,
                          order.amount,
                          order.customPrice
                        ).toFixed(2)}
                        €
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
                        <TableCell sx={{ color: 'text.disabled' }}>-</TableCell>
                        <TableCell sx={{ color: 'text.disabled' }}>-</TableCell>
                        <TableCell
                          sx={{ color: 'text.disabled' }}
                          align="right"
                        >
                          -
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    )
                  )}
                </>
              )}
              <>
                <TableRow>
                  <TableCell colSpan={6}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        startIcon={<AddIcon />}
                        onClick={() => setIsModalOpen(true)}
                        variant="outlined"
                        fullWidth
                      >
                        Add Items
                      </Button>
                      <Button
                        startIcon={<DownloadIcon />}
                        onClick={() => {
                          generateInvoicePdf({
                            date,
                            invoiceNumber,
                            companyName,
                            address1,
                            address2,
                            orders,
                            totalPrice,
                            calculatePrice
                          });
                        }}
                        variant="contained"
                        disabled={orders.length === 0}
                        fullWidth
                      >
                        Download Invoice
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    borderTop: 2,
                    backgroundColor: 'action.hover',
                    '& td': { fontWeight: 'bold' }
                  }}
                >
                  <TableCell colSpan={4}>
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
              </>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="add-items-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            maxWidth: '90%',
            maxHeight: '90%',
            overflow: 'auto',
            borderRadius: 1
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Add Items
          </Typography>
          <CustomOrder onItemAdded={() => setIsModalOpen(false)} />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default OrderList;
