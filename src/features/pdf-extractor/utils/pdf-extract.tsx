import { TextContent, TextItem } from 'pdfjs-dist/types/src/display/api';
import { pdfjs } from 'react-pdf';
import { DocumentInitParameters } from 'react-pdf/node_modules/pdfjs-dist/types/src/display/api';

import {
  PdfTransformationMatrix,
  TransformIndex,
  ExtractionField,
  ExtractionFieldType
} from 'features/pdf-extractor/interfaces';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

/** Returned when a keyword field cannot be resolved against a document. */
export const NO_MATCH = 'No match found';

/** Max Y delta (PDF units) for two tokens to count as being on one baseline. */
const SAME_LINE_TOLERANCE = 10;
/** Max Y delta below a keyword that is still considered "the next line". */
const BELOW_LINE_TOLERANCE = 20;
/** Max X delta for a token to count as being in the keyword's column. */
const COLUMN_ALIGN_TOLERANCE = 50;
/** Below this delta two tokens are treated as co-located on that axis. */
const CO_LOCATED_TOLERANCE = 5;

interface ExtendedTextContent extends TextContent {
  viewport?: {
    width: number;
    height: number;
    rotation: number;
  };
}

export const getTextContentFromPDF = async (
  file: string | URL | ArrayBuffer | DocumentInitParameters | null
): Promise<ExtendedTextContent> => {
  try {
    const loadingTask = pdfjs.getDocument(file as DocumentInitParameters);
    const loadedPDF = await loadingTask.promise;
    const firstPage = await loadedPDF.getPage(1);

    // Get page dimensions
    const viewport = firstPage.getViewport({ scale: 1.0 });
    const textContent = await firstPage.getTextContent();

    // Add viewport information to textContent
    const extendedTextContent: ExtendedTextContent = {
      ...textContent,
      viewport: {
        width: viewport.width,
        height: viewport.height,
        rotation: viewport.rotation
      }
    };

    return extendedTextContent;
  } catch (error) {
    console.error('Error extracting text content from PDF:', error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const getTextTokenFromPdfFile = async (
  file: File
): Promise<TextContent> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = async (): Promise<void> => {
      try {
        const arrayBuffer = fileReader.result as ArrayBuffer;
        resolve(await getTextContentFromPDF(arrayBuffer));
      } catch (e) {
        reject(e);
      }
    };

    fileReader.onerror = reject;
    fileReader.readAsArrayBuffer(file);
  });
};

export const getTextFromTemplate = async (
  text: TextContent,
  field: ExtractionField
): Promise<string> => {
  if (field.type === ExtractionFieldType.Rectangle && field.tfMatrix) {
    return getTextFromAreaTemplate(
      text,
      field.tfMatrix,
      field.width,
      field.height
    );
  } else if (field.type === ExtractionFieldType.Keyword && field.keyword) {
    return getTextFromKeyword(text, field);
  }
  return '';
};

export const getTextFromAreaTemplate = async (
  text: TextContent,
  tf: PdfTransformationMatrix,
  width?: number,
  height?: number
): Promise<string> => {
  if (tf.length < 6) {
    throw new Error(
      'Invalid PdfTransformationMatrix: expected at least 6 elements'
    );
  }

  const textItems = text.items as TextItem[];

  // Extract position from the transformation matrix
  const [, , , , x, y] = tf;

  // Use provided width/height or fallback to defaults
  const rectWidth = width || 0;
  const rectHeight = height || 0;

  // Calculate boundaries in PDF coordinate system
  const xStart = x;
  const xEnd = x + rectWidth;

  // Use PDF coordinates directly since they're already converted by CoordinateTransformer
  const yStart = y; // Lower bound
  const yEnd = y + rectHeight; // Upper bound

  // Filter text items that overlap with the selection area
  const selectedItems = textItems.filter((item) => {
    const itemX = item.transform[TransformIndex.X];
    const itemY = item.transform[TransformIndex.Y];

    // Check X overlap - text position should be within rectangle bounds
    const xOverlap = itemX >= xStart && itemX <= xEnd;

    // Check Y overlap - text position should be between yStart and yEnd
    const yOverlap = itemY >= yStart && itemY <= yEnd;

    return xOverlap && yOverlap;
  });

  // Sort items by position
  selectedItems.sort((a, b) => {
    const yDiff = a.transform[TransformIndex.Y] - b.transform[TransformIndex.Y];
    return Math.abs(yDiff) < 5
      ? a.transform[TransformIndex.X] - b.transform[TransformIndex.X]
      : yDiff;
  });

  return selectedItems
    .map((s) => s.str)
    .join('')
    .replace(/\s/g, '');
};

export const getTextFromKeyword = async (
  text: TextContent,
  field: ExtractionField
): Promise<string> => {
  if (!field.keyword) return '';

  const textItems = text.items as TextItem[];

  // Find the keyword in the text content
  const keywordIndex = textItems.findIndex((item) =>
    item.str.includes(field.keyword as string)
  );

  if (keywordIndex === -1) {
    return NO_MATCH;
  }

  const keywordItem = textItems[keywordIndex];

  const maxDistance = field.maxDistance || 200;
  const keywordX = keywordItem.transform[TransformIndex.X];
  const keywordY = keywordItem.transform[TransformIndex.Y];

  // Filter items based on search direction and distance
  const relevantItems = textItems.filter((item, index) => {
    if (index <= keywordIndex) return false;

    const itemX = item.transform[TransformIndex.X];
    const itemY = item.transform[TransformIndex.Y];

    if (field.searchDirection === 'right') {
      // Item must sit on the same baseline, to the right, within maxDistance
      const sameLineY = Math.abs(itemY - keywordY) < SAME_LINE_TOLERANCE;
      const isToRight = itemX > keywordX;
      const withinDistance = itemX - keywordX <= maxDistance;
      return sameLineY && isToRight && withinDistance;
    }

    // 'below' direction. In PDF coordinates the origin is bottom-left, so an
    // item that is visually below the keyword has a *smaller* Y value.
    const isBelow = itemY < keywordY;
    const withinYDistance = keywordY - itemY <= BELOW_LINE_TOLERANCE;
    const alignedX = Math.abs(itemX - keywordX) < COLUMN_ALIGN_TOLERANCE;
    return isBelow && withinYDistance && alignedX;
  });

  // Sort items into reading order for the chosen search direction. Items that
  // are nearly co-located on the primary axis are ordered by the other axis so
  // that e.g. the digits of a single number stay together.
  const sortedItems = [...relevantItems].sort((a, b) => {
    if (field.searchDirection === 'right') {
      const xDiff =
        a.transform[TransformIndex.X] - b.transform[TransformIndex.X];
      if (Math.abs(xDiff) < CO_LOCATED_TOLERANCE) {
        return b.transform[TransformIndex.Y] - a.transform[TransformIndex.Y];
      }
      return xDiff;
    }

    const yDiff = b.transform[TransformIndex.Y] - a.transform[TransformIndex.Y];
    if (Math.abs(yDiff) < CO_LOCATED_TOLERANCE) {
      return a.transform[TransformIndex.X] - b.transform[TransformIndex.X];
    }
    return yDiff;
  });

  if (sortedItems.length === 0) {
    return NO_MATCH;
  }

  return sortedItems.map((item) => item.str).join('');
};
