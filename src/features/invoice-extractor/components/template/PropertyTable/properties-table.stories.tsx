import React from 'react';

import { TemplateProvider } from '../../context/TemplateContext';

import PropertiesTable from './properties-table';

export default {
  component: PropertiesTable,
  title: 'TemplateCreator/PropertiesTable',
  tags: ['autodocs']
};

export const Default = {
  args: {},
  decorators: [
    (Story: React.ComponentType) => (
      <TemplateProvider>
        <Story />
      </TemplateProvider>
    )
  ]
};
