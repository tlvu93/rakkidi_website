import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { Order } from 'interfaces/contract-calculator';
import { removeOrder } from './order-slice';

interface OrderItemProps {
  order: Order;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const dispatch = useAppDispatch();

  const getPrice = (
    width_in_mm: number,
    height_in_mm: number,
    pricePerSquareMeterInEuro = 40
  ) => {
    const height_in_m = height_in_mm / 1000;
    const width_in_m = width_in_mm / 1000;

    const areaInSquareMeter = height_in_m * width_in_m;

    return areaInSquareMeter * pricePerSquareMeterInEuro;
  };

  return (
    <>
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
              Preis: {getPrice(order.height, order.width).toFixed(2)}€
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => dispatch(removeOrder(order.id))}
              sx={{ margin: 1 }}
            >
              Löschen
            </Button>
          </CardActions>
        </Card>
      ) : null}
    </>
  );
};
export default OrderItem;
