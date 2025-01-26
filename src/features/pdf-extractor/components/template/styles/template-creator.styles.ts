import { SxProps, Theme } from '@mui/material';

export const modalStyle: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '90%',
  overflow: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid gray',
  borderRadius: 2,
  boxShadow: 24,

  px: 2,
  display: 'flex',
  flexDirection: 'column'
};

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

export const closeButtonStyle: SxProps<Theme> = {
  position: 'absolute',
  right: 16,
  top: 16,
  color: (theme) => theme.palette.grey[500]
};

export const formStyle: SxProps<Theme> = {
  height: '100%'
};

export const templateDetailsStyle: SxProps<Theme> = {
  pb: 4
};

export const templateFieldsStyle: SxProps<Theme> = {
  pb: 2
};

export const actionButtonsStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-end',
  mt: 2,
  gap: 2
};
