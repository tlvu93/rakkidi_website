import type { Meta, StoryObj } from '@storybook/react';

import FileDropzone from './file-dropzone';

const meta: Meta<typeof FileDropzone> = {
  component: FileDropzone,
  title: 'FileDropzone',
  tags: ['autodocs'],
  argTypes: {
    maxFiles: {
      control: 'number',
      description: 'The maximum number of files that can be dropped'
    },
    maxSize: {
      control: 'number',
      description: 'The maximum size of a single file (in bytes)'
    },
    minSize: {
      control: 'number',
      description: 'The minimum size of a single file (in bytes)'
    },
    accept: {
      control: 'object',
      description: 'The file types that are accepted'
    },
    onDrop: {
      action: 'files dropped',
      description: 'Callback for handling dropped files'
    },
    onDropRejected: {
      action: 'files rejected',
      description: 'Callback for handling rejected files'
    }
  },
  args: {
    maxFiles: 5,
    maxSize: 5_000_000,
    minSize: 0,
    accept: { 'application/pdf': ['.pdf'] }
  }
};

export default meta;

type Story = StoryObj<typeof FileDropzone>;

export const Default: Story = {};

export const SingleFile: Story = {
  args: {
    maxFiles: 1
  }
};

export const LargeFiles: Story = {
  args: {
    maxSize: 10_000_000
  }
};
