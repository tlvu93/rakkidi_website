import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FileWithPath } from 'react-dropzone';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import PdfCanvasLayer from '../PdfCanvasLayer/pdf-canvas-layer';
import FileDropzone from 'features/invoice-extractor/components/FileDropzone/file-dropzone';
import useWindowResize from './useWindowResize';
import ZoomControls from './ZoomControls';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewer: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pageDimensions, setPageDimensions] = useState({
    width: 0,
    height: 0,
    scale: 1
  });

  const [originalViewport, setOriginalViewport] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  console.log('pageDimension', pageDimensions);
  console.log('originalViewport', originalViewport);
  const [zoom, setZoom] = useState(1.0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles.length > 0) {
      setPdfFile(acceptedFiles[0]);
    }
  }, []);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      console.log(`Document loaded with ${numPages} pages`);
    },
    []
  );

  const onPageRenderSuccess = useCallback(
    async (page: pdfjs.PDFPageProxy) => {
      // Get the original (unscaled) viewport
      const unscaledViewport = page.getViewport({ scale: 1 });
      setOriginalViewport({
        width: unscaledViewport.width,
        height: unscaledViewport.height
      });

      // Use original viewport dimensions (A4 size) for scaling
      setPageDimensions({
        width: unscaledViewport.width,
        height: unscaledViewport.height,
        scale: zoom
      });
    },
    [zoom, containerRef]
  );

  // Remove handleResize since we're using fixed A4 dimensions
  useWindowResize(() => {});

  useEffect(() => {
    if (pdfFile && originalViewport.width > 0) {
      setPageDimensions((prevDimensions) => ({
        ...prevDimensions,
        scale: zoom
      }));
    }
  }, [zoom, pdfFile, originalViewport.width]);

  const handleZoomIn = useCallback(() => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.25, 2.0));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.25, 0.5));
  }, []);

  const zoomControls = useMemo(
    () => (
      <ZoomControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        currentZoom={zoom}
      />
    ),
    [handleZoomIn, handleZoomOut, zoom]
  );

  return (
    <div>
      {!pdfFile ? (
        <FileDropzone
          onDrop={handleDrop}
          accept={{ 'application/pdf': ['.pdf'] }}
        />
      ) : (
        <>
          {zoomControls}
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
