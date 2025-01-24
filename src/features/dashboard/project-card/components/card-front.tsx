import { Card } from '@mui/material';
import Image from 'next/image';

import { ProjectCardProps } from '../interfaces';
import { cardStyle } from '../style/style';

import { CardFooter } from './shared/card-footer';
import { CardSection, ImageContainer } from './shared/card-section';

const CardFront = ({ data }: ProjectCardProps) => {
  return (
    <Card sx={cardStyle}>
      <ImageContainer>
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
      </ImageContainer>
      <CardSection hasBorder>
        <CardFooter title={data.title} tags={data.tags || []} />
      </CardSection>
    </Card>
  );
};

export default CardFront;
