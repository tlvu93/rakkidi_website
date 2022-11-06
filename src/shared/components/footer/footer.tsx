import { Box, Container, Paper, Typography } from '@mui/material';
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
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'primary.dark'
      }}
    >
      <Container maxWidth="sm">
        <Copyright />
      </Container>
    </Box>
  );
};

export default Footer;
