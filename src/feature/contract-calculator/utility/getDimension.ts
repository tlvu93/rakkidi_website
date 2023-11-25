import { Order } from '@shared/interfaces/contract-calculator';
import { FileWithPath } from 'react-dropzone';
import { toast } from 'react-toastify';
import { decode, decodeImage } from 'utif';
import { v4 as uuidv4 } from 'uuid';

const MM_PER_PIXEL = 0.0846526655896607;
const MM_PER_POINT = 0.3527777777778; // 1pt = 25,4/72mm

async function getDimensionFromImage(file: FileWithPath) {
  const getDimensionFromTif = async (file: FileWithPath) => {
    return new Promise<Order>((resolve) => {
      var reader = new FileReader();
      reader.onload = (event) => {
        try {
          if (!event.target) return;

          let data: ArrayBuffer = event.target.result as ArrayBuffer;

          let ifd = decode(data)[0];
          decodeImage(data, ifd);

          resolve({
            id: uuidv4(),
            name: file.name,
            width: ifd.width * MM_PER_PIXEL,
            height: ifd.height * MM_PER_PIXEL
          });
        } catch (error) {
          toast.error('Error while reading file');
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const getDimensionFromOtherImages = async (file: FileWithPath) => {
    return new Promise<Order>((resolve) => {
      var img = new Image();
      img.onload = (e) => {
        resolve({
          id: uuidv4(),
          name: file.name,
          width: img.width,
          height: img.height
        });
      };
      img.src = URL.createObjectURL(file);
    });
  };

  if (file.type.includes('tif')) {
    return await getDimensionFromTif(file);
  } else {
    return await getDimensionFromOtherImages(file);
  }
}

const getDimensionFromEPS = (file: FileWithPath, match: RegExpMatchArray) => {
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

  return {
    id: uuidv4(),
    name: file.name,
    width: Math.round(width * 100) / 100,
    height: Math.round(height * 100) / 100
  } as Order;
};

async function getDimensionFromOtherFiles(file: FileWithPath) {
  return new Promise<Order>((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target) return;
      const result: string = e!.target!.result as string;

      var matchEPS = result.match(/@rax %Note: Object((.*\r\n){2})/g);
      if (matchEPS) {
        const fileWithDimension: Order | undefined = getDimensionFromEPS(
          file,
          matchEPS
        );

        if (fileWithDimension) resolve(fileWithDimension);
        else reject();
      } else {
        toast.error(`We don't accept that file type ${file.type} ${file.name}`);
        reject();
      }
    };
    reader.readAsText(file);
  });
}

export async function getDimension(file: FileWithPath) {
  //1.1 Handle Image File [TIF, JPG, PNG...]
  if (file.type.includes('image')) {
    return await getDimensionFromImage(file);
  } else {
    //1.2 Handle Other files
    return await getDimensionFromOtherFiles(file);
  }
}
