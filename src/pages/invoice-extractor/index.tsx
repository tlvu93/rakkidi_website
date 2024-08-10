import AppLayout from '@shared/layouts/app-layout';

import dynamic from 'next/dynamic';
import { useTemplate } from './hooks/useTemplate';
import ExtractTemplateManagement from 'features/invoice-extractor/components/ExtractTemplateManagement/extract-template-management';

// This is needed because the FileDropzone component uses react-pdf -> pdfjs -> FileReader API which is not available in the server-side rendering environment.
// https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr

const DynamicFileDropzone = dynamic(
  () =>
    import('features/invoice-extractor/components/FileDropzone/file-dropzone'),
  { ssr: false }
);

const InvoiceExtractor = () => {
  const { template, setTemplate } = useTemplate();

  return (
    <AppLayout>
      {template ? (
        <DynamicFileDropzone />
      ) : (
        <ExtractTemplateManagement setTemplate={setTemplate} />
      )}
    </AppLayout>
  );
};

export default InvoiceExtractor;
