import { useCallback, useMemo, useState } from 'react';
import { useDropzone, FileWithPath, FileError, Accept } from 'react-dropzone';
import { Container } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import getTextContentFromPDF from './pdf-extract';
import TextContent from 'react-pdf';
import { CSVLink } from 'react-csv';
import AcceptedFiles from './accepted-files';
import RejectedFiles from './rejected-files';
import tokenizedTextToCSV, { filterArea } from './wmd-template';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const headers = [
  { label: 'Bestellnr', key: 'Bestellnr' },
  { label: 'Rechnungs_Datum', key: 'Rechnungs_Datum' },
  { label: 'buffer1', key: 'buffer1' },
  { label: 'buffer2', key: 'buffer1' },
  { label: 'buffer3', key: 'buffer1' },
  { label: 'Rechnungsbetrag_Brutto', key: 'Rechnungsbetrag_Brutto' }
];

interface CSVData {
  Bestellnr: any;
  buffer1: string;
  buffer2: string;
  Rechnungs_Datum: any;
  Rechnungsbetrag_Brutto: any;
}

const getTextTokenFromPdfFile = async (file: FileWithPath) =>
  new Promise<TextContent>((resolve, reject) => {
    try {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const arrayBuffer = fileReader.result;

        resolve(await getTextContentFromPDF(arrayBuffer));
      };
      fileReader.readAsArrayBuffer(file);
    } catch (e) {
      reject(e);
    }
  });

const FileDropzone = () => {
  const [csvData, setCsvData] = useState<CSVData[]>([]);

  const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
    const csvPromises = acceptedFiles.map(async (file: FileWithPath) => {
      const tokenizedText = await getTextTokenFromPdfFile(file);

      return filterArea(tokenizedText);
    });
    const csvData = await Promise.all(csvPromises);
    console.log(csvData);
    // setCsvData((oldArray) => [...oldArray, ...csvData]);
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
        {/* @ts-ignore */}
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
