import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';

import { ArrowProps } from '../interfaces';

/**
 * react-slick hands its arrows a className/style pair and an onClick. This was
 * previously a bare <div>, which meant the carousel could only be paged with a
 * mouse and the arrows had no accessible name.
 */
export const CustomArrow: React.FC<
  ArrowProps & { direction: 'next' | 'prev' }
> = ({ className, style, onClick, direction }) => {
  const isNext = direction === 'next';

  return (
    <button
      type="button"
      className={className}
      style={{
        ...style,
        display: 'block',
        color: 'black',
        background: 'none',
        border: 0,
        padding: 0,
        cursor: 'pointer'
      }}
      onClick={onClick}
      aria-label={isNext ? 'Show next projects' : 'Show previous projects'}
    >
      {isNext ? (
        <ArrowForward aria-hidden="true" />
      ) : (
        <ArrowBack aria-hidden="true" />
      )}
    </button>
  );
};
