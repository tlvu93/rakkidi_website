import { Box, Container, Paper } from '@mui/material';
import React from 'react';
import { DataGrid, GridRowsProp } from '@mui/x-data-grid';
import PropertiesTable from './components/PropertyTable/properties-table';
import PdfViewer from './components/PdfViewer/pdf-viewer';

type Props = {};

const TemplateCreator = (props: Props) => {
  return (
    <Paper>
      <Container maxWidth="xl">
        <Box display={'flex'}>
          <Box>
            <PdfViewer filePath={''} />
          </Box>
          <Box>
            <PropertiesTable />
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};

export default TemplateCreator;
