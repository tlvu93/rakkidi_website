import React from 'react';
import { GridToolbarContainer } from '@mui/x-data-grid';

import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTemplate } from 'features/invoice-extractor';

const PropertyTableToolbar: React.FC = () => {
  const { addExtractionField, canAddExtractionField } = useTemplate();

  const handleClick = () => {
    addExtractionField();
  };

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick}
        disabled={!canAddExtractionField}
      >
        Add Record
      </Button>
    </GridToolbarContainer>
  );
};

export default PropertyTableToolbar;
