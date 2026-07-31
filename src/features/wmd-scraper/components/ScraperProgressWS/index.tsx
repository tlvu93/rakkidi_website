import { Box, Typography } from '@mui/material';
import LinearProgress, {
  LinearProgressProps
} from '@mui/material/LinearProgress';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useWebSocket from 'react-use-websocket';

export type ProgressStatus = 'idle' | 'scraping' | 'zipping' | 'finished';

const WS_URL =
  process.env.NODE_ENV === 'production'
    ? 'wss://api.rakkidi.de/ws'
    : 'ws://localhost:8080';

export type ProgressData = {
  status: ProgressStatus;
  progress: number;
  message: string;
};

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
): React.ReactElement {
  const rounded = Math.round(props.value);
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          variant="determinate"
          aria-label="Scraping progress"
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary'
          }}
        >
          {`${rounded}%`}
        </Typography>
      </Box>
    </Box>
  );
}

type Props = {
  isScraping: boolean;
  setIsScraping: (isScraping: boolean) => void;
  setScrapingSuccess: (scrapingSuccess: boolean) => void;
};

const isProgressData = (value: unknown): value is ProgressData => {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.status === 'string' &&
    typeof candidate.progress === 'number' &&
    typeof candidate.message === 'string'
  );
};

const ScraperProgressWS = ({
  isScraping,
  setIsScraping,
  setScrapingSuccess
}: Props): React.ReactElement | null => {
  const [progressData, setProgressData] = useState<ProgressData>();

  useWebSocket(WS_URL, {
    shouldReconnect: () => true,
    onMessage: (event): void => {
      if (typeof event.data !== 'string') return;

      let parsed: unknown;
      try {
        parsed = JSON.parse(event.data);
      } catch {
        // The server also emits non-JSON keep-alive frames; ignore them.
        return;
      }

      if (!isProgressData(parsed)) return;

      setProgressData(parsed);

      if (parsed.status === 'scraping') {
        setIsScraping(true);
      } else if (parsed.status === 'finished') {
        setIsScraping(false);
        setScrapingSuccess(true);
      }
    },
    onError: (): void => {
      toast.error('Lost the connection to the scraper.');
      setIsScraping(false);
    },
    onClose: (): void => {
      setIsScraping(false);
    }
  });

  if (!isScraping) return null;

  const progress = progressData?.progress ?? 0;

  return (
    <Box role="status" aria-live="polite">
      <Typography variant="h6" gutterBottom>
        Scraping progress: {progressData?.message ?? 'Starting…'}
      </Typography>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
};

export default ScraperProgressWS;
