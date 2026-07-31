import type { Meta, StoryObj } from '@storybook/react';

import TemplateCreator from './template-creator';

const meta: Meta<typeof TemplateCreator> = {
  component: TemplateCreator,
  title: 'TemplateCreator',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof TemplateCreator>;

export const Default: Story = {
  args: {}
};
