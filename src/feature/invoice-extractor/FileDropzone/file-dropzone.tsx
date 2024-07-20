import { useCallback, useMemo, useState } from 'react';
import { useDropzone, FileWithPath, FileError, Accept } from 'react-dropzone';
import { Container } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import getTextContentFromPDF from './pdf-extract';
import { TextContent } from 'pdfjs-dist/types/src/display/api';
import { CSVLink } from 'react-csv';
import AcceptedFiles from './components/accepted-files';
import RejectedFiles from './components/rejected-files';
import { filterArea } from './wmd-template';
import { CSVData } from '../interfaces/csv-data';
import {
  baseStyle,
  activeStyle,
  acceptStyle,
  rejectStyle
} from './utils/styles';

const headers = [
  { label: 'Rechnungsnummer', key: 'Rechnungsnummer' },
  { label: 'Rechnungsdatum', key: 'Rechnungsdatum' },
  { label: 'RechnungsbetragBrutto', key: 'RechnungsbetragBrutto' }
];

const getTextTokenFromPdfFile = async (
  file: FileWithPath
): Promise<TextContent> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = async () => {
      try {
        const arrayBuffer = fileReader.result as ArrayBuffer;
        resolve(await getTextContentFromPDF(arrayBuffer));
      } catch (e) {
        reject(e);
      }
    };

    fileReader.onerror = reject;
    fileReader.readAsArrayBuffer(file);
  });
};

const FileDropzone = () => {
  const [csvData, setCsvData] = useState<CSVData[]>([]);

  const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
    try {
      const csvPromises = acceptedFiles.map(async (file: FileWithPath) => {
        const tokenizedText = await getTextTokenFromPdfFile(file);
        return filterArea(tokenizedText);
      });

      const csvData = await Promise.all(csvPromises);
      setCsvData(csvData);
    } catch (error) {
      console.error('Error processing files:', error);
    }
  }, []);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,

    accept: { 'application/pdf': ['.pdf'] }
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <Container maxWidth="sm">
      <div className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag &apos;n&apos; drop pdf file in here</p>
          <SaveAltIcon style={{ fontSize: '2.5em' }} />
        </div>
      </div>
      <aside>
        <AcceptedFiles acceptedFiles={acceptedFiles} />
        <RejectedFiles fileRejections={fileRejections} />
      </aside>
      {csvData.length !== 0 && (
        <CSVLink data={csvData} headers={headers}>
          Download CSV
        </CSVLink>
      )}
    </Container>
  );
};

export default FileDropzone;
