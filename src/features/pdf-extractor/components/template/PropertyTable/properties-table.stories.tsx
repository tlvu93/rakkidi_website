import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { TemplateProvider } from 'features/pdf-extractor/contexts';

import PropertiesTable from './properties-table';

const meta: Meta<typeof PropertiesTable> = {
  component: PropertiesTable,
  title: 'TemplateCreator/PropertiesTable',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof PropertiesTable>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story: React.ComponentType): React.ReactElement => (
      <TemplateProvider initialTemplate={null}>
        <Story />
      </TemplateProvider>
    )
  ]
};
