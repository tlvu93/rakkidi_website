import { GridToolbarContainer } from '@mui/x-data-grid';
import { useTemplate } from '../../context/TemplateContext';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const Toolbar = () => {
  const { addExtractionField } = useTemplate();

  const handleClick = () => {
    addExtractionField();
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
};
