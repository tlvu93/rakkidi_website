import React from 'react';
import { Container, Paper, Grid, Box } from '@mui/material';
import PropertiesTable from './components/PropertyTable/properties-table';
import PdfViewer from './components/PdfViewer/pdf-viewer';
import { TemplateProvider } from './context/TemplateContext';

const TemplateCreator: React.FC = () => {
  return (
    <TemplateProvider>
      <Paper sx={{ padding: 4, borderRadius: 2 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                height={'100%'}
                alignContent={'center'}
                borderRadius={1}
                border={'1px solid rgba(224, 224, 224, 1)'}
                className="MuiDataGrid-withBorderColor"
              >
                <PdfViewer />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <PropertiesTable />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </TemplateProvider>
  );
};

export default TemplateCreator;
