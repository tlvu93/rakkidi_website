import { DocumentInitParameters } from 'pdfjs-dist/types/src/display/api';

import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const getTextContentFromPDF = async (
  file: string | URL | ArrayBuffer | DocumentInitParameters | null
) => {
  const loadingTask = pdfjs.getDocument(file as DocumentInitParameters);
  const loadedPDF = await loadingTask.promise;
  const firstPage = await loadedPDF.getPage(1);
  const textContent = await firstPage.getTextContent();
  return textContent;
};

export default getTextContentFromPDF;
