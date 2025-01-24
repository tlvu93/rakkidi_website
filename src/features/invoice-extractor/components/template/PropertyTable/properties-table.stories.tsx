import React from 'react';
import PropertiesTable from './properties-table';
import { TemplateProvider } from '../../context/TemplateContext';

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
