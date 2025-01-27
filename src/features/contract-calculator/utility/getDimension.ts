import * as pdfjsLib from 'pdfjs-dist';
import { FileWithPath } from 'react-dropzone';
import { toast } from 'react-toastify';
import { decode, decodeImage } from 'utif';
import { v4 as uuidv4 } from 'uuid';

import { Order, OrderType } from '@shared/interfaces/contract-calculator';

const MM_PER_PIXEL = 0.0846526655896607;
const MM_PER_POINT = 0.3527777777778; // 1pt = 25,4/72mm

async function getDimensionFromImage(file: FileWithPath): Promise<Order> {
  const getDimensionFromTif = async (file: FileWithPath): Promise<Order> => {
    return new Promise<Order>((resolve) => {
      const reader = new FileReader();
      reader.onload = (event): void => {
        try {
          if (!event.target) return;

          const data: ArrayBuffer = event.target.result as ArrayBuffer;

          const ifd = decode(data)[0];
          decodeImage(data, ifd);

          resolve({
            id: uuidv4(),
            name: file.name,
            width: ifd.width * MM_PER_PIXEL,
            height: ifd.height * MM_PER_PIXEL,
            type: OrderType.Folienplott,
            amount: 1
          });
        } catch (error) {
          toast.error('Error while reading file' + error);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const getDimensionFromOtherImages = async (
    file: FileWithPath
  ): Promise<Order> => {
    return new Promise<Order>((resolve) => {
      const img = new Image();
      img.onload = (): void => {
        resolve({
          id: uuidv4(),
          name: file.name,
          width: img.width,
          height: img.height,
          type: OrderType.Folienplott,
          amount: 1
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

const getDimensionFromEPS = (
  file: FileWithPath,
  match: RegExpMatchArray
): Order | undefined => {
  const numbers = match[0].match(/[-?\d.]+/g);
  if (!numbers) return;

  let minX = parseFloat(numbers[0]);
  let minY = parseFloat(numbers[1]);
  let maxX = parseFloat(numbers[2]);
  let maxY = parseFloat(numbers[3]);
  let tmp;

  match.forEach((m): void => {
    const numbers = m.match(/[-?\d.]+/g);
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

  const width = Math.abs(minX - maxX) * MM_PER_POINT;
  const height = Math.abs(minY - maxY) * MM_PER_POINT;

  return {
    id: uuidv4(),
    name: file.name,
    width: Math.round(width * 100) / 100,
    height: Math.round(height * 100) / 100,
    type: 'Folienplott',
    amount: 1
  } as Order;
};

async function getDimensionFromOtherFiles(file: FileWithPath): Promise<Order> {
  return new Promise<Order>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e): void => {
      if (!e.target) return;
      const result: string = e!.target!.result as string;

      const matchEPS = result.match(/@rax %Note: Object((.*\r\n){2})/g);
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

async function getDimensionFromPDF(file: FileWithPath): Promise<Order> {
  return new Promise<Order>(async (resolve, reject) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.0 });

      // Convert points to millimeters (1 point = 0.3527777777778 mm)
      const width = viewport.width * MM_PER_POINT;
      const height = viewport.height * MM_PER_POINT;

      resolve({
        id: uuidv4(),
        name: file.name,
        width: Math.round(width * 100) / 100,
        height: Math.round(height * 100) / 100,
        type: OrderType.Folienplott,
        amount: 1
      });
    } catch (error) {
      toast.error('Error while reading PDF file');
      reject(error);
    }
  });
}

export async function getDimension(file: FileWithPath): Promise<Order> {
  //1.1 Handle Image File [TIF, JPG, PNG...]
  if (file.type.includes('image')) {
    return await getDimensionFromImage(file);
  } else if (file.type === 'application/pdf') {
    return await getDimensionFromPDF(file);
  } else {
    //1.2 Handle Other files
    return await getDimensionFromOtherFiles(file);
  }
}
