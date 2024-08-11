import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FileWithPath } from 'react-dropzone';
import { ButtonGroup, Button, Box } from '@mui/material';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import PdfCanvasLayer from '../PdfCanvasLayer/pdf-canvas-layer';
import FileDropzone from 'features/invoice-extractor/components/FileDropzone/file-dropzone';
import { ZoomIn, ZoomOut } from '@mui/icons-material';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewer: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pageDimensions, setPageDimensions] = useState({
    width: 0,
    height: 0,
    scale: 1
  });
  const [zoom, setZoom] = useState(1.0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles.length > 0) {
      setPdfFile(acceptedFiles[0]);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log(`Document loaded with ${numPages} pages`);
  };

  const onPageRenderSuccess = async (page: pdfjs.PDFPageProxy) => {
    const viewport = page.getViewport({ scale: zoom });
    const containerWidth = containerRef.current?.clientWidth || viewport.width;

    const scale = containerWidth / viewport.width;

    setPageDimensions({
      width: viewport.width * scale,
      height: viewport.height * scale,
      scale
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (pdfFile && pageDimensions.width > 0) {
        const containerWidth =
          containerRef.current?.clientWidth || pageDimensions.width;
        const scale = containerWidth / pageDimensions.width;

        setPageDimensions((prevDimensions) => ({
          ...prevDimensions,
          width: prevDimensions.width * scale,
          height: prevDimensions.height * scale,
          scale
        }));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pdfFile, pageDimensions.width]);

  useEffect(() => {
    const updateDimensions = () => {
      if (pdfFile && pageDimensions.width > 0) {
        const containerWidth =
          containerRef.current?.clientWidth || pageDimensions.width;
        const scale = containerWidth / (pageDimensions.width / zoom);

        if (scale !== pageDimensions.scale || zoom !== pageDimensions.scale) {
          setPageDimensions((prevDimensions) => ({
            ...prevDimensions,
            width: prevDimensions.width * scale,
            height: prevDimensions.height * scale,
            scale: zoom
          }));
        }
      }
    };

    updateDimensions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom]);

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.25, 2.0));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.25, 0.5));
  };

  return (
    <div>
      {!pdfFile ? (
        <FileDropzone
          onDrop={handleDrop}
          accept={{ 'application/pdf': ['.pdf'] }}
        />
      ) : (
        <>
          <Box display="flex" justifyContent="center" mb={2}>
            <ButtonGroup size="small" aria-label="zoom controls">
              <Button onClick={handleZoomOut}>
                <ZoomOut />
              </Button>
              <Button onClick={handleZoomIn}>
                <ZoomIn />
              </Button>
            </ButtonGroup>
          </Box>
          <div
            ref={containerRef}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '100%',
              height: '500px',
              overflow: 'auto',
              border: '1px solid #ccc'
            }}
          >
            <div
              style={{
                width: pageDimensions.width * zoom,
                height: pageDimensions.height * zoom,
                position: 'relative'
              }}
            >
              <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                <Page
                  pageNumber={1}
                  width={pageDimensions.width * zoom}
                  height={pageDimensions.height * zoom}
                  onRenderSuccess={onPageRenderSuccess}
                  renderTextLayer={false}
                />
              </Document>
              <PdfCanvasLayer pageDimensions={pageDimensions} zoom={zoom} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PdfViewer;
