import { ProjectCardData } from 'feature/dashboard/project-card';

export const MOCK_CARDS: ProjectCardData[] = [
  {
    category: 'Portfolio',
    image:
      'https://images.pexels.com/photos/323645/pexels-photo-323645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Portfolio',
    description: 'This is my Portfolio Website',
    weblinks: [
      { url: 'figma.com', type: 'figma' },
      { url: 'website.com', type: 'website' },
      { url: 'github.com', type: 'github' }
    ],
    tags: [
      'NextJS',
      'ReactJS',
      'JavaScript',
      'TailwindCSS',
      'Material UI',
      'CSS'
    ]
  },
  {
    category: 'Siteplan',
    image:
      'https://images.pexels.com/photos/323645/pexels-photo-323645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Siteplan',
    description: 'This is my Siteplan Website',
    weblinks: [
      { url: 'figma.com', type: 'figma' },
      { url: 'website.com', type: 'website' },
      { url: 'github.com', type: 'github' }
    ],
    tags: [
      'NextJS',
      'ReactJS',
      'JavaScript',
      'TailwindCSS',
      'Material UI',
      'CSS'
    ]
  },
  {
    category: 'Sticker Maker',
    image:
      'https://images.pexels.com/photos/323645/pexels-photo-323645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Sticker Maker',
    description: 'This is my Sticker Maker Website',
    weblinks: [
      { url: 'figma.com', type: 'figma' },
      { url: 'website.com', type: 'website' },
      { url: 'github.com', type: 'github' }
    ],
    tags: [
      'NextJS',
      'ReactJS',
      'JavaScript',
      'TailwindCSS',
      'Material UI',
      'CSS'
    ]
  }
];
