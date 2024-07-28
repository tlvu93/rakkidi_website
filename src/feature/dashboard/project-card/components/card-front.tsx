import { Box, Card, Typography } from '@mui/material';
import Image from 'next/image';
import { ProjectCardProps } from '../interfaces';
import { cardStyle } from '../style/style';
import { Tags } from 'feature/dashboard/interfaces';

const CardFront = ({ data }: ProjectCardProps) => {
  const CardFooter = ({ title, tags }: { title: string; tags: Tags[] }) => {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <div>
          {tags.map((tag) => (
            <Typography
              key={tag.title}
              variant="caption"
              sx={{ whiteSpace: 'nowrap' }}
            >
              {`${tag.title}, `}
            </Typography>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card sx={cardStyle}>
      <div
        style={{
          width: '100%',
          height: 0,
          paddingBottom: '56.25%',
          position: 'relative',
          border: '2px solid rgba(0, 0, 0, 0.1)'
        }}
      >
        <Image
          src={
            data.coverImage
              ? data.coverImage.asset.url
              : '/images/pexels-pixabay-356079.jpg'
          }
          alt="Project Image"
          fill
          sizes="(max-width: 768px) 75vw, (max-width: 1200px) 54vw, 33vw"
          priority={true}
        />
      </div>
      <div
        style={{
          flex: 1,
          padding: '1rem 2.5rem'
        }}
      >
        <CardFooter title={data.title} tags={data.tags || []} />
      </div>
    </Card>
  );
};

export default CardFront;
