import { Typography, TypographyProps } from '@mui/material';
import Link from 'next/link';

const Copyright: React.FC<TypographyProps> = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
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
