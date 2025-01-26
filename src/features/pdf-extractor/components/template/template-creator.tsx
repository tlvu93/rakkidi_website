import {
  Grid,
  Box,
  Button,
  TextField,
  CircularProgress,
  Container
} from '@mui/material';
import React, { Suspense } from 'react';
import { FormProvider } from 'react-hook-form';

import { ErrorBoundary } from 'features/pdf-extractor/components/ErrorBoundary/error-boundary';
import {
  TemplateProvider,
  useTemplate
} from 'features/pdf-extractor/contexts/TemplateContext';
import { useTemplateForm } from 'features/pdf-extractor/hooks/useTemplateForm';
import { PDFExtractTemplate } from 'features/pdf-extractor/interfaces';

import PdfViewer from './PdfViewer/pdf-viewer';
import PropertiesTable from './PropertyTable/properties-table';
import * as styles from './styles/template-creator.styles';

interface TemplateCreatorProps {
  selectedTemplate: PDFExtractTemplate | null;
  onSubmit: (form: PDFExtractTemplate) => void;
  onCancel: () => void;
  isSaving?: boolean;
}

const TemplateCreatorInner = ({
  selectedTemplate,
  onSubmit,
  onCancel,
  isSaving = false
}: TemplateCreatorProps): React.ReactElement => {
  const { template } = useTemplate();
  const formMethods = useTemplateForm({
    selectedTemplate,
    onSubmit,
    currentFields: template.extractionFields
  });

  const onSubmitHandler = formMethods.handleSubmit((data): void => {
    onSubmit({
      ...data,
      extractionFields: template.extractionFields
    });
  });

  return (
    <Box
      component="form"
      onSubmit={onSubmitHandler}
      sx={{
        ...styles.formStyle,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%'
      }}
    >
      <FormProvider {...formMethods}>
        <Box sx={{ flex: 1, overflow: 'auto', pt: 1.5 }}>
          <Container maxWidth={false} sx={styles.containerStyle}>
            <Grid container spacing={2} pb={4}>
              <Grid item xs={12} md={6}>
                <TextField
                  {...formMethods.register('name', {
                    required: 'Template name is required'
                  })}
                  label="Template Name"
                  fullWidth
                  error={!!formMethods.formState.errors.name}
                  helperText={formMethods.formState.errors.name?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  {...formMethods.register('description', {
                    required: 'Template description is required'
                  })}
                  label="Template Description"
                  fullWidth
                  error={!!formMethods.formState.errors.description}
                  helperText={formMethods.formState.errors.description?.message}
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} sx={styles.gridContainerStyle}>
              <Grid item xs={12} lg={8}>
                <Box sx={styles.pdfPreviewStyle}>
                  <PdfViewer />
                </Box>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Box sx={styles.propertiesTableStyle}>
                  <PropertiesTable />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </FormProvider>
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
        <Button
          variant="contained"
          type="submit"
          disabled={isSaving}
          startIcon={isSaving ? <CircularProgress size={20} /> : null}
        >
          {isSaving ? 'Saving...' : 'Save Template'}
        </Button>
      </Box>
    </Box>
  );
};

const LoadingFallback = (): React.ReactElement => (
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

const TemplateCreator = (props: TemplateCreatorProps): React.ReactElement => {
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
