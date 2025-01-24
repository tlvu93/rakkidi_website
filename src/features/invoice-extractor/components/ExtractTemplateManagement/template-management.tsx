import React, { useCallback, useRef } from 'react';
import {
  AddCircle,
  ImportExport,
  Save,
  Delete,
  Edit
} from '@mui/icons-material';
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
  const [templateToEdit, setTemplateToEdit] =
    React.useState<InvoiceExtractTemplate | null>(null);
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = useCallback(() => {
    const templatesJson = JSON.stringify(templates, null, 2);
    const blob = new Blob([templatesJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoice-templates.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [templates]);

  const handleImport = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedTemplates = JSON.parse(e.target?.result as string);
          // Validate imported templates
          if (
            Array.isArray(importedTemplates) &&
            importedTemplates.every(
              (template) =>
                template.name &&
                template.description &&
                Array.isArray(template.extractionFields)
            )
          ) {
            // Add each imported template
            importedTemplates.forEach((template) => {
              addTemplate(template);
            });
          } else {
            console.error('Invalid template format');
            alert('Invalid template format');
          }
        } catch (error) {
          console.error('Failed to parse template file:', error);
          alert('Failed to parse template file');
        }
        // Clear the input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      };
      reader.readAsText(file);
    },
    [addTemplate]
  );

  const handleTemplateSubmit = useCallback(
    (form: InvoiceExtractTemplate) => {
      try {
        if (templateToEdit) {
          // If editing, delete old template and add updated one
          deleteTemplate(templateToEdit.name);
        }
        addTemplate(form);
        setTemplateToEdit(null);
        close();
      } catch (error) {
        console.error('Failed to handle template:', error);
        // Consider adding a user-friendly error message here
      }
    },
    [addTemplate, close, deleteTemplate, templateToEdit]
  );

  return (
    <>
      <TemplateCreatorModal
        open={opened}
        close={() => {
          setTemplateToEdit(null);
          close();
        }}
        onSubmit={handleTemplateSubmit}
        selectedTemplate={templateToEdit}
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
                        '& .action-icons': {
                          opacity: isSelected ? 0 : 1,
                          visibility: isSelected ? 'hidden' : 'visible'
                        }
                      }}
                    >
                      <span>{template.name}</span>
                      <Box className="action-icons">
                        <Edit
                          sx={{
                            mr: 1,
                            fontSize: '1.2rem',
                            color: 'primary.main',
                            '&:hover': {
                              color: 'primary.dark'
                            }
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setTemplateToEdit(template);
                            open();
                          }}
                        />
                        <Delete
                          sx={{
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
                      </Box>
                    </MenuItem>
                  );
                })
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} container justifyContent="space-between">
          <Box>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept=".json"
              onChange={handleImport}
            />
            <Button
              variant="outlined"
              startIcon={<ImportExport />}
              sx={{ mr: 1 }}
              onClick={() => fileInputRef.current?.click()}
            >
              Import
            </Button>
            <Button
              variant="outlined"
              startIcon={<Save />}
              onClick={handleExport}
            >
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
