import React from 'react';

import { TemplateProvider } from 'features/pdf-extractor/contexts';

import PropertiesTable from './properties-table';

export default {
  component: PropertiesTable,
  title: 'TemplateCreator/PropertiesTable',
  tags: ['autodocs']
};

export const Default = {
  args: {},
  decorators: [
    (Story: React.ComponentType): React.ReactElement => (
      <TemplateProvider initialTemplate={null}>
        <Story />
      </TemplateProvider>
    )
  ]
};
