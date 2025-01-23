import { Box, Card, Chip, Typography } from '@mui/material';
import { Weblinks } from './weblinks';
import { cardStyle } from '../style/style';
import { ProjectCardProps } from '../interfaces';
import { CardSection, ImageContainer } from './shared/card-section';

const CardBack = ({ data }: ProjectCardProps) => {
  return (
    <Card
      sx={{
        ...cardStyle,
        transform: 'rotateY(180deg)'
      }}
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
          <Typography variant="h6" gutterBottom>
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
        <Typography variant="h6" gutterBottom>
          Tags
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}
        >
          {data.tags?.map((tag, index) => (
            <Chip
              key={`${tag.title}_${index}`}
              label={tag.title}
              variant="outlined"
              size="small"
            />
          ))}
        </Box>
      </CardSection>
    </Card>
  );
};

export default CardBack;
