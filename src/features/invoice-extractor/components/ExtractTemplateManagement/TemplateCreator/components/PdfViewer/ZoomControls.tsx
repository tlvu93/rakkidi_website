import React from 'react';
import { ButtonGroup, Button, Box } from '@mui/material';
import { ZoomIn, ZoomOut } from '@mui/icons-material';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  currentZoom: number;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({
  onZoomIn,
  onZoomOut,
  currentZoom
}) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
      <ButtonGroup size="small" aria-label="zoom controls">
        <Button onClick={onZoomOut} aria-label="zoom out">
          <ZoomOut />
        </Button>
        <Button disabled>{(currentZoom * 100).toFixed(0)}%</Button>
        <Button onClick={onZoomIn} aria-label="zoom in">
          <ZoomIn />
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default React.memo(ZoomControls);
