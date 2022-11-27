import { Box, Card, IconButton, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import RedoIcon from '@mui/icons-material/Redo';

export interface ProjectCardData {
  id: string;
  category: string;
  image: string;
  title: string;
  description: string;
  weblinks?: { url: string; type: string }[];
  tags: string[];
}

const FlipButton = ({ flip }: { flip: () => void }) => {
  return (
    <Box sx={{ marginLeft: '1rem' }}>
      <IconButton
        sx={{ bgcolor: 'primary.dark', ':hover': { bgcolor: 'primary.light' } }}
        onClick={() => flip()}
      >
        <RedoIcon />
      </IconButton>
    </Box>
  );
};

const CardFooter = ({ title, tags }: { title: string; tags: string[] }) => {
  return (
    <div>
      <Typography variant="h6">{title}</Typography>
      <Box>
        {tags.map((tag) => (
          <Typography key={tag} variant="caption" sx={{ whiteSpace: 'nowrap' }}>
            {`${tag}, `}
          </Typography>
        ))}
      </Box>
    </div>
  );
};

type Props = {
  data: ProjectCardData;
};

const ProjectCard = ({ data }: Props) => {
  const [flipped, setFlipped] = useState(false);

  const flipCard = () => {
    setFlipped(!flipped);
  };

  return (
    <Box
      sx={{
        minWidth: '10rem',
        maxWidth: '50rem',
        aspectRatio: '18/13',
        width: '100%',
        transition: 'transform 0.8s',
        transformStyle: 'preserve-3d',
        transform: flipped ? 'rotateY(180deg)' : ''
      }}
    >
      <Card
        className={'card-front'}
        sx={{
          width: '100%',
          backfaceVisibility: 'hidden',
          position: 'absolute'
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: 0,
            paddingBottom: '56.25%',
            position: 'relative'
          }}
        >
          <Image src={data.image} alt="Project Image" layout="fill" />
        </Box>
        <Box
          sx={{
            height: '5rem',
            padding: '1rem 2.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}
        >
          <CardFooter title={data.title} tags={data.tags} />

          <FlipButton flip={flipCard} />
        </Box>
      </Card>

      <Card
        className={'card-back'}
        sx={{
          width: '100%',

          transform: 'rotateY(180deg)',
          position: 'absolute',
          backfaceVisibility: 'hidden'
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: 0,
            paddingBottom: '56.25%',
            position: 'relative'
          }}
        ></Box>
        <Box
          sx={{
            height: '5rem',
            padding: '1rem 2.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}
        >
          <div>
            <Typography variant="h6">{data.title}</Typography>
            <Box>
              {data.tags.map((tag) => (
                <Typography
                  key={tag}
                  variant="caption"
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  {`${tag}, `}
                </Typography>
              ))}
            </Box>
          </div>
          <FlipButton flip={flipCard} />
        </Box>
      </Card>
    </Box>
  );
};

export default ProjectCard;
