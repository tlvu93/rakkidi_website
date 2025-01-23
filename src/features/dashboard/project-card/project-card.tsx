import { Box } from '@mui/material';
import { FC, ReactElement } from 'react';

import { useFlip } from '@shared/hooks';
import CardBack from './components/card-back';
import CardFront from './components/card-front';
import { ProjectCardProps } from './interfaces';

/**
 * A flippable card component that displays project information
 * @param props - Component props
 * @param props.data - Project data to display
 * @returns A flippable card with front and back views
 */
const ProjectCard: FC<ProjectCardProps> = ({ data }): ReactElement => {
  const { flipped, flipCard } = useFlip();

  return (
    <Box
      onClick={flipCard}
      role="button"
      aria-pressed={flipped}
      sx={{
        minWidth: '20rem',
        maxWidth: '28rem',
        aspectRatio: '18/14',

        width: '100%',
        transition: 'transform 0.8s',
        transformStyle: 'preserve-3d',
        transform: flipped ? 'rotateY(180deg)' : '',
        '&:hover': {
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)'
        }
      }}
    >
      <CardFront data={data} />
      <CardBack data={data} />
    </Box>
  );
};

export default ProjectCard;
