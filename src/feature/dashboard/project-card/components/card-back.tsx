import { Card, Chip, Typography } from '@mui/material';
import { Weblinks } from './weblinks';
import { cardStyle } from '../style/style';
import { ProjectCardProps } from '../interfaces';

const CardBack = ({ data }: ProjectCardProps) => {
  return (
    <Card sx={{ ...cardStyle, height: '100%', transform: 'rotateY(180deg)' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '1rem 2.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ width: '100%', position: 'relative' }}>
          <Typography variant="h6">{data.title}</Typography>
          <Typography variant="body2">{data.description}</Typography>
        </div>

        <div>
          <Weblinks data={data} />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <Typography variant="h6">Tags</Typography>
          <div
            style={{
              display: 'flex',
              // justifyContent: 'space-evenly',
              gap: '0.5rem',
              flexWrap: 'wrap'
            }}
          >
            {data.tags.map((tag, index) => (
              <Chip
                key={`${tag}_${index}`}
                label={tag.title}
                variant="outlined"
                size="small"
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CardBack;
