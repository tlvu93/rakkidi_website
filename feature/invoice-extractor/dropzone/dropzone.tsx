import { useCallback, useMemo, useState } from 'react';
import { useDropzone, FileWithPath, FileError, Accept } from 'react-dropzone';
import { Container } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import PDFExtract from './pdf-extract';
import tokenizedTextToCSV from './wmd-template';
import { CSVLink } from 'react-csv';

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

const FileDropzone = () => {
  const [csvData, setCsvData] = useState([]);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    acceptedFiles.forEach((file: FileWithPath) => {
      console.log(file.path);
      console.log(file);

      PDFExtract({ url: file.path }).then((tokenizedText: Text) => {
        console.log(tokenizedText);
        // @ts-ignore
        setCsvData((oldarray) => [
          ...oldarray,
          tokenizedTextToCSV(tokenizedText)
        ]);
      });
    });
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

  const acceptedFileItems = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(
    ({ file, errors }: { file: FileWithPath; errors: FileError[] }) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    )
  );

  return (
    <Container maxWidth="sm">
      <div className="container">
        {/* @ts-ignore */}
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag `&apos;`n`&apos;` drop pdf file in here</p>
          <SaveAltIcon style={{ fontSize: '2.5em' }} />
        </div>
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
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
