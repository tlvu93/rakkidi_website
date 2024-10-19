import React from 'react';
import {
  Container,
  Grid,
  Box,
  Button,
  TextField,
  Modal,
  Typography,
  Paper,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
      <form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }}>
        <Container
          maxWidth="xl"
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
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
          <Grid container spacing={4} sx={{ flexGrow: 1, mb: 2 }}>
            <Grid item xs={12} md={9}>
              <Paper sx={{ height: '100%', alignContent: 'center' }}>
                <PdfViewer />
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <PropertiesTable />
              </Paper>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save Template
            </Button>
          </Box>
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
  border: '2px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  py: 4,
  px: 2
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
    <Modal
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          close();
        }
      }}
    >
      <Paper sx={{ ...modalStyle, display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            aria-label="close"
            onClick={close}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <TemplateCreator
            onSubmit={onSubmit}
            selectedTemplate={null}
            onCancel={close}
          />
        </Box>
      </Paper>
    </Modal>
  );
};
