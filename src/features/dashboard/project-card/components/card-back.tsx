import { Box, Card, Chip, Typography } from '@mui/material';

import { ProjectCardProps } from '../interfaces';
import { cardStyle } from '../style/style';

import { CardSection, ImageContainer } from './shared/card-section';
import { Weblinks } from './weblinks';

type CardBackProps = ProjectCardProps & React.HTMLAttributes<HTMLDivElement>;

const CardBack: React.FC<CardBackProps> = ({
  data,
  ...rest
}): React.ReactElement => {
  return (
    <Card
      sx={{
        ...cardStyle,
        transform: 'rotateY(180deg)'
      }}
      {...rest}
    >
      <ImageContainer>
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            p: '1rem 2.5rem',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography variant="h6" component="h3" gutterBottom>
            {data.title}
          </Typography>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Weblinks data={data} />
          </Box>
        </Box>
      </ImageContainer>
      <CardSection hasBorder>
        <Typography variant="h6" component="h4" gutterBottom>
          Tags
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}
        >
          {data.tags?.length ? (
            data.tags.map((tag, index) => (
              <Chip
                key={`${tag.title}_${index}`}
                label={tag.title}
                variant="outlined"
                size="small"
              />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No tags
            </Typography>
          )}
        </Box>
      </CardSection>
    </Card>
  );
};

export default CardBack;
