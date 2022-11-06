import { useRouter } from 'next/router';

import Logo from '@assets/logo_rakkidi_vert.svg';
import { IconButton } from '@mui/material';

const LogoHome = () => {
  const router = useRouter();
  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={() => router.push('/')}
      edge="start"
      sx={{
        height: 20,
        filter:
          'invert(83%) sepia(100%) saturate(0%) hue-rotate(100deg) brightness(106%) contrast(100%)'
      }}
    >
      <Logo width={120} />
    </IconButton>
  );
};

export default LogoHome;
