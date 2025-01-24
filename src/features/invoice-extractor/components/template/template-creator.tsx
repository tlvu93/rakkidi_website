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
import PropertiesTable from './PropertyTable/properties-table';
import PdfViewer from './PdfViewer/pdf-viewer';
import {
  TemplateProvider,
  useTemplate
} from 'features/invoice-extractor/contexts/TemplateContext';
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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        ...styles.formStyle,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box sx={{ flex: 1, overflow: 'auto' }}>
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
            <Grid item xs={12} md={8}>
              <Paper sx={styles.pdfPreviewStyle}>
                <PdfViewer />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={styles.propertiesTableStyle}>
                <PropertiesTable />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          borderTop: 1,
          borderColor: 'divider',
          py: 2.5,
          // pt: 1.5,
          position: 'sticky',
          // bottom: 0,
          // height: 0, // 36px (button height) + 16px (padding)
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          alignItems: 'center'
        }}
      >
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Save Template
        </Button>
      </Box>
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
      <Paper
        sx={{
          ...styles.modalStyle,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh'
        }}
      >
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            backgroundColor: 'background.paper',
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <IconButton
            aria-label="close"
            onClick={close}
            sx={{
              ...styles.closeButtonStyle,
              position: 'absolute',
              right: 8,
              top: 8
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            minHeight: 400,
            mt: 6 // Add margin top to account for the sticky header
          }}
        >
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
