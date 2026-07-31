import { Typography, Paper, Container, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import dynamic from 'next/dynamic';

import PageMeta from '@shared/components/page-meta/page-meta';
import {
  useTemplateManagement,
  TemplateManagement
} from 'features/pdf-extractor';
import PDFExtractorLayout from 'features/pdf-extractor/components/layout/pdf-extractor-layout';

const DynamicFileDropzone = dynamic(
  () =>
    import('features/pdf-extractor/components/FileDropzone/csv-filedropzone'),
  { ssr: false }
);

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2]
}));

const PDFExtractorContent = (): React.ReactElement => {
  const { selectedTemplate } = useTemplateManagement();

  return (
    <Container maxWidth="lg">
      <PageMeta title="PDF extractor" />
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mb: 3, mt: 4 }}
      >
        PDF Extractor
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Extract data from your PDFs easily. First, select or create a template,
        then upload your PDF files for processing.
      </Typography>
      <StyledPaper>
        <TemplateManagement />
      </StyledPaper>
      {selectedTemplate && (
        <StyledPaper>
          <Typography variant="h5" gutterBottom>
            Upload PDFs
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Selected template: <strong>{selectedTemplate.name}</strong>
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <DynamicFileDropzone />
        </StyledPaper>
      )}
    </Container>
  );
};

const PDFExtractor = (): React.ReactElement => {
  return (
    <PDFExtractorLayout>
      <PDFExtractorContent />
    </PDFExtractorLayout>
  );
};

export default PDFExtractor;
