import { useEffect, useState } from 'react';
import LinearProgress, {
  LinearProgressProps
} from '@mui/material/LinearProgress';
import { Box, Typography } from '@mui/material';

export type ProgressStatus = 'idle' | 'scraping' | 'zipping' | 'finished';

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

const ScraperProgressWS = () => {
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080'); // Use your server URL

    ws.onopen = () => {
      console.log('Connected to the WebSocket server');
      ws.send('Hello Server!');
    };

    ws.onmessage = (event: MessageEvent) => {
      const dataString: string = event.data;

      if (dataString.startsWith('{"status"')) {
        const data: ProgressData = JSON.parse(dataString);
        console.log('Setting progress to: ', data.progress);
        setProgress(data.progress);

        if (data.status === 'scraping') setShowProgress(true);
        else if (data.status === 'finished') setShowProgress(false);
      }
    };

    ws.onerror = (error) => {
      console.log('WebSocket error: ', error);
      setShowProgress(false);
    };

    ws.onclose = () => {
      console.log('Disconnected from the WebSocket server');
      setShowProgress(false);
    };

    return () => {
      ws.close();
      setShowProgress(false);
    };
  }, []);

  if (showProgress) return <LinearProgressWithLabel value={progress} />;
  else return <></>;
};

export default ScraperProgressWS;
