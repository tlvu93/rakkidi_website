import {
  Alert,
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import React, { useState, useCallback, useMemo } from 'react';
import { CSVLink } from 'react-csv';

import {
  type TemplateCsvData,
  getTextTokenFromPdfFile,
  extractFieldsFromTemplate,
  useTemplateManagement
} from '../..';

import AcceptedFiles from './components/accepted-files';
import RejectedFiles from './components/rejected-files';
import FileDropzone from './file-dropzone';

const CSVFiledropzone: React.FC = () => {
  const { selectedTemplate } = useTemplateManagement();
  const [csvData, setCsvData] = useState<TemplateCsvData[]>([]);
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  type FileRejectionError = {
    code: string;
    message: string;
  };

  const [fileRejections, setFileRejections] = useState<
    Array<{ file: File; errors: FileRejectionError[] }>
  >([]);

  const headers = useMemo(() => {
    if (!selectedTemplate) return [];
    return selectedTemplate.extractionFields.map((field) => ({
      label: field.name,
      key: field.name
    }));
  }, [selectedTemplate]);

  // Both of these paths used to only console.error, so a user whose files
  // failed to parse saw nothing at all happen.
  const [extractionError, setExtractionError] = useState<string | null>(null);

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!selectedTemplate) {
        setExtractionError('Select a template before uploading PDFs.');
        return;
      }

      setExtractionError(null);
      setAcceptedFiles(acceptedFiles);
      try {
        // Process files sequentially to maintain order
        const extractedData = [];
        for (const file of acceptedFiles) {
          const tokenizedText = await getTextTokenFromPdfFile(file);
          const extractedFields = await extractFieldsFromTemplate(
            tokenizedText,
            selectedTemplate
          );
          extractedData.push(extractedFields);
        }
        setCsvData(extractedData);
      } catch (error) {
        console.error('Error processing files:', error);
        setExtractionError(
          'Could not extract data from one or more of those PDFs. Check that they match the selected template and try again.'
        );
      }
    },
    [selectedTemplate]
  );

  const handleRejected = useCallback(
    (
      fileRejections: Array<{
        file: File;
        errors: FileRejectionError[];
      }>
    ) => {
      setFileRejections(fileRejections);
    },
    []
  );

  return (
    <Container maxWidth="sm">
      <FileDropzone
        onDrop={handleDrop}
        onDropRejected={handleRejected}
        accept={{ 'application/pdf': ['.pdf'] }}
      />
      {extractionError && (
        <Alert severity="error" role="alert" sx={{ mt: 2 }}>
          {extractionError}
        </Alert>
      )}
      {(acceptedFiles.length > 0 || fileRejections.length > 0) && (
        <Box component="aside" aria-live="polite">
          {acceptedFiles.length > 0 && (
            <AcceptedFiles acceptedFiles={acceptedFiles} />
          )}
          {fileRejections.length > 0 && (
            <RejectedFiles fileRejections={fileRejections} />
          )}
        </Box>
      )}
      {!selectedTemplate && (
        <Typography color="error" sx={{ mt: 2 }}>
          Please select a template first
        </Typography>
      )}
      {selectedTemplate && csvData.length > 0 && (
        <>
          <TableContainer component={Paper} sx={{ mt: 2, mb: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableCell key={header.key}>{header.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {csvData.map((row, index) => (
                  <TableRow key={index}>
                    {headers.map((header) => (
                      <TableCell key={header.key}>{row[header.key]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <CSVLink
            data={csvData}
            headers={headers}
            filename="extracted_data.csv"
            style={{
              textDecoration: 'underline',
              color: 'cornflowerblue',
              cursor: 'pointer',
              marginTop: '20px',
              display: 'inline-block'
            }}
          >
            Download CSV
          </CSVLink>
        </>
      )}
    </Container>
  );
};

export default CSVFiledropzone;
