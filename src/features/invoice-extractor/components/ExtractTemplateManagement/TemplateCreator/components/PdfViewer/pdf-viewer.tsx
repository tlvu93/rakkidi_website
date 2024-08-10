import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FileWithPath } from 'react-dropzone';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import PdfCanvasLayer from '../PdfCanvasLayer/pdf-canvas-layer';
import FileDropzone from 'features/invoice-extractor/components/FileDropzone/file-dropzone';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewer: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pageDimensions, setPageDimensions] = useState({
    width: 0,
    height: 0,
    scale: 1
  });

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles.length > 0) {
      setPdfFile(acceptedFiles[0]);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log(`Document loaded with ${numPages} pages`);
  };

  const onPageRenderSuccess = async (page: pdfjs.PDFPageProxy) => {
    const scale = 1.0;
    const viewport = page.getViewport({ scale });
    setPageDimensions({
      width: viewport.width,
      height: viewport.height,
      scale
    });
  };

  return (
    <div>
      {!pdfFile ? (
        <FileDropzone
          onDrop={handleDrop}
          accept={{ 'application/pdf': ['.pdf'] }}
        />
      ) : (
        <div
          style={{
            position: 'relative',
            width: pageDimensions.width,
            height: pageDimensions.height
          }}
        >
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              pageNumber={1}
              width={pageDimensions.width}
              height={pageDimensions.height}
              onRenderSuccess={onPageRenderSuccess}
              renderTextLayer={false}
            />
          </Document>
          <PdfCanvasLayer pageDimensions={pageDimensions} />
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
