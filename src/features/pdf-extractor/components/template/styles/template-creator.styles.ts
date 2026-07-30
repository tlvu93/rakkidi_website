import { SxProps, Theme } from '@mui/material';

export const containerStyle: SxProps<Theme> = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  px: 4
};

export const gridContainerStyle: SxProps<Theme> = {
  flexGrow: 1,
  mb: 2,
  minHeight: 'calc(100vh - 200px)' // Account for header and footer
};

export const pdfPreviewStyle: SxProps<Theme> = {
  height: '100%',
  alignContent: 'center',
  border: 1,
  borderColor: 'divider',
  borderRadius: 1,
  bgcolor: 'background.paper',
  p: 2,
  minHeight: 'calc(100vh - 250px)'
};

export const propertiesTableStyle: SxProps<Theme> = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: 1,
  borderColor: 'divider',
  borderRadius: 1,
  bgcolor: 'background.paper',
  p: 2,
  minHeight: 'calc(100vh - 250px)'
};

export const formStyle: SxProps<Theme> = {
  height: '100%'
};
