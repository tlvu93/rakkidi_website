import { FileRejection } from 'react-dropzone';

type RejectedFilesProps = {
  fileRejections: FileRejection[];
};

const RejectedFiles = ({ fileRejections }: RejectedFilesProps) => {
  if (!fileRejections || fileRejections.length === 0) {
    return (
      <>
        <h2>Rejected files</h2>
        <ul>
          <li>none</li>
        </ul>
      </>
    );
  }

  return (
    <>
      <h2>Rejected files</h2>
      <ul>
        {fileRejections.map(({ file, errors }) => (
          <li key={file.name}>
            {file.name} - {file.size} bytes
            <ul>
              {errors.map((e) => (
                <li key={e.code}>{e.message}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RejectedFiles;
