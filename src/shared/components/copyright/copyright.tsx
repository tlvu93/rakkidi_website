import { Link, Typography, TypographyProps } from '@mui/material';

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
      {/* This was `href="rakkidi.de"`, which a browser resolves relative to the
          current path - it never reached the site. */}
      <Link
        color="inherit"
        href="https://rakkidi.de"
        target="_blank"
        rel="noopener noreferrer"
        underline="always"
      >
        Rakkidi.de
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
