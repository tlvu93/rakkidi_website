import { Container, Typography } from '@mui/material';
import { useCallback } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

import { decode, decodeImage } from 'utif';

import SaveAltIcon from '@mui/icons-material/SaveAlt';

const MM_PER_PIXEL = 0.0846526655896607;
const MM_PER_POINT = 0.3527777777778; // 1pt = 25,4/72mm

/**
 * This Component renders a Field, in which files can be dropped
 */

export interface FileWithDimension {
  name: string;
  file: File;
  height: number;
  width: number;
}

const Dropzone = () => {
  const images: FileWithDimension[] = [];

  const getDimension = async (
    Images: FileWithDimension[],
    file: FileWithPath
  ) => {
    //1.1
    if (file.type.includes('image')) {
      return new Promise((resolve) => {
        if (file.type.includes('tif')) {
          var reader = new FileReader();
          reader.onload = (event) => {
            try {
              if (!event.target) return;

              let ifd = decode(event.target.result)[0];
              decodeImage(event.target.result, ifd);

              resolve({
                name: file.name,
                file: file,
                width: ifd.width * MM_PER_PIXEL,
                height: ifd.height * MM_PER_PIXEL
              });
            } catch (error) {
              console.log(error);
            }
          };
          reader.readAsArrayBuffer(file);
        } else {
          //1.1.3

          var img = new Image();
          img.onload = (e) => {
            resolve({
              name: file.name,
              file: file,
              width: img.width,
              height: img.height
            });
          };
          img.src = URL.createObjectURL(file);
        }
      });
    } else {
      //1.2
      return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = (e) => {
          if (!e.target) return;
          const result: string = e!.target!.result as string;
          var match = result.match(/@rax %Note: Object((.*\r\n){2})/g);
          if (match) {
            let numbers = match[0].match(/[-?\d.]+/g);
            if (!numbers) return;

            let minX = parseFloat(numbers[0]);
            let minY = parseFloat(numbers[1]);
            let maxX = parseFloat(numbers[2]);
            let maxY = parseFloat(numbers[3]);
            let tmp;

            match.forEach((m) => {
              let numbers = m.match(/[-?\d.]+/g);
              if (!numbers) return;

              tmp = parseFloat(numbers[0]);
              if (tmp < minX) minX = tmp;

              tmp = parseFloat(numbers[1]);
              if (tmp < minY) minY = tmp;

              tmp = parseFloat(numbers[2]);
              if (tmp > maxX) maxX = tmp;

              tmp = parseFloat(numbers[3]);
              if (tmp > maxY) maxY = tmp;
            });

            let width = Math.abs(minX - maxX) * MM_PER_POINT;
            let height = Math.abs(minY - maxY) * MM_PER_POINT;

            resolve({
              name: file.name,
              file: file,
              width: Math.round(width * 100) / 100,
              height: Math.round(height * 100) / 100
            });
          } else {
            console.log('Sorry, nicht bekannter Filetyp: ', file.name);
            reject();
          }
        };
        reader.readAsText(file);
      });
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      let promises = acceptedFiles.map(async (file) => {
        return getDimension(images, file);
      });
      let resolvedPromises = Promise.all(
        promises.map((p) => p.catch((e) => 'FAILED'))
      ).then((values) => values.filter((v) => v !== 'FAILED'));

      resolvedPromises.then((returnedValues) =>
        returnedValues.forEach((value) =>
          console.log('add to redux later', value)
        )
      );
    },
    [images]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Container maxWidth="sm">
      <div
        {...getRootProps()}
        style={{
          display: 'grid',
          alignItems: 'center',
          backgroundColor: '#cfe8fc',
          height: '300px'
        }}
      >
        <input
          {...getInputProps({
            //Its important to filter, because somehow .cdrt files makes the HTML5 Filepicker to crash
            //Add more filters if any forgotten
            accept: 'image/*, .eps'
          })}
        />
        {isDragActive ? (
          <div>
            <Typography variant="h1">Datei hier reinziehen ...</Typography>
          </div>
        ) : (
          <div>
            <Typography variant="h5">
              Datei hier reinziehen,
              <br /> oder für die Dateiauswahl klicken
              <SaveAltIcon style={{ fontSize: '2.5em' }} />
            </Typography>
          </div>
        )}
      </div>
      <div></div>
    </Container>
  );
};

export default Dropzone;
