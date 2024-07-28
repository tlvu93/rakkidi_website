import { Box } from '@mui/material';

import useFlip from './hooks/useFlip';
import CardBack from './components/card-back';

import { ProjectCardProps } from './interfaces';
import CardFront from './components/card-front';

const ProjectCard = ({ data }: ProjectCardProps) => {
  const { flipped, flipCard } = useFlip();

  return (
    <Box
      onClick={flipCard}
      role="button"
      aria-pressed={flipped}
      sx={{
        minWidth: '20rem',
        maxWidth: '28rem',
        aspectRatio: '18/13',

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
