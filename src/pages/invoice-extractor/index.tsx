'use client';

import FileDropzone from 'feature/invoice-extractor/FileDropzone/file-dropzone';
import AppLayout from '@shared/layouts/app-layout';

const InvoiceExtractor = () => {
  return (
    <AppLayout>
      <FileDropzone />
    </AppLayout>
  );
};

export default InvoiceExtractor;
