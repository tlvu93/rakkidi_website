import { SxProps, Theme } from '@mui/material';

export const modalStyle: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  height: '90%',
  overflow: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  py: 4,
  px: 2,
  display: 'flex',
  flexDirection: 'column'
};

export const containerStyle: SxProps<Theme> = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
};

export const gridContainerStyle: SxProps<Theme> = {
  flexGrow: 1,
  mb: 2
};

export const pdfPreviewStyle: SxProps<Theme> = {
  height: '100%',
  alignContent: 'center'
};

export const propertiesTableStyle: SxProps<Theme> = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
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
