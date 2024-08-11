import AppLayout from '@shared/layouts/app-layout';

import dynamic from 'next/dynamic';

import ExtractTemplateManagement from 'features/invoice-extractor/components/ExtractTemplateManagement/extract-template-management';
import { useTemplateSelector } from 'features/invoice-extractor/hooks/useTemplateSelector';

// This is needed because the FileDropzone component uses react-pdf -> pdfjs -> FileReader API which is not available in the server-side rendering environment.
// https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr

const DynamicFileDropzone = dynamic(
  () =>
    import(
      'features/invoice-extractor/components/FileDropzone/csv-filedropzone'
    ),
  { ssr: false }
);

const InvoiceExtractor = () => {
  const { selectedTemplate, selectTemplate } = useTemplateSelector();

  return (
    <AppLayout>
      {selectedTemplate ? (
        <DynamicFileDropzone />
      ) : (
        <ExtractTemplateManagement setTemplate={selectTemplate} />
      )}
    </AppLayout>
  );
};

export default InvoiceExtractor;
