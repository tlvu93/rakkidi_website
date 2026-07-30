import { Card } from '@mui/material';
import Image from 'next/image';

import { ProjectCardProps } from '../interfaces';
import { cardStyle } from '../style/style';

import { CardFooter } from './shared/card-footer';
import { CardSection, ImageContainer } from './shared/card-section';

const FALLBACK_COVER_IMAGE = '/images/pexels-pixabay-356079.jpg';

type CardFrontProps = ProjectCardProps & React.HTMLAttributes<HTMLDivElement>;

const CardFront: React.FC<CardFrontProps> = ({
  data,
  ...rest
}): React.ReactElement => {
  const coverImage = data.coverImage?.asset.url;

  return (
    <Card sx={cardStyle} {...rest}>
      <ImageContainer>
        <Image
          src={coverImage ?? FALLBACK_COVER_IMAGE}
          // A generic "Project Image" tells a screen reader nothing. When we
          // only have the stock fallback the image is decorative, so it is
          // hidden instead of announced.
          alt={coverImage ? `Cover image for ${data.title}` : ''}
          fill
          sizes="(max-width: 600px) 90vw, (max-width: 960px) 45vw, (max-width: 1280px) 30vw, 22vw"
          style={{ objectFit: 'cover' }}
        />
      </ImageContainer>
      <CardSection hasBorder>
        <CardFooter title={data.title} tags={data.tags || []} />
      </CardSection>
    </Card>
  );
};

export default CardFront;
