import { faker } from '@faker-js/faker';
import { ProjectCardData } from 'feature/dashboard/interfaces';

export const MOCK_CARDS: ProjectCardData[] = [
  {
    id: faker.datatype.uuid(),
    category: 'Portfolio',
    image: faker.image.image(),
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
    id: faker.datatype.uuid(),
    category: 'App',
    image: faker.image.image(),
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
    id: faker.datatype.uuid(),
    category: 'App Maker',
    image: faker.image.image(),
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
  },
  {
    id: faker.datatype.uuid(),
    category: 'App',
    image: faker.image.image(),
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
    id: faker.datatype.uuid(),
    category: 'App',
    image: faker.image.image(),
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
    id: faker.datatype.uuid(),
    category: 'Design',
    image: faker.image.image(),
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
  },
  {
    id: faker.datatype.uuid(),
    category: 'Design',
    image: faker.image.image(),
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
    id: faker.datatype.uuid(),
    category: 'Design',
    image: faker.image.image(),
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
    id: faker.datatype.uuid(),
    category: 'Design',
    image: faker.image.image(),
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
  },
  {
    id: faker.datatype.uuid(),
    category: 'ETC',
    image: faker.image.image(),
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
    id: faker.datatype.uuid(),
    category: 'ETC',
    image: faker.image.image(),
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
  }
];
