import { SxProps } from '@mui/material';

export const cardStyle = {
  height: '100%',
  width: '100%',
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  backfaceVisibility: 'hidden'
} as const;

export const hoverScaleStyle = {
  transition: 'transform 0.3s',
  cursor: 'pointer',
  ':hover': {
    transform: 'scale(1.1)'
  }
} as const;

export const iconContainerStyle = {
  width: '100%',
  height: '100%',
  ...hoverScaleStyle
} as const;

export const svgIconStyle = {
  height: '100%',
  width: 'auto',
  ...hoverScaleStyle
} as const;

export const weblinksContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5rem'
} as const;

export const projectCardStyle: SxProps = {
  minWidth: '20rem',
  maxWidth: '28rem',
  aspectRatio: '18/14',
  width: '100%',
  transition: 'transform 0.8s',
  transformStyle: 'preserve-3d',
  '&:hover': {
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)'
  }
} as const;
