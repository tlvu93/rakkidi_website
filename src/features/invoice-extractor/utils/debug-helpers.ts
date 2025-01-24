import { TextContent, TextItem } from 'pdfjs-dist/types/src/display/api';

import { PdfTransformationMatrix } from 'features/invoice-extractor/interfaces';

export interface DebugVisualization {
  pdfCoordinates: {
    width: number;
    height: number;
    rotation: number;
  };
  textTokens: Array<{
    text: string;
    pdfCoords: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    transform: number[];
    scale: number;
  }>;
  rectangle: {
    pdfCoords: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    transform: PdfTransformationMatrix;
  };
}

export const visualizeCoordinates = (
  textContent: TextContent,
  rectangle: {
    transform: PdfTransformationMatrix;
    width: number;
    height: number;
  }
): DebugVisualization => {
  const textItems = textContent.items as TextItem[];

  // Extract PDF dimensions from the first text item's transform
  const firstItem = textItems[0];
  const scale = firstItem?.transform[0] || 1;
  const pdfHeight = Math.max(
    ...textItems.map((item) => item.transform[5] + (item.height || 0))
  );
  const pdfWidth = Math.max(
    ...textItems.map((item) => item.transform[4] + (item.width || 0))
  );

  // Extract rectangle info
  const [scaleX, , , scaleY, x, y] = rectangle.transform;

  return {
    pdfCoordinates: {
      width: pdfWidth,
      height: pdfHeight,
      rotation: 0 // Assuming no rotation for now
    },
    textTokens: textItems.map((item) => ({
      text: item.str,
      pdfCoords: {
        x: item.transform[4],
        y: item.transform[5],
        width: item.width || 0,
        height: item.height || 0
      },
      transform: item.transform,
      scale: item.transform[0]
    })),
    rectangle: {
      pdfCoords: {
        x: x * scaleX,
        y: y * scaleY,
        width: rectangle.width * scaleX,
        height: rectangle.height * scaleY
      },
      transform: rectangle.transform
    }
  };
};

export const logCoordinateAnalysis = (debug: DebugVisualization) => {
  console.log('=== PDF Coordinate System Analysis ===');
  console.log('PDF Dimensions:', debug.pdfCoordinates);
  console.log('\nRectangle Position (PDF Space):', debug.rectangle.pdfCoords);
  console.log('\nText Tokens:');
  debug.textTokens.forEach((token) => {
    const isInRectX =
      token.pdfCoords.x >= debug.rectangle.pdfCoords.x &&
      token.pdfCoords.x <=
        debug.rectangle.pdfCoords.x + debug.rectangle.pdfCoords.width;

    const isInRectY =
      token.pdfCoords.y >= debug.rectangle.pdfCoords.y &&
      token.pdfCoords.y <=
        debug.rectangle.pdfCoords.y + debug.rectangle.pdfCoords.height;

    console.log(`
    Text: "${token.text}"
    Position: (${token.pdfCoords.x}, ${token.pdfCoords.y})
    Size: ${token.pdfCoords.width}x${token.pdfCoords.height}
    Scale: ${token.scale}
    In Rectangle: ${isInRectX && isInRectY ? 'YES' : 'NO'}
    `);
  });
};
