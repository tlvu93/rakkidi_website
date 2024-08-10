import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { ArrowProps } from '../interfaces';

export const CustomArrow: React.FC<
  ArrowProps & { direction: 'next' | 'prev' }
> = ({ className, style, onClick, direction }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        color: 'black'
      }}
      onClick={onClick}
    >
      {direction === 'next' ? <ArrowForward /> : <ArrowBack />}
    </div>
  );
};
