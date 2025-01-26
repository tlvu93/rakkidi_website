import FileDropzone from './file-dropzone';

export default {
  component: FileDropzone,
  title: 'FileDropzone',
  tags: ['autodocs'],
  argTypes: {
    maxFiles: {
      control: 'number',
      defaultValue: 5,
      description: 'The maximum number of files that can be dropped'
    },
    maxSize: {
      control: 'number',
      defaultValue: 5000000,
      description: 'The maximum size of a single file (in bytes)'
    },
    minSize: {
      control: 'number',
      defaultValue: 0,
      description: 'The minimum size of a single file (in bytes)'
    },
    accept: {
      control: 'object',
      defaultValue: { 'application/pdf': ['.pdf'] },
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
  }
};

export const Default = {
  args: {}
};

export const SingleFileDropzone = {
  args: {
    maxFiles: 1,
    description: 'A dropzone that only accepts a single file'
  }
};

export const LargeFileDropzone = {
  args: {
    maxSize: 10000000,
    description: 'A dropzone that accepts larger files up to 10MB'
  }
};
