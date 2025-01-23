import { Box } from '@mui/material';
import { FC, ReactElement } from 'react';
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

  return (
    <Box
      onClick={flipCard}
      role="button"
      aria-pressed={flipped}
      sx={{
        ...projectCardStyle,
        transform: flipped ? 'rotateY(180deg)' : ''
      }}
    >
      <CardFront data={data} />
      <CardBack data={data} />
    </Box>
  );
};

export default ProjectCard;
