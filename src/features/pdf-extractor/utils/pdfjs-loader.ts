type Pdfjs = Awaited<typeof import('react-pdf')>['pdfjs'];

let pdfjsPromise: Promise<Pdfjs> | null = null;

/**
 * react-pdf re-exports the *browser* build of pdf.js, which references
 * `DOMMatrix` at module scope. Importing it statically makes Next's Node-side
 * page-data collection crash, so it is loaded on demand instead - and only
 * once, with the worker configured at the same time.
 */
export const loadPdfjs = (): Promise<Pdfjs> => {
  if (!pdfjsPromise) {
    pdfjsPromise = import('react-pdf').then(({ pdfjs }) => {
      pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      return pdfjs;
    });
  }

  return pdfjsPromise;
};
