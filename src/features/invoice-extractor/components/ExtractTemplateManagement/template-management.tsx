import React, { useCallback } from 'react';
import { AddCircle, ImportExport, Save, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

import useDisclosure from '@shared/hooks/useDisclosure';
import { TemplateCreatorModal } from './TemplateCreator/template-creator';

import { InvoiceExtractTemplate } from 'features/invoice-extractor/interfaces';
import { useTemplateManagement } from './context/template-management-context';

const ExtractTemplateManagement = () => {
  const { opened, open, close } = useDisclosure();
  const {
    templates,
    selectedTemplate,
    addTemplate,
    selectTemplate,
    setTemplate,
    deleteTemplate
  } = useTemplateManagement();

  const handleSelectChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      selectTemplate(event.target.value);
    },
    [selectTemplate]
  );

  const handleTemplateSelection = useCallback(() => {
    if (selectedTemplate) {
      setTemplate(selectedTemplate);
    }
  }, [selectedTemplate, setTemplate]);

  const handleAddTemplate = useCallback(
    (form: InvoiceExtractTemplate) => {
      try {
        console.log('handleAddTemplate called with:', form);
        addTemplate(form);
        close();
      } catch (error) {
        console.error('Failed to add template:', error);
        // Consider adding a user-friendly error message here
      }
    },
    [addTemplate, close]
  );

  return (
    <>
      <TemplateCreatorModal
        open={opened}
        close={close}
        onSubmit={handleAddTemplate}
      />

      <Grid container spacing={5}>
        <Grid
          item
          xs={12}
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" gutterBottom>
            Template Management
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddCircle />}
            sx={{ textTransform: 'none' }}
            onClick={open}
          >
            Create
          </Button>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="select-template-label">
              Choose a Template
            </InputLabel>
            <Select
              id="select-template"
              label="Choose a Template"
              value={selectedTemplate ? selectedTemplate.name : ''}
              onChange={handleSelectChange}
              labelId="select-template-label"
              renderValue={(value) => <span>{value || <em>None</em>}</span>}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {templates.length === 0 ? (
                <MenuItem disabled>
                  <em>No Templates Created</em>
                </MenuItem>
              ) : (
                templates.map((template) => {
                  const isSelected = selectedTemplate?.name === template.name;
                  return (
                    <MenuItem
                      key={template.name}
                      value={template.name}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        '& .delete-icon': {
                          opacity: isSelected ? 0 : 1,
                          visibility: isSelected ? 'hidden' : 'visible'
                        }
                      }}
                    >
                      <span>{template.name}</span>
                      <Delete
                        className="delete-icon"
                        sx={{
                          ml: 2,
                          fontSize: '1.2rem',
                          color: 'error.main',
                          '&:hover': {
                            color: 'error.dark'
                          }
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTemplate(template.name);
                        }}
                      />
                    </MenuItem>
                  );
                })
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} container justifyContent="space-between">
          <Box>
            <Button
              variant="outlined"
              startIcon={<ImportExport />}
              sx={{ mr: 1 }}
            >
              Import
            </Button>
            <Button variant="outlined" startIcon={<Save />}>
              Export
            </Button>
          </Box>
          <Button
            variant="contained"
            onClick={handleTemplateSelection}
            disabled={!selectedTemplate || templates.length === 0}
          >
            Choose
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ExtractTemplateManagement;
