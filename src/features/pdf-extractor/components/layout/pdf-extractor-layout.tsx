import React from 'react';

import AppLayout from '@shared/layouts/app-layout';

import { TemplateManagementProvider } from '../../contexts/template-management-context';

interface PDFExtractorLayoutProps {
  children: React.ReactNode;
}

const PDFExtractorLayout = ({
  children
}: PDFExtractorLayoutProps): React.ReactElement => {
  return (
    <AppLayout>
      <TemplateManagementProvider>{children}</TemplateManagementProvider>
    </AppLayout>
  );
};

export default PDFExtractorLayout;
