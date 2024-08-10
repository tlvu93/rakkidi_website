import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Stage, Layer, Rect } from 'react-konva';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import PdfCanvasLayer from '../PdfCanvasLayer/pdf-canvas-layer';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Define the props type
interface PDFTextExtractorProps {
  filePath: string;
}

const PDFTextExtractor: React.FC<PDFTextExtractorProps> = ({ filePath }) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const [pageDimensions, setPageDimensions] = useState({
    width: 0,
    height: 0,
    scale: 1
  });

  useEffect(() => {
    const loadFile = async () => {
      const response = await fetch(filePath);
      const blob = await response.blob();
      const file = new File([blob], filePath.split('/').pop() || 'file.pdf', {
        type: blob.type
      });
      setPdfFile(file);
    };

    loadFile();
  }, [filePath]);

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

  if (!pdfFile) {
    return <div>Loading...</div>;
  }

  return (
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
  );
};

export default PDFTextExtractor;
