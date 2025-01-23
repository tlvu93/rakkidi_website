import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface CardSectionProps {
  children: ReactNode;
  hasBorder?: boolean;
}

export const CardSection = ({
  children,
  hasBorder = false
}: CardSectionProps) => (
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

export const ImageContainer = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      paddingBottom: '56.25%',
      position: 'relative'
    }}
  >
    {children}
  </div>
);
