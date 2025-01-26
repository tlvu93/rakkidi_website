import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface CardSectionProps {
  children: ReactNode;
  hasBorder?: boolean;
}

export const CardSection: React.FC<CardSectionProps> = ({
  children,
  hasBorder = false
}): React.ReactElement => (
  <Box
    sx={{
      flex: 1,
      padding: '1rem 2.5rem',
      ...(hasBorder && {
        borderTop: 1,
        borderColor: 'divider'
      })
    }}
  >
    {children}
  </Box>
);

interface ImageContainerProps {
  children: ReactNode;
}

export const ImageContainer: React.FC<ImageContainerProps> = ({
  children
}): React.ReactElement => (
  <div
    style={{
      paddingBottom: '56.25%',
      position: 'relative'
    }}
  >
    {children}
  </div>
);
