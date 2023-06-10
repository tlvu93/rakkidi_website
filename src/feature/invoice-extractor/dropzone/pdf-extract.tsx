import { DocumentInitParameters } from 'pdfjs-dist/types/src/display/api';
import { pdfjs } from 'react-pdf';

const getTextContentFromPDF = async (
  file:
    | string
    | URL
    | ArrayBuffer
    | pdfjs.PDFDataRangeTransport
    | DocumentInitParameters
    | null
) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  const loadingTask = pdfjs.getDocument(file as DocumentInitParameters);

  const loadedPDF = await loadingTask.promise;
  const firstPage = await loadedPDF.getPage(1);
  const textContent = await firstPage.getTextContent();

  return textContent;
};

export default getTextContentFromPDF;
