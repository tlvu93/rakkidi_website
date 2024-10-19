import { Theme } from '@mui/material/styles';

export const getStyles = (theme: Theme) => ({
  baseStyle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '6rem',
    borderWidth: 2.5,
    borderRadius: 16,
    borderColor: theme.palette.divider,
    borderStyle: 'dashed',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    outline: 'none',
    transition: 'border .24s ease-in-out, background-color .24s ease-in-out'
  },

  activeStyle: {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover
  },

  acceptStyle: {
    borderColor: theme.palette.success.main,
    backgroundColor: theme.palette.success.light
  },

  rejectStyle: {
    borderColor: theme.palette.error.main,
    backgroundColor: theme.palette.error.light
  }
});
