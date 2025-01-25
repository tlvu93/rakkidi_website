import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

interface LoginModalProps {
  login: (user: string, password: string) => void;
}

interface LoginModalHookResult {
  LoginModal: React.FC<LoginModalProps>;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const useLoginModal = (defaultOpen: boolean): LoginModalHookResult => {
  const [open, setOpen] = useState(defaultOpen);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const LoginModal: React.FC<LoginModalProps> = ({
    login
  }): React.ReactElement => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();

      const data = new FormData(event.currentTarget);
      const user = data.get('user');
      const password = data.get('password');

      if (user && password) {
        login(user as string, password as string);
      }

      handleClose();
    };
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Login with your WMD Account
            </Typography>
            <TextField
              id="user"
              label="Kundennummer"
              name="user"
              variant="outlined"
              required
            />
            <TextField
              id="password"
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              required
            />
            <Button type={'submit'} variant="contained" color="secondary">
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  return { LoginModal, open, handleOpen, handleClose };
};

export default useLoginModal;
