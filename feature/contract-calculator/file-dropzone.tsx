import { Box, Container, Typography } from '@mui/material';
import { useCallback } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Order } from 'interfaces/contract-calculator';
import { addOrder } from './order-slice';
import { getDimension } from './utility/getDimension';

import { useAppDispatch } from 'app/hooks';

/**
 * This Component renders a Field, in which files can be dropped
 */

const FileDropzone = () => {
  const dispatch = useAppDispatch();

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      let promises = acceptedFiles.map(async (file) => {
        return getDimension(file);
      });
      // Filter out all errors
      let resolvedPromises = Promise.all(
        promises.map((p) => p.catch((e) => 'FAILED'))
      ).then((values) => values.filter((v) => v !== 'FAILED'));

      resolvedPromises.then((returnedValues) =>
        returnedValues.forEach((value) => {
          dispatch(addOrder(value as Order));
        })
      );
    },
    [dispatch]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container
      sx={{
        height: '100%',
        width: '100%',
        backgroundColor: '#cfe8fc'
      }}
      maxWidth="sm"
    >
      <div
        {...getRootProps()}
        style={{
          display: 'grid',
          alignItems: 'center',
          height: '100%',
          width: '100%'
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
            <Typography
              display="flex"
              flexDirection={'column'}
              alignItems={'center'}
              justifyContent={'center'}
              textAlign={'center'}
              variant="h5"
            >
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

export default FileDropzone;
