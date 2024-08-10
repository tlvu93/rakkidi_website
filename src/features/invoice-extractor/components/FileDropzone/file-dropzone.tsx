import { useCallback, useMemo, useState } from 'react';
import { useDropzone, FileWithPath, FileError, Accept } from 'react-dropzone';
import { Container } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import { CSVLink } from 'react-csv';
import AcceptedFiles from './components/accepted-files';
import RejectedFiles from './components/rejected-files';

import {
  baseStyle,
  activeStyle,
  acceptStyle,
  rejectStyle
} from './utils/styles';
import { WmdCsvData } from 'features/invoice-extractor/interfaces/wmd-csv-data';
import { getTextTokenFromPdfFile } from '../ExtractTemplateManagement/utils/pdf-extract';
import { wmdExtractFields } from '../ExtractTemplateManagement/utils/wmd-template';

const headers = [
  { label: 'Rechnungsnummer', key: 'Rechnungsnummer' },
  { label: 'Rechnungsdatum', key: 'Rechnungsdatum' },
  { label: 'RechnungsbetragBrutto', key: 'RechnungsbetragBrutto' }
];

const FileDropzone = () => {
  const [csvData, setCsvData] = useState<WmdCsvData[]>([]);

  const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
    try {
      const csvPromises = acceptedFiles.map(async (file: FileWithPath) => {
        const tokenizedText = await getTextTokenFromPdfFile(file);
        return wmdExtractFields(tokenizedText);
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
        <CSVLink
          data={csvData}
          headers={headers}
          style={{
            textDecoration: 'underline',
            color: 'cornflowerblue',
            cursor: 'pointer'
          }}
        >
          Download CSV
        </CSVLink>
      )}
    </Container>
  );
};

export default FileDropzone;
