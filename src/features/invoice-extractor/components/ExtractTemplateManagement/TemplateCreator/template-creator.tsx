import React from 'react';
import {
  Container,
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
  onCancel: () => void;
}

const defaultTemplate: InvoiceExtractTemplate = {
  name: 'New Template',
  description: 'New Template',
  extractionFields: []
};

const TemplateCreator = ({
  selectedTemplate,
  onSubmit,
  onCancel
}: TemplateCreatorProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<InvoiceExtractTemplate>({
    defaultValues: selectedTemplate ?? defaultTemplate
  });

  return (
    <TemplateProvider>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="xl">
          <Typography variant="h3" pb={4}>
            Template Creator
          </Typography>
          <Typography variant="h5" pb={2}>
            Template Details
          </Typography>
          <Grid container spacing={2} pb={4}>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('name', { required: 'Template name is required' })}
                label="Template Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('description', {
                  required: 'Template description is required'
                })}
                label="Template Description"
                fullWidth
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
          </Grid>
          <Typography variant="h5" pb={2}>
            Records and PDF Preview
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Box
                height={'100%'}
                alignContent={'center'}
                borderRadius={1}
                border={'1px solid #B5B5B5'}
              >
                <PdfViewer />
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                height={'100%'}
                alignContent={'center'}
                borderRadius={1}
                border={'1px solid #B5B5B5'}
              >
                <PropertiesTable />
                <Box
                  display="flex"
                  justifyContent={'right'}
                  padding={2}
                  gap={2}
                >
                  <Button variant="outlined" onClick={onCancel}>
                    Cancel
                  </Button>
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

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  height: '90%',
  overflow: 'auto',
  bgcolor: 'background.paper',
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
      <Box sx={modalStyle}>
        <TemplateCreator
          onSubmit={onSubmit}
          selectedTemplate={null}
          onCancel={close}
        />
      </Box>
    </Modal>
  );
};
