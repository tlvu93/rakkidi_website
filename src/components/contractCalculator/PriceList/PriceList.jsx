import { useState, useEffect } from 'react';
import { Grid, Typography, Paper, Button } from '@mui/material';
import { connect } from 'react-redux';
import { clearOrders } from '../../../redux/modules/orders';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/system';

const PriceList = (props) => {
  const [price, setPrice] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    getPrice(props.orders);
  }, [props.orders]);

  function getPrice(orders) {
    let computedPrice = 0;
    orders.forEach((order) => {
      computedPrice +=
        Math.round((order.height * order.width * 40) / 10000) / 100;
    });
    setPrice(computedPrice);
  }

  return (
    <div>
      {price ? (
        <Grid container spacing={2} style={{ padding: 24 }}>
          <Grid item xs={12} sm={12} lg={12} xl={12}>
            <Paper style={{ display: 'flex', padding: 24 }}>
              <Typography style={{ flexGrow: 1 }} variant="h4">
                Gesamtpreis: {price}€
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => props.clear()}
                sx={{ margin: theme.spacing(1) }}
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

const mapStateToProps = (state) => ({
  orders: state.orderStore.orders
});

const mapDispatchToProps = (dispatch) => ({
  clear: () => dispatch(clearOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceList);
