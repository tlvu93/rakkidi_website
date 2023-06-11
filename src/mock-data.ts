import { faker } from '@faker-js/faker';
import { ProjectCardData } from 'feature/dashboard/interfaces';

export const MOCK_CARDS: ProjectCardData[] = [
  {
    id: faker.string.uuid(),
    category: 'Portfolio',
    coverImage: faker.image.url(),
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
    id: faker.string.uuid(),
    category: 'App',
    coverImage: faker.image.url(),
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
    id: faker.string.uuid(),
    category: 'App Maker',
    coverImage: faker.image.url(),
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
    id: faker.string.uuid(),
    category: 'App',
    coverImage: faker.image.url(),
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
    id: faker.string.uuid(),
    category: 'App',
    coverImage: faker.image.url(),
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
    id: faker.string.uuid(),
    category: 'Design',
    coverImage: faker.image.url(),
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
    id: faker.string.uuid(),
    category: 'Design',
    coverImage: faker.image.url(),
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
    id: faker.string.uuid(),
    category: 'Design',
    coverImage: faker.image.url(),
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
    id: faker.string.uuid(),
    category: 'Design',
    coverImage: faker.image.url(),
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
    id: faker.string.uuid(),
    category: 'ETC',
    coverImage: faker.image.url(),
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
    id: faker.string.uuid(),
    category: 'ETC',
    coverImage: faker.image.url(),
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
