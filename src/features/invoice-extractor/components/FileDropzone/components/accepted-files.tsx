import { FileWithPath } from 'react-dropzone';

type AcceptedFiles = {
  acceptedFiles: FileWithPath[];
};

const AcceptedFiles = ({ acceptedFiles }: AcceptedFiles) => {
  return (
    <>
      <h2>Accepted files</h2>
      <ul>
        {acceptedFiles.map((file: FileWithPath) => (
          <li key={file.path}>
            {file.path} - {file.size} bytes
          </li>
        ))}
      </ul>
    </>
  );
};

export default AcceptedFiles;
