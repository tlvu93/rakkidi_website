import React from 'react';
import AppLayout from '@shared/layouts/app-layout';
import { TemplateManagementProvider } from '../../contexts/template-management-context';

interface InvoiceExtractorLayoutProps {
  children: React.ReactNode;
}

const InvoiceExtractorLayout = ({
  children
}: InvoiceExtractorLayoutProps): React.ReactElement => {
  return (
    <AppLayout>
      <TemplateManagementProvider>{children}</TemplateManagementProvider>
    </AppLayout>
  );
};

export default InvoiceExtractorLayout;
