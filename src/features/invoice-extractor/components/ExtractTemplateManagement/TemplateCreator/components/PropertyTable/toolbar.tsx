import React from 'react';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { useTemplate } from '../../context/TemplateContext';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Toolbar: React.FC = () => {
  const { addExtractionField } = useTemplate();

  const handleClick = () => {
    addExtractionField();
  };

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick}
        sx={{ textTransform: 'none' }}
      >
        Add Record
      </Button>
    </GridToolbarContainer>
  );
};

export default Toolbar;
