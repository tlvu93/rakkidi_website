import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import { FileWithPath } from 'react-dropzone';

type AcceptedFilesProps = {
  acceptedFiles: FileWithPath[];
};

const AcceptedFiles: React.FC<AcceptedFilesProps> = ({
  acceptedFiles
}): React.ReactElement => {
  return (
    <Box
      sx={{
        mt: 2
      }}
    >
      <Typography variant="h6">Accepted files</Typography>
      <List>
        {acceptedFiles.map((file) => (
          <ListItem key={file.path} divider>
            <ListItemText
              primary={file.path}
              secondary={`${file.size} bytes`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AcceptedFiles;
