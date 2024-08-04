import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Stage, Layer, Rect, Circle } from 'react-konva';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Define the types for the text items
interface TextItem {
  str: string;
  dir: string;
  width: number;
  height: number;
  transform: number[];
  fontName: string;
  hasEOL: boolean;
}

// Define the props type
interface PDFTextExtractorProps {
  filePath: string;
}

// Define the state for the rectangle dimensions
interface RectDimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}

const PDFTextExtractor: React.FC<PDFTextExtractorProps> = ({ filePath }) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [textItems, setTextItems] = useState<TextItem[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [rectDimensions, setRectDimensions] = useState<RectDimensions>({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  const [pageDimensions, setPageDimensions] = useState({
    width: 0,
    height: 0,
    scale: 1
  });
  const stageRef = useRef<any>(null);

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
    const scale = 1.0; // Adjust the scale factor as needed
    const viewport = page.getViewport({ scale });
    setPageDimensions({
      width: viewport.width,
      height: viewport.height,
      scale
    });

    const textContent = await page.getTextContent();
    setTextItems(textContent.items as TextItem[]);
  };

  const handleMouseDown = (e: any) => {
    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    setRectDimensions({ x, y, width: 0, height: 0 });
    setIsDrawing(true);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing) return;
    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    setRectDimensions((prev) => ({
      ...prev,
      width: x - prev.x,
      height: y - prev.y
    }));
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    const { scale } = pageDimensions;
    const scaledRect = {
      x: rectDimensions.x / scale,
      y: rectDimensions.y / scale,
      width: rectDimensions.width / scale,
      height: rectDimensions.height / scale
    };

    const selectedTextItems = textItems.filter((item) =>
      isTextWithinRectangle(item, scaledRect)
    );
    console.log('Selected Text Items:', selectedTextItems);
  };

  const isTextWithinRectangle = (item: TextItem, rect: RectDimensions) => {
    const [, , , , offsetX, offsetY] = item.transform;
    const textX = offsetX;
    const textY = pageDimensions.height - item.height - offsetY;

    return (
      textX >= rect.x &&
      textX + item.width <= rect.x + rect.width &&
      textY >= rect.y &&
      textY + item.height <= rect.y + rect.height
    );
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
      <Stage
        width={pageDimensions.width}
        height={pageDimensions.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={stageRef}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <Layer>
          {isDrawing && (
            <Rect
              x={rectDimensions.x}
              y={rectDimensions.y}
              width={rectDimensions.width}
              height={rectDimensions.height}
              stroke="red"
              strokeWidth={0.5}
              dash={[2, 2]}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default PDFTextExtractor;
