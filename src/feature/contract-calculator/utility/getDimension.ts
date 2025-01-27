import { Order } from '@shared/interfaces/contract-calculator';
import { FileWithPath } from 'react-dropzone';
import { toast } from 'react-toastify';
import { decode, decodeImage } from 'utif';
import { v4 as uuidv4 } from 'uuid';
import { pdfjs } from 'react-pdf';

console.log('PDF.js version:', pdfjs.version);
// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
console.log('Worker source set to:', pdfjs.GlobalWorkerOptions.workerSrc);

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

async function getDimensionFromPDF(file: FileWithPath) {
  console.log('Starting PDF processing for file:', file.name);
  return new Promise<Order>(async (resolve, reject) => {
    try {
      console.log('Creating FileReader...');
      const fileReader = new FileReader();

      fileReader.onload = async () => {
        try {
          console.log('FileReader loaded, getting ArrayBuffer...');
          const arrayBuffer = fileReader.result as ArrayBuffer;
          console.log('ArrayBuffer size:', arrayBuffer.byteLength);

          console.log('Creating PDF loading task...');
          const loadingTask = pdfjs.getDocument({ data: arrayBuffer });

          console.log('Waiting for PDF to load...');
          const loadedPDF = await loadingTask.promise;
          console.log('PDF loaded, number of pages:', loadedPDF.numPages);

          console.log('Getting first page...');
          const firstPage = await loadedPDF.getPage(1);
          console.log('First page loaded');

          console.log('Getting viewport...');
          const viewport = firstPage.getViewport({ scale: 1.0 });
          console.log('Original viewport dimensions:', {
            width: viewport.width,
            height: viewport.height
          });

          // Convert points to millimeters
          const width = viewport.width * MM_PER_POINT;
          const height = viewport.height * MM_PER_POINT;
          console.log('Converted dimensions (mm):', { width, height });

          const result = {
            id: uuidv4(),
            name: file.name,
            width: Math.round(width * 100) / 100,
            height: Math.round(height * 100) / 100
          };
          console.log('Final result:', result);
          resolve(result);
        } catch (error) {
          console.error('PDF processing error:', error);
          if (error instanceof Error) {
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
          }
          toast.error('Error while reading PDF file');
          reject(error);
        }
      };

      fileReader.onerror = () => {
        console.error('FileReader error:', fileReader.error);
        toast.error('Error while reading PDF file');
        reject(fileReader.error);
      };

      console.log('Starting to read file as ArrayBuffer...');
      fileReader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Outer try-catch error:', error);
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      toast.error('Error while reading PDF file');
      reject(error);
    }
  });
}

export async function getDimension(file: FileWithPath) {
  try {
    console.log('getDimension called with file:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    //1.1 Handle Image File [TIF, JPG, PNG...]
    if (file.type.includes('image')) {
      console.log('Processing as image file');
      return await getDimensionFromImage(file);
    } else if (
      file.type === 'application/pdf' ||
      file.name.toLowerCase().endsWith('.pdf')
    ) {
      console.log('Processing as PDF file');
      return await getDimensionFromPDF(file);
    } else {
      console.log('Processing as other file type');
      //1.2 Handle Other files
      return await getDimensionFromOtherFiles(file);
    }
  } catch (error) {
    console.error('getDimension error:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}
