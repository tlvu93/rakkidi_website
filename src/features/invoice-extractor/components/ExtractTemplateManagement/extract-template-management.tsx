import React, { useState } from 'react';
import { AddCircle, ImportExport, Save } from '@mui/icons-material';
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
import { InvoiceExtractTemplate } from 'features/invoice-extractor/interfaces';

type Props = {
  setTemplate: (template: InvoiceExtractTemplate) => void;
};

const templates: InvoiceExtractTemplate[] = [
  // Example templates could go here
];

const ExtractTemplateManagement = ({ setTemplate }: Props) => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<InvoiceExtractTemplate | null>(null);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const templateName = event.target.value;
    const selected =
      templates.find((template) => template.name === templateName) || null;
    setSelectedTemplate(selected);
  };

  const handleTemplateSelection = () => {
    if (selectedTemplate) {
      setTemplate(selectedTemplate);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ padding: '1.5rem 2.5rem' }}>
        <Grid container spacing={5}>
          <Grid
            item
            xs={12}
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4">Extract Template Management</Typography>
            <Button
              variant="outlined"
              startIcon={<AddCircle />}
              sx={{ textTransform: 'none' }}
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
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {templates.length === 0 ? (
                  <MenuItem disabled>
                    <em>No Templates Created</em>
                  </MenuItem>
                ) : (
                  templates.map((template) => (
                    <MenuItem key={template.name} value={template.name}>
                      {template.name}
                    </MenuItem>
                  ))
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
      </Paper>
    </Container>
  );
};

export default ExtractTemplateManagement;
