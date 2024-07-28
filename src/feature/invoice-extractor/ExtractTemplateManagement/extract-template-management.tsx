import { Label } from '@mui/icons-material';
import { Box, Button, Paper, Select, Typography } from '@mui/material';
import { InvoiceExtractTemplate } from '@pages/invoice-extractor/types';
import React from 'react';

type Props = {
  setTemplate: (template: InvoiceExtractTemplate) => void;
};

const ExtractTemplateManagement = ({ setTemplate }: Props) => {
  return (
    <Paper>
      <Box>
        <Typography>Extract Template Management</Typography>
        <Button>Create</Button>
      </Box>
      <Box>
        <Label>Choose Template</Label>
        <Select></Select>
      </Box>
      <Box>
        <Box>
          <Button>Import</Button>
          <Button>Export</Button>
        </Box>
        <Button onClick={() => setTemplate({} as InvoiceExtractTemplate)}>
          Choose
        </Button>
      </Box>
    </Paper>
  );
};

export default ExtractTemplateManagement;
