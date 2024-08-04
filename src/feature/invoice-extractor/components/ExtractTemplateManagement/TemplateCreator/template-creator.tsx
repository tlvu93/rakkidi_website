import { Box, Container, Paper } from '@mui/material';
import React from 'react';
import { DataGrid, GridRowsProp } from '@mui/x-data-grid';
import PropertiesTable from './properties-table';

type Props = {};

const TemplateCreator = (props: Props) => {
  return (
    <Paper>
      <Container maxWidth="xl">
        <Box display={'flex'}>
          <Box>PDF</Box>
          <Box>
            <PropertiesTable />
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};

export default TemplateCreator;
