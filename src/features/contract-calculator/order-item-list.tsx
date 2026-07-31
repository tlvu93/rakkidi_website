import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
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
  Divider,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import { ReactElement, useState, useEffect, useCallback, useMemo } from 'react';

import {
  Order,
  ORDER_TYPE_PRICES,
  OrderType
} from '@shared/interfaces/contract-calculator';
import { useAppDispatch, useAppSelector } from 'hooks';

import CustomOrder from './custom-order';
import {
  selectOrders,
  removeOrder,
  clearOrder,
  updateOrder
} from './order-slice';
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

  // Today's date is deliberately resolved after mount: this page is statically
  // prerendered, so baking the build-time date into the markup would both go
  // stale and mismatch on hydration.
  useEffect((): void => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe read of the client clock
    setDate(new Date().toISOString().split('T')[0]);
  }, []);

  const calculatePrice = useCallback(
    (
      height: number,
      width: number,
      type: OrderType,
      amount: number,
      customPrice?: number
    ): number => {
      if (type === OrderType.Custom && customPrice !== undefined) {
        return Number((customPrice * amount).toFixed(2));
      }
      const pricePerSqm = ORDER_TYPE_PRICES[type] || 0;
      const sqMeters = (height * width) / 1000000; // Convert mm² to m²
      return Number((sqMeters * pricePerSqm * amount).toFixed(2));
    },
    []
  );

  const totalPrice = useMemo(
    (): number =>
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

  const handleTypeChange = useCallback(
    (order: Order, newType: OrderType): void => {
      const updatedOrder = {
        ...order,
        type: newType,
        customPrice: newType === OrderType.Custom ? 0 : undefined
      };
      dispatch(updateOrder(updatedOrder));
    },
    [dispatch]
  );

  const handleOrderUpdate = useCallback(
    (order: Order, updates: Partial<Order>): void => {
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
                onChange={(e): void => setDate(e.target.value)}
                sx={{ mb: 1, display: 'block' }}
              />
              <TextField
                variant="standard"
                size="small"
                value={invoiceNumber}
                onChange={(e): void => setInvoiceNumber(e.target.value)}
                sx={{ display: 'block' }}
              />
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <TextField
                variant="standard"
                size="small"
                value={companyName}
                onChange={(e): void => setCompanyName(e.target.value)}
                sx={{ mb: 1, display: 'block', textAlign: 'right' }}
              />
              <TextField
                variant="standard"
                size="small"
                value={address1}
                onChange={(e): void => setAddress1(e.target.value)}
                sx={{ mb: 1, display: 'block', textAlign: 'right' }}
              />
              <TextField
                variant="standard"
                size="small"
                value={address2}
                onChange={(e): void => setAddress2(e.target.value)}
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
                          onChange={(e): void =>
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
                          onChange={(e): void =>
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
                            onChange={(e): void => {
                              handleTypeChange(
                                order,
                                e.target.value as OrderType
                              );
                            }}
                          >
                            <MenuItem value={OrderType.Folienplott}>
                              Folienplott
                            </MenuItem>
                            <MenuItem value={OrderType.Banner}>Banner</MenuItem>
                            <MenuItem value={OrderType.PVC}>PVC</MenuItem>
                            <MenuItem value={OrderType.Custom}>Custom</MenuItem>
                          </Select>
                        </FormControl>
                        {order.type === OrderType.Custom && (
                          <TextField
                            variant="standard"
                            size="small"
                            type="number"
                            label="Price"
                            value={order.customPrice || 0}
                            onChange={(e): void =>
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
                          onClick={(): ReturnType<typeof removeOrder> =>
                            dispatch(removeOrder(order.id))
                          }
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
                        onClick={(): void => setIsModalOpen(true)}
                        variant="outlined"
                        fullWidth
                      >
                        Add Items
                      </Button>
                      <Button
                        startIcon={<DownloadIcon />}
                        onClick={(): void => {
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
                    <Typography
                      sx={{
                        fontWeight: 'bold'
                      }}
                    >
                      Total Price
                    </Typography>
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
                      onClick={(): ReturnType<typeof clearOrder> =>
                        dispatch(clearOrder())
                      }
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
        onClose={(): void => setIsModalOpen(false)}
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
          <CustomOrder onItemAdded={(): void => setIsModalOpen(false)} />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={(): void => setIsModalOpen(false)}>Close</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default OrderList;
