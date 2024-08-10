import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Tooltip,
  Typography
} from '@mui/material';
import { useAppDispatch } from 'hooks';
import { Order } from '@shared/interfaces/contract-calculator';
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

    const price = areaInSquareMeter * pricePerSquareMeterInEuro;

    if (price < 0.01) return 'Error: zu kleine Fläche';

    return (areaInSquareMeter * pricePerSquareMeterInEuro).toFixed(2) + '€';
  };

  return (
    <>
      {order ? (
        <Card>
          <CardContent>
            <Tooltip placement="top" title={order.name}>
              <Typography noWrap gutterBottom variant="h5">
                {order.name}
              </Typography>
            </Tooltip>
            <Typography component="p">
              Höhe: {Math.round(order.width * 100) / 100} mm
            </Typography>
            <Typography component="p">
              Breite: {Math.round(order.height * 100) / 100} mm
            </Typography>
            <Typography component="p">
              Preis: {getPrice(order.height, order.width)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="error"
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
