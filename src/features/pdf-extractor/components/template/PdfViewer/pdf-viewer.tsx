import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { TextContent } from 'pdfjs-dist/types/src/display/api';
import React, { useState, useRef, useCallback, useMemo } from 'react';
import type { pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import { useTemplate } from 'features/pdf-extractor';
import FileDropzone from 'features/pdf-extractor/components/FileDropzone/file-dropzone';
import { getTextTokenFromPdfFile } from 'features/pdf-extractor/utils/pdf-extract';

import { ErrorState } from './ErrorState';
import { LoadingOverlay } from './LoadingOverlay';
import ZoomControls from './ZoomControls';

declare global {
  interface Window {
    __pdfTextContent: TextContent | undefined;
  }
}

// react-pdf pulls in the browser build of pdf.js, which touches `DOMMatrix` at
// module scope and therefore cannot be evaluated during Next's server render.
const Document = dynamic(
  () => import('react-pdf').then((mod) => mod.Document),
  { ssr: false }
);
const Page = dynamic(() => import('react-pdf').then((mod) => mod.Page), {
  ssr: false
});

// konva/react-konva resolve to their Node build on the server, which requires
// the optional native `canvas` package. The overlay is interactive-only, so
// keep it off the server entirely.
const PdfCanvasLayer = dynamic(
  () => import('../PdfCanvasLayer/pdf-canvas-layer'),
  { ssr: false }
);

interface PdfViewerProps {
  onTextContentChange?: (textContent: TextContent) => void;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ onTextContentChange }) => {
  const { updateExtractedText, showTextTokens } = useTemplate();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState<TextContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  // Unscaled page size, in PDF units. The current zoom is applied at render
  // time rather than being mirrored into this state.
  const [pageDimensions, setPageDimensions] = useState({
    width: 0,
    height: 0
  });

  const [zoom, setZoom] = useState(1.0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setError(undefined);
        setPdfFile(acceptedFiles[0]);

        try {
          const content = await getTextTokenFromPdfFile(acceptedFiles[0]);
          setTextContent(content);
          onTextContentChange?.(content);
          // Let the context compute extraction from current template state
          await updateExtractedText(content);
          // Store textContent in window object for access by other components
          window.__pdfTextContent = content;
        } catch (error) {
          console.error('Error extracting text from PDF:', error);
        }
      }
    },
    [updateExtractedText, onTextContentChange]
  );

  const onDocumentLoadSuccess = useCallback(() => {
    setIsLoading(false);
    setError(undefined);
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    setIsLoading(false);
    setError('Failed to load PDF. Please try again with a different file.');
    console.error('PDF load error:', error);
  }, []);

  const onPageRenderSuccess = useCallback((page: pdfjs.PDFPageProxy) => {
    const unscaledViewport = page.getViewport({ scale: 1 });
    setPageDimensions({
      width: unscaledViewport.width,
      height: unscaledViewport.height
    });
  }, []);

  const canvasPageDimensions = useMemo(
    () => ({ ...pageDimensions, scale: zoom }),
    [pageDimensions, zoom]
  );

  const handleZoomIn = useCallback(() => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.25, 2.0));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.25, 0.5));
  }, []);

  const handleRetry = useCallback(() => {
    setError(undefined);
    setPdfFile(null);
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
    <Box sx={{ position: 'relative', height: '100%' }}>
      {!pdfFile ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '500px'
          }}
        >
          <FileDropzone
            onDrop={handleDrop}
            accept={{ 'application/pdf': ['.pdf'] }}
          />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>{zoomControls}</Box>
          <Box
            ref={containerRef}
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: '100%',
              height: '500px',
              overflow: 'auto',
              border: '1px solid #ccc'
            }}
          >
            <Box
              sx={{
                width: pageDimensions.width * zoom,
                height: pageDimensions.height * zoom,
                position: 'relative'
              }}
            >
              <Document
                file={pdfFile}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={<LoadingOverlay />}
                error={<ErrorState message={error} onRetry={handleRetry} />}
              >
                <Page
                  pageNumber={1}
                  width={pageDimensions.width * zoom}
                  height={pageDimensions.height * zoom}
                  onRenderSuccess={onPageRenderSuccess}
                  renderTextLayer={false}
                />
              </Document>
              <PdfCanvasLayer
                pageDimensions={canvasPageDimensions}
                zoom={zoom}
                textContent={textContent}
                showTokens={showTextTokens}
              />
            </Box>
          </Box>
        </>
      )}
      {isLoading && <LoadingOverlay />}
    </Box>
  );
};

export default PdfViewer;
