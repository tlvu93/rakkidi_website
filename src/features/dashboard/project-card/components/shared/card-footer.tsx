import { Typography } from '@mui/material';

import { Tags } from 'features/dashboard/interfaces';

interface CardFooterProps {
  title: string;
  tags: Tags[];
}

export const CardFooter = ({ title, tags }: CardFooterProps) => {
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
