import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { TemplateProvider } from 'features/pdf-extractor/contexts';

import PDFViewer from './pdf-viewer';

const meta: Meta<typeof PDFViewer> = {
  component: PDFViewer,
  title: 'TemplateCreator/PDFViewer',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof PDFViewer>;

export const Default: Story = {
  decorators: [
    (Story: React.ComponentType): React.ReactElement => (
      <TemplateProvider initialTemplate={null}>
        <Story />
      </TemplateProvider>
    )
  ]
};
