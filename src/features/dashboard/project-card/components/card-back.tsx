import { Box, Card, Chip, Typography } from '@mui/material';
import { Weblinks } from './weblinks';
import { cardStyle } from '../style/style';
import { ProjectCardProps } from '../interfaces';

const CardBack = ({ data }: ProjectCardProps) => {
  return (
    <Card sx={{ ...cardStyle, height: '100%', transform: 'rotateY(180deg)' }}>
      <Box
        sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column' }}
      >
        <Typography variant="h6" gutterBottom>
          {data.title}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Weblinks data={data} />
        </Box>

        <Box
          sx={{
            borderTop: 1,
            borderColor: 'divider',
            pt: 2
          }}
        >
          <Typography variant="h6">Tags</Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              mt: 1
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
      </Box>
    </Card>
  );
};

export default CardBack;
