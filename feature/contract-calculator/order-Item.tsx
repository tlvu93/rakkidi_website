import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Order } from 'interfaces/contract-calculator';

interface OrderItemProps {
  order: Order;
  remove: (order: Order) => void;
}

const OrderItem = ({ order, remove }: OrderItemProps) => {
  return (
    <div>
      {order ? (
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5">
              {order.name}
            </Typography>
            <Typography component="p">
              Höhe: {Math.round(order.width * 100) / 100} mm
            </Typography>
            <Typography component="p">
              Breite: {Math.round(order.height * 100) / 100} mm
            </Typography>
            <Typography component="p">
              Preis:{' '}
              {Math.round((((order.height / 1000) * order.width) / 10) * 40) /
                100}
              €
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => remove(order)}
              sx={{ margin: 1 }}
            >
              Löschen
            </Button>
          </CardActions>
        </Card>
      ) : null}
    </div>
  );
};
export default OrderItem;
