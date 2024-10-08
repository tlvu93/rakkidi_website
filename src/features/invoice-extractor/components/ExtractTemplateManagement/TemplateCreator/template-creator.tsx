import React from 'react';
import {
  Container,
  Paper,
  Grid,
  Box,
  Button,
  TextField,
  Modal,
  Typography
} from '@mui/material';
import PropertiesTable from './components/PropertyTable/properties-table';
import PdfViewer from './components/PdfViewer/pdf-viewer';
import { TemplateProvider } from './context/TemplateContext';
import { InvoiceExtractTemplate } from 'features/invoice-extractor/interfaces';
import { useForm } from 'react-hook-form';

interface TemplateCreatorProps {
  selectedTemplate: InvoiceExtractTemplate | null;
  onSubmit: (form: InvoiceExtractTemplate) => void;
}

const defaultTemplate: InvoiceExtractTemplate = {
  name: 'New Template',
  description: 'New Template',
  extractionFields: []
};

const TemplateCreator = ({
  selectedTemplate,
  onSubmit
}: TemplateCreatorProps) => {
  const { register, handleSubmit } = useForm<InvoiceExtractTemplate>({
    defaultValues: selectedTemplate ?? defaultTemplate
  });

  return (
    <TemplateProvider>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="xl">
          <Typography variant="h3" pb={4}>
            Template Creator
          </Typography>
          <Box pb={4}>
            <TextField {...register('name')} label="Template Name" fullWidth />
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                height={'100%'}
                alignContent={'center'}
                borderRadius={1}
                border={'1px solid #B5B5B5'}
              >
                <PdfViewer />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                height={'100%'}
                alignContent={'center'}
                borderRadius={1}
                border={'1px solid #B5B5B5'}
              >
                <PropertiesTable />
                <Box display="flex" justifyContent={'right'} padding={2}>
                  <Button variant="contained" type="submit">
                    Save Template
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </form>
    </TemplateProvider>
  );
};

export default TemplateCreator;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  height: '90%',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

interface TemplateCreatorModalProps {
  open: boolean;
  close: () => void;
  onSubmit: (form: InvoiceExtractTemplate) => void;
}

export const TemplateCreatorModal = ({
  open,
  close,
  onSubmit
}: TemplateCreatorModalProps) => {
  return (
    <Modal open={open} onClose={close}>
      <Box sx={style}>
        <TemplateCreator onSubmit={onSubmit} selectedTemplate={null} />
      </Box>
    </Modal>
  );
};
