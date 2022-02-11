import React from 'react';
import { Grid } from '@mui/material';
import { Order } from '../../contractCalculator';
import { connect } from 'react-redux';
import {
  addOrder,
  removeOrder,
  clearOrders
} from '../../../redux/modules/orders';

const OrderList = (props) => {
  return (
    <div>
      {props.orders ? (
        <div>
          <Grid container spacing={2} style={{ padding: 24 }}>
            {props.orders.map((currentOrder) => (
              <Grid key={currentOrder.name} item xs={12} sm={6} lg={4} xl={3}>
                <Order order={currentOrder} remove={props.remove} />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        'No Orders'
      )}
    </div>
  );
};

const mapStatetoProps = (state) => ({
  orders: state.orderStore.orders
});

const mapDispatchToProps = (dispatch) => {
  return {
    add: (order) => dispatch(addOrder(order)),
    remove: (order) => dispatch(removeOrder(order)),
    clear: () => dispatch(clearOrders())
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(OrderList);
