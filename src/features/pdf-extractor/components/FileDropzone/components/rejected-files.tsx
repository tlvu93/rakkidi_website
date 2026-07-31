import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import { FileError } from 'react-dropzone';

type RejectedFilesProps = {
  fileRejections: Array<{ file: File; errors: readonly FileError[] }>;
};

const RejectedFiles: React.FC<RejectedFilesProps> = ({
  fileRejections
}): React.ReactElement => {
  return (
    <Box
      sx={{
        mt: 2
      }}
    >
      <Typography variant="h6" component="h2">
        Rejected files
      </Typography>
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
              {/* `secondary` renders as a <p> by default, so the nested list
                  produced invalid <ul>-inside-<p> markup that browsers
                  silently unwrap. */}
              <ListItemText
                primary={`${file.name} - ${file.size} bytes`}
                slotProps={{ secondary: { component: 'div' } }}
                secondary={
                  <List disablePadding>
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
