import { useState } from 'react';
import LinearProgress, {
  LinearProgressProps
} from '@mui/material/LinearProgress';
import { Box, Typography } from '@mui/material';
import useWebSocket from 'react-use-websocket';
import { toast } from 'react-toastify';

export type ProgressStatus = 'idle' | 'scraping' | 'zipping' | 'finished';

const WS_URL =
  process.env.NODE_ENV === 'production'
    ? 'wss://www.api.rakkidi.de:/ws'
    : 'ws://localhost:8080';

export type ProgressData = {
  status: ProgressStatus;
  progress: number;
  message: string;
};

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

type Props = {
  isScraping: boolean;
  setIsScraping: (isScraping: boolean) => void;
  setScrapingSuccess: (scrapingSuccess: boolean) => void;
};

const ScraperProgressWS = ({
  isScraping,
  setIsScraping,
  setScrapingSuccess
}: Props) => {
  const [progressData, setProgressData] = useState<ProgressData>();

  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    onMessage: (event) => {
      const dataString: string = event.data;

      if (dataString.startsWith('{"status"')) {
        const data: ProgressData = JSON.parse(dataString);

        setProgressData(data);

        if (data.status === 'scraping') setIsScraping(true);
        else if (data.status === 'finished') {
          setIsScraping(false);
          setScrapingSuccess(true);
        }
      }
      onerror = (error) => {
        toast.error('WebSocket error: ' + error);
        setIsScraping(false);
      };

      onclose = () => {
        console.log('Disconnected from the WebSocket server');
        setIsScraping(false);
      };
    }
  });

  if (isScraping)
    return (
      <>
        <Typography variant="h6" gutterBottom>
          Scraping progress: {progressData?.message}
        </Typography>
        <LinearProgressWithLabel value={progressData?.progress || 0} />
      </>
    );
  else return <></>;
};

export default ScraperProgressWS;
