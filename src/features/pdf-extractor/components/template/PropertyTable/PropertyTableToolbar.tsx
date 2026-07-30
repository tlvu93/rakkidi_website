import AddIcon from '@mui/icons-material/Add';
import CropIcon from '@mui/icons-material/Crop';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import { Button, Stack, Menu, MenuItem } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useTemplate } from 'features/pdf-extractor';
import {
  ExtractionFieldType,
  PDFExtractTemplate
} from 'features/pdf-extractor/interfaces';

const PropertyTableToolbar: React.FC = () => {
  const { getValues } = useFormContext<PDFExtractTemplate>();
  const {
    addExtractionField,
    canAddExtractionField,
    exportTemplate,
    importTemplate
  } = useTemplate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleAddField = (type: ExtractionFieldType): void => {
    addExtractionField(type);
    handleMenuClose();
  };

  const handleImportClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
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
        <div>
          <Button
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
            disabled={!canAddExtractionField}
            aria-controls={open ? 'add-field-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            Add Field
          </Button>
          <Menu
            id="add-field-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            slotProps={{
              list: {
                'aria-labelledby': 'add-field-button'
              }
            }}
          >
            <MenuItem
              onClick={() => handleAddField(ExtractionFieldType.Rectangle)}
            >
              <CropIcon sx={{ mr: 1 }} /> Rectangle Field
            </MenuItem>
            <MenuItem
              onClick={() => handleAddField(ExtractionFieldType.Keyword)}
            >
              <SearchIcon sx={{ mr: 1 }} /> Keyword Field
            </MenuItem>
          </Menu>
        </div>
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
          onClick={() => {
            const currentName = getValues('name');
            exportTemplate(currentName);
          }}
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
