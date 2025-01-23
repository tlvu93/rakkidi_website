# ProjectCard Component

A flippable card component that displays project information with front and back views. The card can be flipped by clicking on it, revealing additional project details on the back.

## Usage

```tsx
import ProjectCard from './project-card';

const MyComponent = () => {
  const projectData = {
    _id: '1',
    projectCategory: { name: 'Web Development' },
    title: 'My Project',
    description: 'Project description...',
    coverImage: { asset: { url: 'image-url.jpg' } },
    weblinks: [
      { url: 'https://github.com/user/repo', type: { title: 'GitHub' } }
    ],
    tags: [{ title: 'React' }]
  };

  return <ProjectCard data={projectData} />;
};
```

## Props

The component accepts a single `data` prop of type `ProjectCardData`:

```typescript
interface ProjectCardData {
  _id: string; // Unique identifier
  projectCategory: { name: string }; // Project category
  title: string; // Project title
  description: string; // Project description
  coverImage?: { asset: { url: string } }; // Optional cover image
  weblinks?: Array<{
    // Optional web links
    url: string;
    type: { title: string };
  }>;
  tags?: Array<{ title: string }>; // Optional tags
}
```

## Features

- Flippable card animation using CSS transforms
- Responsive design with min/max width constraints
- Hover effect with shadow
- Accessible with proper ARIA attributes
- TypeScript support with full type definitions
- Storybook documentation and examples

## Examples

Check out the Storybook stories in `ProjectCard.stories.tsx` for various usage examples:

- Default card with all properties
- Card without cover image
- Card without web links
- Card without tags
- Card with long description

## Implementation Details

The component uses:

- Material-UI's Box component for styling
- Custom useFlip hook for flip animation state
- CSS transforms for the flip animation
- Separate CardFront and CardBack components for each view

## Best Practices

1. Always provide a meaningful description
2. Use high-quality images for the cover
3. Keep the title concise
4. Provide relevant tags for better categorization
5. Include useful web links when available

## Accessibility

The component implements:

- Proper role="button" for clickable area
- aria-pressed state for flip status
- Keyboard navigation support
