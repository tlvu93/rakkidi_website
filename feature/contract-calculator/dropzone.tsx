import { Box, Container, Typography } from '@mui/material';
import { useCallback } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { getDimension } from './utility/getDimension';

/**
 * This Component renders a Field, in which files can be dropped
 */

const Dropzone = () => {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    let promises = acceptedFiles.map(async (file) => {
      return getDimension(file);
    });
    let resolvedPromises = Promise.all(
      promises.map((p) => p.catch((e) => 'FAILED'))
    ).then((values) => values.filter((v) => v !== 'FAILED'));

    resolvedPromises.then((returnedValues) =>
      returnedValues.forEach((value) =>
        console.log('add to redux later', value)
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container maxWidth="sm">
      <div
        {...getRootProps()}
        style={{
          display: 'grid',
          alignItems: 'center',
          backgroundColor: '#cfe8fc',
          height: '300px'
        }}
      >
        <input
          {...getInputProps({
            //Its important to filter, because somehow .cdrt files makes the HTML5 Filepicker to crash
            //Add more filters if any forgotten
            accept: 'image/*, .eps'
          })}
        />
        {isDragActive ? (
          <Box>
            <Typography variant="h1">Datei hier reinziehen ...</Typography>
          </Box>
        ) : (
          <Box>
            <Typography variant="h5">
              Datei hier reinziehen,
              <br /> oder für die Dateiauswahl klicken
              <SaveAltIcon style={{ fontSize: '2.5em' }} />
            </Typography>
          </Box>
        )}
      </div>
    </Container>
  );
};

export default Dropzone;
