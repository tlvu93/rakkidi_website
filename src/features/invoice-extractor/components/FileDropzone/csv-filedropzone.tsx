import React, { useState, useCallback, useMemo } from 'react';
import { FileWithPath } from 'react-dropzone';
import { Container, Typography } from '@mui/material';
import { CSVLink } from 'react-csv';

import AcceptedFiles from './components/accepted-files';
import RejectedFiles from './components/rejected-files';

import { TemplateCsvData } from 'features/invoice-extractor/interfaces/template-csv-data';
import { getTextTokenFromPdfFile } from '../ExtractTemplateManagement/utils/pdf-extract';
import { extractFieldsFromTemplate } from '../ExtractTemplateManagement/utils/template-extractor';
import { useTemplateManagement } from '../ExtractTemplateManagement/context/template-management-context';
import FileDropzone from './file-dropzone';

const CSVFiledropzone = () => {
  const { selectedTemplate } = useTemplateManagement();
  const [csvData, setCsvData] = useState<TemplateCsvData[]>([]);
  const [acceptedFiles, setAcceptedFiles] = useState<FileWithPath[]>([]);
  const [fileRejections, setFileRejections] = useState<
    Array<{ file: FileWithPath; errors: any[] }>
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
        const csvPromises = acceptedFiles.map(async (file) => {
          const tokenizedText = await getTextTokenFromPdfFile(file);
          return extractFieldsFromTemplate(tokenizedText, selectedTemplate);
        });

        const extractedCsvData = await Promise.all(csvPromises);
        setCsvData(extractedCsvData);
      } catch (error) {
        console.error('Error processing files:', error);
      }
    },
    [selectedTemplate]
  );

  const handleRejected = useCallback(
    (fileRejections: Array<{ file: FileWithPath; errors: any[] }>) => {
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
      )}
    </Container>
  );
};

export default CSVFiledropzone;
