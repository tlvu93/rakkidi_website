import { Box, Card, Typography } from '@mui/material';
import Image from 'next/image';
import { ProjectCardProps } from '../interfaces';
import { cardStyle } from '../style/style';

const CardFront = ({ data }: ProjectCardProps) => {
  const CardFooter = ({ title, tags }: { title: string; tags: string[] }) => {
    return (
      <div>
        <Typography variant="h6">{title}</Typography>
        <Box>
          {tags.map((tag) => (
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
    );
  };

  return (
    <Card sx={cardStyle}>
      <Box
        sx={{
          width: '100%',
          height: 0,
          paddingBottom: '56.25%',
          position: 'relative'
        }}
      >
        <Image
          src={data.image}
          alt="Project Image"
          fill
          sizes="(max-width: 768px) 75vw, (max-width: 1200px) 54vw, 33vw"
          priority={true}
        />
      </Box>
      <Box
        sx={{
          padding: '1rem 2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}
      >
        <CardFooter title={data.title} tags={data.tags} />
      </Box>
    </Card>
  );
};

export default CardFront;
