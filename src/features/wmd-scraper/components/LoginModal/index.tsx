import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { FormEvent } from 'react';

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 400 },
  maxWidth: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4
};

export interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  login: (user: string, password: string) => void;
}

/**
 * Credential prompt for the WMD portal.
 *
 * Defined at module scope on purpose: when this lived inside a hook body it
 * was a brand new component type on every parent render, so React unmounted
 * and remounted the modal — discarding whatever had been typed into it.
 */
const LoginModal = ({
  open,
  onClose,
  login
}: LoginModalProps): React.ReactElement => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const user = data.get('user');
    const password = data.get('password');

    if (typeof user === 'string' && typeof password === 'string') {
      login(user, password);
    }

    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="wmd-login-modal-title"
    >
      <Box sx={modalStyle}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <Typography id="wmd-login-modal-title" variant="h6" component="h2">
            Login with your WMD Account
          </Typography>
          <TextField
            id="wmd-user"
            label="Kundennummer"
            name="user"
            autoComplete="username"
            variant="outlined"
            required
            autoFocus
          />
          <TextField
            id="wmd-password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            required
          />
          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginModal;
