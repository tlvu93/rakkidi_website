import { useRouter } from 'next/router';

import Logo from '@assets/logo_rakkidi_vert.svg';
import { IconButton, useTheme } from '@mui/material';

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
            : 'none'
      }}
    >
      <Logo width={120} />
    </IconButton>
  );
};

export default LogoHome;
