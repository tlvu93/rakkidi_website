import { Typography } from '@mui/material';

import { Tags } from 'features/dashboard/interfaces';

interface CardFooterProps {
  title: string;
  tags: Tags[];
}

export const CardFooter: React.FC<CardFooterProps> = ({
  title,
  tags
}): React.ReactElement => {
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
      <Typography variant="h6" component="h3">
        {title}
      </Typography>
      {tags.length > 0 && (
        // Joining beats mapping here: the previous version appended a comma
        // after every tag, including the last one.
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            display: 'block'
          }}
        >
          {tags.map((tag) => tag.title).join(', ')}
        </Typography>
      )}
    </div>
  );
};
