import { FileRejection } from 'react-dropzone';

type RejectedFilesProps = {
  fileRejections: FileRejection[];
};

const RejectedFiles = ({ fileRejections }: RejectedFilesProps) => {
  return (
    <>
      <h4>Rejected files</h4>
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
