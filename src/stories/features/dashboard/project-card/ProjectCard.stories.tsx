import type { Meta, StoryObj } from '@storybook/react';

import { ProjectCardData } from '../../../../features/dashboard/interfaces';
import ProjectCard from '../../../../features/dashboard/project-card/project-card';

const meta = {
  title: 'Features/Dashboard/ProjectCard',
  component: ProjectCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flippable card component that displays project information with front and back views.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'Project data to display in the card',
      control: 'object'
    }
  }
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleProject: ProjectCardData = {
  _id: '1',
  projectCategory: {
    name: 'Web Development'
  },
  title: 'Sample Project',
  description:
    'This is a sample project description that demonstrates the ProjectCard component.',
  coverImage: {
    asset: {
      url: 'https://picsum.photos/400/300'
    }
  },
  weblinks: [
    {
      url: 'https://github.com/sample/project',
      type: {
        title: 'GitHub'
      }
    },
    {
      url: 'https://sample-project.com',
      type: {
        title: 'Website'
      }
    }
  ],
  tags: [{ title: 'React' }, { title: 'TypeScript' }, { title: 'Material-UI' }]
};

export const Default: Story = {
  args: {
    data: sampleProject
  }
};

export const NoImage: Story = {
  args: {
    data: {
      ...sampleProject,
      coverImage: undefined
    }
  }
};

export const NoWeblinks: Story = {
  args: {
    data: {
      ...sampleProject,
      weblinks: undefined
    }
  }
};

export const NoTags: Story = {
  args: {
    data: {
      ...sampleProject,
      tags: undefined
    }
  }
};

export const LongDescription: Story = {
  args: {
    data: {
      ...sampleProject,
      description:
        'This is a very long project description that demonstrates how the ProjectCard component handles overflow text. It might include multiple sentences and technical details about the project, technologies used, and key features implemented.'
    }
  }
};
