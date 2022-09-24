import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
    useTheme
  } from '@mui/material';
  import DeleteIcon from '@mui/icons-material/Delete';
  
  const Order = (props) => {
    const { order, remove } = props;
    const theme = useTheme();
  
    return (
      <div>
        {props.order ? (
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5">
                {props.order.name}
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
                sx={{ margin: theme.spacing(1) }}
              >
                Löschen
              </Button>
            </CardActions>
          </Card>
        ) : null}
      </div>
    );
  };
  export default Order;
  