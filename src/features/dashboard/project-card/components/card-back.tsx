import { Box, Card, Chip, Typography } from '@mui/material';
import { Weblinks } from './weblinks';
import { cardStyle } from '../style/style';
import { ProjectCardProps } from '../interfaces';

const CardBack = ({ data }: ProjectCardProps) => {
  return (
    <Card
      sx={{
        ...cardStyle,
        transform: 'rotateY(180deg)'
      }}
    >
      <div
        style={{
          paddingBottom: '56.25%',
          position: 'relative'
        }}
      >
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
      </div>
      <Box
        sx={{
          flex: 1,

          borderTop: 1,
          borderColor: 'divider',
          p: '1rem 2.5rem'
        }}
      >
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
          {data.tags &&
            data.tags.map((tag, index) => (
              <Chip
                key={`${tag}_${index}`}
                label={tag.title}
                variant="outlined"
                size="small"
              />
            ))}
        </Box>
      </Box>
    </Card>
  );
};

export default CardBack;
