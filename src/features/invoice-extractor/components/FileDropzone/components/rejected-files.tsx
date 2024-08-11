import { FileRejection } from 'react-dropzone';
import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';

type RejectedFilesProps = {
  fileRejections: FileRejection[];
};

const RejectedFiles = ({ fileRejections }: RejectedFilesProps) => {
  return (
    <Box mt={2}>
      <Typography variant="h6">Rejected files</Typography>
      {fileRejections.length === 0 ? (
        <List>
          <ListItem>
            <ListItemText primary="None" />
          </ListItem>
        </List>
      ) : (
        <List>
          {fileRejections.map(({ file, errors }) => (
            <ListItem key={file.name} divider>
              <ListItemText
                primary={`${file.name} - ${file.size} bytes`}
                secondary={
                  <List>
                    {errors.map((e) => (
                      <ListItem key={e.code} disableGutters>
                        <ListItemText primary={e.message} />
                      </ListItem>
                    ))}
                  </List>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default RejectedFiles;
