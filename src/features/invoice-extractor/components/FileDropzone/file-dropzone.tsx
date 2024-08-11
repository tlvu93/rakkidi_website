import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone, FileWithPath, Accept, FileError } from 'react-dropzone';
import { Container, CircularProgress, Typography } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import {
  baseStyle,
  activeStyle,
  acceptStyle,
  rejectStyle
} from './utils/styles';

interface FileDropzoneProps {
  onDrop: (acceptedFiles: FileWithPath[]) => void;
  accept?: Accept;
  maxFiles?: number;
  maxSize?: number;
  minSize?: number;
  onDropRejected?: (
    fileRejections: Array<{ file: FileWithPath; errors: FileError[] }>
  ) => void;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  onDrop,
  accept = { 'application/pdf': ['.pdf'] },
  maxFiles,
  maxSize,
  minSize,
  onDropRejected
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setLoading(false); // Ensure loading is stopped immediately after drop
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop: handleDrop,
    accept,
    maxFiles,
    maxSize,
    minSize,
    onDropRejected: (fileRejections) => {
      if (onDropRejected) {
        onDropRejected(fileRejections);
      }
      setLoading(false);
    },
    onFileDialogOpen: () => setLoading(true),
    onFileDialogCancel: () => setLoading(false),
    onDragEnter: () => setLoading(true),
    onDragLeave: () => setLoading(false),
    onDropAccepted: () => setLoading(false)
  });

  const style = useMemo(() => {
    return {
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    };
  }, [isDragActive, isDragReject, isDragAccept]);

  return (
    <Container maxWidth="sm">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <Typography variant="body1" align="center">
            Drag &apos;n&apos; drop files here, or click to select files
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <SaveAltIcon style={{ fontSize: '2.5em' }} />
          )}
        </div>
      </div>
    </Container>
  );
};

export default FileDropzone;
