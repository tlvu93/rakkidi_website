import { IconButton, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import logo from '../../assets/logo_rakkidi_vert.svg';
import Image from 'next/image';

const LogoHome = () => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={() => router.push('/')}
      edge="start"
      sx={{
        height: 20,
        filter:
          theme.palette.mode === 'dark'
            ? 'invert(83%) sepia(100%) saturate(0%) hue-rotate(100deg) brightness(106%) contrast(100%)'
            : ''
      }}
    >
      <Image src={logo} style={{ height: '20px' }} alt="logo" />
    </IconButton>
  );
};

export default LogoHome;
