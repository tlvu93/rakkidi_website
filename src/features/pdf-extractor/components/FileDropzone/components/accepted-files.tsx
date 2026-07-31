import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';

type AcceptedFilesProps = {
  acceptedFiles: File[];
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
          <ListItem key={file.name} divider>
            <ListItemText
              primary={file.name}
              secondary={`${file.size} bytes`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AcceptedFiles;
