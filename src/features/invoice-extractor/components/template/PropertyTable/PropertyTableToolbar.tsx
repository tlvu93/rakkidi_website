import React, { useRef } from 'react';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import { useTemplate } from 'features/invoice-extractor';

const PropertyTableToolbar: React.FC = () => {
  const {
    addExtractionField,
    canAddExtractionField,
    exportTemplate,
    importTemplate
  } = useTemplate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddClick = () => {
    addExtractionField();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await importTemplate(file);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      // Reset the input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <GridToolbarContainer>
      <Stack direction="row" spacing={2}>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
          disabled={!canAddExtractionField}
        >
          Add Record
        </Button>
        <Button
          color="primary"
          startIcon={<UploadIcon />}
          onClick={handleImportClick}
        >
          Import
        </Button>
        <Button
          color="primary"
          startIcon={<DownloadIcon />}
          onClick={exportTemplate}
        >
          Export
        </Button>
      </Stack>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".json"
        onChange={handleFileChange}
      />
    </GridToolbarContainer>
  );
};

export default PropertyTableToolbar;
