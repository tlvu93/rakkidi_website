import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';
import { Box, Typography, Button } from '@mui/material';
import React from 'react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Failed to load PDF',
  onRetry
}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.paper',
        p: 3
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
      <Typography variant="h6" color="error" gutterBottom>
        Error Loading PDF
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{
          color: 'text.secondary',
          mb: 3,
          maxWidth: 400
        }}
      >
        {message}
      </Typography>
      {onRetry && (
        <Button
          variant="contained"
          color="primary"
          onClick={onRetry}
          size="large"
        >
          Try Again
        </Button>
      )}
    </Box>
  );
};
