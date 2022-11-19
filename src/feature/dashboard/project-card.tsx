import { Box, Card, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

export interface ProjectCardData {
  category: string;
  image: string;
  title: string;
  description: string;
  weblinks?: { url: string; type: string }[];
  tags: string[];
}

type Props = {
  data: ProjectCardData;
};

const ProjectCard = ({ data }: Props) => {
  return (
    <Box sx={{ minWidth: '28rem', width: '100%' }}>
      <Card sx={{ width: '100%' }}>
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
          <div>
            <Typography variant="h6">{data.title}</Typography>
            <Box>
              {data.tags.map((tag) => (
                <Typography key={tag} variant="caption">
                  {`${tag}, `}
                </Typography>
              ))}
            </Box>
          </div>
          <div>Arrow</div>
        </Box>
      </Card>
    </Box>
  );
};

export default ProjectCard;
