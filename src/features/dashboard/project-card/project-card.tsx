import { Box } from '@mui/material';
import React, { FC, ReactElement } from 'react';

import { useFlip } from '@shared/hooks';

import CardBack from './components/card-back';
import CardFront from './components/card-front';
import { ProjectCardProps } from './interfaces';
import { projectCardStyle } from './style/style';

/**
 * A flippable card component that displays project information
 * @param props - Component props
 * @param props.data - Project data to display
 * @returns A flippable card with front and back views
 */
const ProjectCard: FC<ProjectCardProps> = ({ data }): ReactElement => {
  const { flipped, flipCard } = useFlip();

  // role="button" without tabIndex and a key handler is only cosmetically
  // accessible: assistive tech announces a button that cannot be reached or
  // activated from the keyboard. Both are wired up here.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      flipCard();
    }
  };

  return (
    <Box
      onClick={flipCard}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${data.title} — show ${flipped ? 'front' : 'details'}`}
      sx={{
        ...projectCardStyle,
        transform: flipped ? 'rotateY(180deg)' : '',
        '&:focus-visible': {
          outline: '3px solid',
          outlineColor: 'primary.main',
          outlineOffset: 4
        }
      }}
    >
      {/* Only the face that is turned towards the viewer is exposed; the
          hidden one would otherwise still be reachable by screen readers and
          by Tab, since backface-visibility is purely visual. */}
      <CardFront data={data} aria-hidden={flipped} inert={flipped} />
      <CardBack data={data} aria-hidden={!flipped} inert={!flipped} />
    </Box>
  );
};

export default ProjectCard;
