import { Box, Card, Container, Typography } from '@mui/material';
import { useCallback } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Order } from '@shared/interfaces/contract-calculator';
import { addOrder } from './order-slice';
import { getDimension } from './utility/getDimension';

import { useAppDispatch } from 'hooks';

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
    <Card
      variant="outlined"
      sx={{
        width: '26rem',
        height: '20rem',
        padding: '0.625rem',
        backgroundColor: '#F5F7FA',

        border: isDragActive
          ? '2px dashed var(--primary-normal, #00081C)'
          : '1px dashed var(--primary-normal, #2A3142)'
      }}
    >
      <div
        {...getRootProps()}
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '25px'
        }}
      >
        <FileUploadOutlinedIcon style={{ fontSize: '5.0em' }} />
        <input
          {...getInputProps({
            //Its important to filter, because somehow .cdrt files makes the HTML5 Filepicker to crash
            //Add more filters if any forgotten
            accept: 'image/*, .eps'
          })}
        />
        <Box
          sx={{
            display: 'flex',
            padding: '15px 20px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '30px',

            borderRadius: '15px',
            background: 'var(--primary-normal, #2A3142)'
          }}
        >
          <Typography color={'#F5F7FA'}>BILD HOCHLADEN</Typography>
        </Box>
        <Box>
          <Typography
            display="flex"
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            textAlign={'center'}
            variant="body1"
          >
            Bitte laden Sie ihre Dateien im
            <br />
            Dateiformat
            <br />
            .jpeg, .png, .pdf oder .eps
            <br />
            hoch
          </Typography>
        </Box>
      </div>
    </Card>
  );
};

export default FileDropzone;
