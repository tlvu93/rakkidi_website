import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {
  Container,
  CircularProgress,
  Typography,
  useTheme
} from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone, Accept, FileError } from 'react-dropzone';

import { getStyles } from 'features/pdf-extractor/utils/styles';

interface FileDropzoneProps {
  onDrop: (acceptedFiles: File[]) => void | Promise<void>;
  accept?: Accept;
  maxFiles?: number;
  maxSize?: number;
  minSize?: number;
  onDropRejected?: (
    fileRejections: Array<{ file: File; errors: FileError[] }>
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
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDrop = useCallback(
    // react-dropzone 19 types the callback generically over the File subtype.
    async <T extends File>(acceptedFiles: T[]) => {
      // This used to clear `loading` *before* calling onDrop, so the spinner
      // was hidden for the whole extraction pass and the UI looked frozen.
      setLoading(true);
      try {
        await onDrop(acceptedFiles);
      } finally {
        setLoading(false);
      }
    },
    [onDrop]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFocused
  } = useDropzone({
    onDrop: handleDrop,
    accept,
    maxFiles,
    maxSize,
    minSize,
    onDropRejected: (fileRejections) => {
      if (onDropRejected) {
        onDropRejected(
          fileRejections.map(({ file, errors }) => ({
            file,
            errors: [...errors]
          }))
        );
      }
      setLoading(false);
    },
    onFileDialogOpen: () => setLoading(true),
    onFileDialogCancel: () => setLoading(false),
    onDragEnter: () => setLoading(true),
    onDragLeave: () => setLoading(false),
    onDropAccepted: () => setLoading(false)
  });

  const styles = useMemo(() => getStyles(theme), [theme]);

  const style = useMemo(() => {
    return {
      ...styles.baseStyle,
      ...(isFocused ? styles.focusStyle : {}),
      ...(isDragActive ? styles.activeStyle : {}),
      ...(isDragAccept ? styles.acceptStyle : {}),
      ...(isDragReject ? styles.rejectStyle : {})
    };
  }, [isDragAccept, isDragActive, isDragReject, isFocused, styles]);

  return (
    <Container maxWidth="sm">
      <div
        {...getRootProps({ style })}
        aria-describedby="file-dropzone-instructions"
      >
        <input {...getInputProps({ 'aria-label': 'Choose files to upload' })} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            height: '100%'
          }}
        >
          <Typography
            id="file-dropzone-instructions"
            variant="h6"
            component="p"
            align="center"
            sx={{
              color: 'text.secondary'
            }}
          >
            Drag &apos;n&apos; drop files here, or click to select files
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <SaveAltIcon
              style={{ fontSize: '2.5em', color: theme.palette.text.secondary }}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default FileDropzone;
