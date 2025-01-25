import React from 'react';

import { TemplateProvider } from 'features/invoice-extractor/contexts';

import PDFViewer from './pdf-viewer';

export default {
  component: PDFViewer,
  title: 'TemplateCreator/PDFViewer',
  tags: ['autodocs']
};

export const Default = {
  decorators: [
    (Story: React.ComponentType): React.ReactElement => (
      <TemplateProvider initialTemplate={null}>
        <Story />
      </TemplateProvider>
    )
  ]
};
