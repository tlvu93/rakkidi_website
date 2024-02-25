import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Order } from '@shared/interfaces/contract-calculator';
import { clearOrder, selectOrders } from './order-slice';
import InfoIcon from '@mui/icons-material/Info';
import ControlledTextField from '@shared/components/formControl/ControlledTextField';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const PriceList = () => {
  const orders = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();

  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    function getPrice(orders: Order[]) {
      let computedPrice = 0;
      orders.forEach((order) => {
        computedPrice +=
          Math.round((order.height * order.width * 40) / 10000) / 100;
      });

      if (discount) {
        const discountValue = (computedPrice / 100) * 30;
        computedPrice = computedPrice - discountValue;
      }
      setPrice(computedPrice);
    }

    getPrice(orders);
  }, [discount, orders, price]);

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography id="modal-modal-title" variant="body2" component="h2">
              Der Preis wird auf der Grundlage der Höhe und Breite des Bildes
              berechnet. Der aktuelle Preis beträgt 45€ pro Quadratmeter.
            </Typography>
            <TextField
              name="discount"
              label="Rabatt %"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              inputProps={{ min: 0, max: 30 }}
            />
          </Box>
        </Box>
      </Modal>
      {price ? (
        <Grid container spacing={2} style={{ padding: 24 }}>
          <Grid item xs={12} sm={12} lg={12} xl={12}>
            <Paper style={{ display: 'flex', padding: 24 }}>
              <Box display={'flex'} flexGrow={1} alignItems={'center'} gap={1}>
                <Typography variant="h4">
                  Gesamtpreis: {(Math.round(price * 100) / 100).toFixed(2)}€
                </Typography>
                <IconButton onClick={() => setModalOpen(true)}>
                  <InfoIcon />
                </IconButton>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => dispatch(clearOrder())}
                sx={{ margin: 1 }}
              >
                Clear All
              </Button>
            </Paper>
          </Grid>
        </Grid>
      ) : null}
    </div>
  );
};

export default PriceList;
