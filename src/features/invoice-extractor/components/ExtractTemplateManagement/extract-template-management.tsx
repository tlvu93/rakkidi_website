import { AddCircle } from '@mui/icons-material';
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
import { InvoiceExtractTemplate } from '@pages/invoice-extractor/types';
import React, { useState } from 'react';

import { SelectChangeEvent } from '@mui/material';

type Props = {
  setTemplate: (template: InvoiceExtractTemplate) => void;
};

const templates: InvoiceExtractTemplate[] = [
  // {
  //   name: 'Example Template',
  //   description: 'This is an example template',
  //   templateComponents: [
  //     {
  //       name: 'Feld1',
  //       elementTF: {
  //         tfStart: [7.2, 0, 0, 7.2, 495.57, 654.441],
  //         tfEnd: [7.2, 0, 0, 7.2, 536.9963999999997, 654.441]
  //       }
  //     },
  //     {
  //       name: 'Feld2',
  //       elementTF: {
  //         tfStart: [7.2, 0, 0, 7.2, 502.271, 614.441],
  //         tfEnd: [7.2, 0, 0, 7.2, 536.99659999, 614.441]
  //       }
  //     }
  //   ]
  // }
];

const ExtractTemplateManagement = ({ setTemplate }: Props) => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<InvoiceExtractTemplate | null>(null);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const templateName = event.target.value as string;
    const selected =
      templates.find((template) => template.name === templateName) || null;
    setSelectedTemplate(selected);
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
              style={{ textTransform: 'none' }}
            >
              Create
            </Button>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              {/* <Typography variant="subtitle1">Choose Template</Typography> */}
              <InputLabel id="demo-simple-select-label">
                Choose a Template
              </InputLabel>
              <Select
                id="demo-simple-select"
                label="Choose a Template"
                value={selectedTemplate ? selectedTemplate.name : ''}
                onChange={handleSelectChange}
              >
                {templates.length === 0 ? (
                  <MenuItem disabled>
                    <em>No Templates Created</em>
                  </MenuItem>
                ) : (
                  <>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {templates.map((template) => (
                      <MenuItem key={template.name} value={template.name}>
                        {template.name}
                      </MenuItem>
                    ))}
                  </>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} container justifyContent="space-between">
            <Box>
              <Button variant="outlined" sx={{ mr: 1 }}>
                Import
              </Button>
              <Button variant="outlined">Export</Button>
            </Box>
            <Button
              variant="contained"
              onClick={() => selectedTemplate && setTemplate(selectedTemplate)}
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
