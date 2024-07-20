import AppLayout from '@shared/layouts/app-layout';

import dynamic from 'next/dynamic';

// This is needed because the FileDropzone component uses react-pdf -> pdfjs -> FileReader API which is not available in the server-side rendering environment.
// https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr

const DynamicFileDropzone = dynamic(
  () => import('feature/invoice-extractor/FileDropzone/file-dropzone'),
  { ssr: false }
);

const InvoiceExtractor = () => {
  return (
    <AppLayout>
      <DynamicFileDropzone />
    </AppLayout>
  );
};

export default InvoiceExtractor;
