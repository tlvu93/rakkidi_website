import { Typography, TypographyProps } from '@mui/material';
import Link from 'next/link';

const Copyright: React.FC<TypographyProps> = (props) => {
  return (
    <Typography
      variant="body2"
      align="center"
      {...props}
      sx={[
        {
          color: 'text.secondary'
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx])
      ]}
    >
      {'Copyright © '}
      <Link color="inherit" href="rakkidi.de">
        Rakkidi.de
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
