import { FileWithPath } from 'react-dropzone';

type AcceptedFiles = {
  acceptedFiles: FileWithPath[];
};

const AcceptedFiles = ({ acceptedFiles }: AcceptedFiles) => {
  return (
    <>
      <h4>Accepted files</h4>
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
