import FileDropzone from 'feature/invoice-extractor/dropzone/dropzone';
import AppLayout from '@shared/layouts/app-layout';

const InvoiceExtractor = () => {
  return (
    <AppLayout>
      <FileDropzone />
    </AppLayout>
  );
};

export default InvoiceExtractor;
