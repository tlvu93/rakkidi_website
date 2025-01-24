import AppLayout from '@shared/layouts/app-layout';
import dynamic from 'next/dynamic';
import { Box, Typography, Paper, Container, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  TemplateManagementProvider,
  useTemplateManagement,
  TemplateManagement
} from 'features/invoice-extractor';

const DynamicFileDropzone = dynamic(
  () =>
    import(
      'features/invoice-extractor/components/FileDropzone/csv-filedropzone'
    ),
  { ssr: false }
);

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2]
}));

const InvoiceExtractorContent = () => {
  const { selectedTemplate } = useTemplateManagement();

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mb: 3, mt: 4 }}>
        Invoice Extractor
      </Typography>
      <Typography variant="body1" paragraph>
        Extract data from your invoices easily. First, select or create a
        template, then upload your invoice files for processing.
      </Typography>

      <StyledPaper>
        <TemplateManagement />
      </StyledPaper>

      {selectedTemplate && (
        <StyledPaper>
          <Typography variant="h5" gutterBottom>
            Upload Invoices
          </Typography>
          <Typography variant="body2" paragraph>
            Selected template: <strong>{selectedTemplate.name}</strong>
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <DynamicFileDropzone />
        </StyledPaper>
      )}
    </Container>
  );
};

const InvoiceExtractor = () => {
  return (
    <AppLayout>
      <TemplateManagementProvider>
        <InvoiceExtractorContent />
      </TemplateManagementProvider>
    </AppLayout>
  );
};

export default InvoiceExtractor;
