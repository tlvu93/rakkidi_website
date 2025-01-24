import React, { Suspense } from 'react';
import {
  Container,
  Grid,
  Box,
  Button,
  TextField,
  Modal,
  Typography,
  Paper,
  IconButton,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ErrorBoundary } from 'features/invoice-extractor/components/ErrorBoundary/error-boundary';
import PropertiesTable from './components/PropertyTable/properties-table';
import PdfViewer from './components/PdfViewer/pdf-viewer';
import { TemplateProvider, useTemplate } from './context/TemplateContext';
import { InvoiceExtractTemplate } from 'features/invoice-extractor/interfaces';
import { useTemplateForm } from 'features/invoice-extractor/hooks/useTemplateForm';
import * as styles from './styles/template-creator.styles';

interface TemplateCreatorProps {
  selectedTemplate: InvoiceExtractTemplate | null;
  onSubmit: (form: InvoiceExtractTemplate) => void;
  onCancel: () => void;
}

const TemplateCreatorInner = ({
  selectedTemplate,
  onSubmit,
  onCancel
}: TemplateCreatorProps) => {
  const { template } = useTemplate();
  const { register, handleSubmit, errors, isValid } = useTemplateForm({
    selectedTemplate,
    onSubmit,
    currentFields: template.extractionFields
  });

  return (
    <Box component="form" onSubmit={handleSubmit} sx={styles.formStyle}>
      <Container maxWidth="xl" sx={styles.containerStyle}>
        <Typography variant="h3" sx={styles.templateDetailsStyle}>
          Template Creator
        </Typography>
        <Typography variant="h5" sx={styles.templateFieldsStyle}>
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
        <Grid container spacing={4} sx={styles.gridContainerStyle}>
          <Grid item xs={12} md={9}>
            <Paper sx={styles.pdfPreviewStyle}>
              <PdfViewer />
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={styles.propertiesTableStyle}>
              <PropertiesTable />
            </Paper>
          </Grid>
        </Grid>
        <Box sx={styles.actionButtonsStyle}>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Save Template
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    }}
  >
    <CircularProgress />
  </Box>
);

const TemplateCreator = (props: TemplateCreatorProps) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <TemplateProvider initialTemplate={props.selectedTemplate}>
          <TemplateCreatorInner {...props} />
        </TemplateProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default TemplateCreator;

export interface TemplateCreatorModalProps {
  open: boolean;
  close: () => void;
  onSubmit: (form: InvoiceExtractTemplate) => void;
  selectedTemplate: InvoiceExtractTemplate | null;
}

export const TemplateCreatorModal = ({
  open,
  close,
  onSubmit,
  selectedTemplate
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
      <Paper sx={styles.modalStyle}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            aria-label="close"
            onClick={close}
            sx={styles.closeButtonStyle}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ flexGrow: 1, overflow: 'auto', minHeight: 400 }}>
          <TemplateCreator
            onSubmit={onSubmit}
            selectedTemplate={selectedTemplate}
            onCancel={close}
          />
        </Box>
      </Paper>
    </Modal>
  );
};
