import AppLayout from '@shared/layouts/app-layout';
import dynamic from 'next/dynamic';

import {
  TemplateManagementProvider,
  useTemplateManagement
} from 'features/invoice-extractor/components/ExtractTemplateManagement/context/template-management-context';

const DynamicExtractTemplateManagement = dynamic(
  () =>
    import(
      'features/invoice-extractor/components/ExtractTemplateManagement/template-management'
    ),
  { ssr: false }
);

const DynamicFileDropzone = dynamic(
  () =>
    import(
      'features/invoice-extractor/components/FileDropzone/csv-filedropzone'
    ),
  { ssr: false }
);

const InvoiceExtractorContent = () => {
  const { selectedTemplate } = useTemplateManagement();

  return selectedTemplate ? (
    <DynamicFileDropzone />
  ) : (
    <DynamicExtractTemplateManagement />
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
