import {
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
import { FileWithPath } from 'react-dropzone';

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
  const [acceptedFiles, setAcceptedFiles] = useState<FileWithPath[]>([]);
  type FileRejectionError = {
    code: string;
    message: string;
  };

  const [fileRejections, setFileRejections] = useState<
    Array<{ file: FileWithPath; errors: FileRejectionError[] }>
  >([]);

  const headers = useMemo(() => {
    if (!selectedTemplate) return [];
    return selectedTemplate.extractionFields.map((field) => ({
      label: field.name,
      key: field.name
    }));
  }, [selectedTemplate]);

  const handleDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      if (!selectedTemplate) {
        console.error('No template selected');
        return;
      }

      setAcceptedFiles(acceptedFiles);
      try {
        // Process files sequentially to maintain order
        const extractedData = [];
        for (const file of acceptedFiles) {
          const tokenizedText = await getTextTokenFromPdfFile(file);
          console.log('tokenizedText:', tokenizedText);
          const extractedFields = await extractFieldsFromTemplate(
            tokenizedText,
            selectedTemplate
          );
          extractedData.push(extractedFields);
        }
        setCsvData(extractedData);
      } catch (error) {
        console.error('Error processing files:', error);
      }
    },
    [selectedTemplate]
  );

  const handleRejected = useCallback(
    (
      fileRejections: Array<{
        file: FileWithPath;
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
      <aside>
        <AcceptedFiles acceptedFiles={acceptedFiles} />
        <RejectedFiles fileRejections={fileRejections} />
      </aside>
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
