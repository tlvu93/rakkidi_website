import { Container, Paper, Typography } from '@mui/material';
import Link from 'next/link';

const Copyright = () => {
  return (
    <Typography variant="body2" color="white">
      {'Made by '}
      <Link color="inherit" href="https://www.rakkidi.de/">
        Rakkidi
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const Footer = () => {
  return (
    <Paper
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'primary.secondary'
      }}
    >
      <Container maxWidth="sm">
        <Copyright />
      </Container>
    </Paper>
  );
};

export default Footer;
