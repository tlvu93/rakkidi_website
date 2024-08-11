import React, { useState, useCallback } from 'react';
import { FileWithPath } from 'react-dropzone';
import { Container } from '@mui/material';
import { CSVLink } from 'react-csv';

import AcceptedFiles from './components/accepted-files';
import RejectedFiles from './components/rejected-files';

import { WmdCsvData } from 'features/invoice-extractor/interfaces/wmd-csv-data';
import { getTextTokenFromPdfFile } from '../ExtractTemplateManagement/utils/pdf-extract';
import { wmdExtractFields } from '../ExtractTemplateManagement/utils/wmd-template';
import FileDropzone from './file-dropzone';

const headers = [
  { label: 'Rechnungsnummer', key: 'Rechnungsnummer' },
  { label: 'Rechnungsdatum', key: 'Rechnungsdatum' },
  { label: 'RechnungsbetragBrutto', key: 'RechnungsbetragBrutto' }
];

const CSVFiledropzone = () => {
  const [csvData, setCsvData] = useState<WmdCsvData[]>([]);
  const [acceptedFiles, setAcceptedFiles] = useState<FileWithPath[]>([]);
  const [fileRejections, setFileRejections] = useState<
    Array<{ file: FileWithPath; errors: any[] }>
  >([]);

  const handleDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
    setAcceptedFiles(acceptedFiles);
    try {
      const csvPromises = acceptedFiles.map(async (file) => {
        const tokenizedText = await getTextTokenFromPdfFile(file);
        return wmdExtractFields(tokenizedText);
      });

      const extractedCsvData = await Promise.all(csvPromises);
      setCsvData(extractedCsvData);
    } catch (error) {
      console.error('Error processing files:', error);
    }
  }, []);

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
      {csvData.length > 0 && (
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
