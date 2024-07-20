import { DocumentInitParameters } from 'pdfjs-dist/types/src/display/api';

import { pdfjs } from 'react-pdf';

if (typeof Promise.withResolvers === 'undefined') {
  if (window)
    // @ts-expect-error This does not exist outside of polyfill which this is doing
    window.Promise.withResolvers = function () {
      let resolve, reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
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
