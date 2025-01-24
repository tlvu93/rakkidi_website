import { DocumentInitParameters } from 'react-pdf/node_modules/pdfjs-dist/types/src/display/api';

import { TextContent, TextItem } from 'pdfjs-dist/types/src/display/api';

import { pdfjs } from 'react-pdf';
import {
  PdfTransformationMatrix,
  TransformIndex,
  ExtractionField,
  ExtractionFieldType
} from 'features/invoice-extractor/interfaces';
import { visualizeCoordinates, logCoordinateAnalysis } from './debug-helpers';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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

    fileReader.onload = async () => {
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

  // Extract position and scale from the transformation matrix
  const [scaleX, , , scaleY, x, y] = tf;

  // Use provided width/height or fallback to defaults
  const rectWidth = width || 0;
  const rectHeight = height || 0;

  // Use debug helpers to analyze coordinate systems
  const debug = visualizeCoordinates(text, {
    transform: tf,
    width: rectWidth,
    height: rectHeight
  });

  logCoordinateAnalysis(debug);

  const viewport = (text as ExtendedTextContent).viewport || {
    width: 0,
    height: 0,
    rotation: 0
  };

  // Calculate boundaries in PDF coordinate system
  const xStart = x;
  const xEnd = x + rectWidth;

  // Convert Y coordinates from top-down (canvas) to bottom-up (PDF)
  // In PDF coordinates, y=0 is at the bottom
  const yStart = viewport.height - (y + rectHeight); // Lower bound
  const yEnd = viewport.height - y; // Upper bound

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
  const viewport = (text as ExtendedTextContent).viewport || {
    width: 0,
    height: 0,
    rotation: 0
  };

  // Find the keyword in the text content
  let keywordIndex = -1;
  let keywordItem: TextItem | null = null;

  console.log('textItems', textItems);
  for (let i = 0; i < textItems.length; i++) {
    if (textItems[i].str.includes(field.keyword)) {
      keywordIndex = i;
      keywordItem = textItems[i];
      console.log(
        `Found keyword "${field.keyword}" at index ${i}:`,
        textItems[i].str
      );
      break;
    }
  }

  if (keywordIndex === -1 || !keywordItem) {
    console.log(`Keyword "${field.keyword}" not found in document`);
    return 'No match found';
  }

  const maxDistance = field.maxDistance || 200;
  const keywordX = keywordItem.transform[TransformIndex.X];
  const keywordY = keywordItem.transform[TransformIndex.Y];

  // Filter items based on search direction and distance
  const relevantItems = textItems.filter((item, index) => {
    if (index <= keywordIndex) return false;

    const itemX = item.transform[TransformIndex.X];
    const itemY = item.transform[TransformIndex.Y];

    if (field.searchDirection === 'right') {
      // Check if item is on the same line (tighter tolerance)
      const sameLineY = Math.abs(itemY - keywordY) < 10;
      // Check if item is to the right and within maxDistance
      const isToRight = itemX > keywordX;
      const withinDistance = itemX - keywordX <= maxDistance;
      // Log coordinate comparison
      console.log('Right direction check:', {
        item: item.str,
        yDiff: Math.abs(itemY - keywordY),
        xDiff: itemX - keywordX,
        sameLineY,
        isToRight,
        withinDistance,
        maxDistance
      });
      return sameLineY && isToRight && withinDistance;
    } else {
      // 'below' direction
      // In PDF coordinates, higher Y values are lower on the page
      // Check if item is below the keyword (Y value is less than keyword's Y)
      const isBelow = itemY < keywordY;
      // Check if item is within maxDistance below (tighter tolerance)
      const withinYDistance = keywordY - itemY <= 20;
      // Check if item is roughly aligned with keyword (tighter tolerance)
      const alignedX = Math.abs(itemX - keywordX) < 50;
      // Log coordinate comparison
      console.log('Below direction check:', {
        item: item.str,
        yDiff: keywordY - itemY,
        isBelow,
        withinYDistance,
        alignedX
      });
      return isBelow && withinYDistance && alignedX;
    }
  });

  // Sort items by position and filter out items that might be part of other fields
  const sortedItems = relevantItems.sort((a, b) => {
    if (field.searchDirection === 'right') {
      // For right direction, sort by X coordinate
      const xDiff =
        a.transform[TransformIndex.X] - b.transform[TransformIndex.X];
      // If items are very close horizontally, they might be part of the same number
      if (Math.abs(xDiff) < 5) {
        // Secondary sort by Y coordinate for items that are close horizontally
        return b.transform[TransformIndex.Y] - a.transform[TransformIndex.Y];
      }
      return xDiff;
    } else {
      // For below direction, sort by Y coordinate
      const yDiff =
        b.transform[TransformIndex.Y] - a.transform[TransformIndex.Y];
      // If items are very close vertically, they might be part of the same line
      if (Math.abs(yDiff) < 5) {
        // Secondary sort by X coordinate for items that are close vertically
        return a.transform[TransformIndex.X] - b.transform[TransformIndex.X];
      }
      return yDiff;
    }
  });
  // .filter((item, index, array) => {
  //   // Filter out items that are likely part of other fields
  //   if (index === 0) return true;
  //   const prevItem = array[index - 1];
  //   const xDiff =
  //     item.transform[TransformIndex.X] - prevItem.transform[TransformIndex.X];
  //   const yDiff =
  //     item.transform[TransformIndex.Y] - prevItem.transform[TransformIndex.Y];

  //   // If items are very close, they're probably part of the same number/text
  //   const closeX = Math.abs(xDiff) < 5;
  //   const closeY = Math.abs(yDiff) < 5;
  //   const isNumber = !isNaN(Number(item.str.trim()));
  //   const prevIsNumber = !isNaN(Number(prevItem.str.trim()));

  //   // Keep items that are either:
  //   // 1. Close to previous item and both are numbers (part of same number)
  //   // 2. Not too close to previous item (different field)
  //   return (
  //     (closeX && closeY && isNumber && prevIsNumber) || (!closeX && !closeY)
  //   );
  // });

  // Filter out empty strings and return all relevant items concatenated
  if (sortedItems.length > 0) {
    const extractedText = sortedItems
      .map((item) => {
        console.log(`Including matched item: "${item.str}"`);
        return item.str;
      })
      .join('');
    console.log(
      `Found values "${extractedText}" for keyword "${field.keyword}"`
    );
    return extractedText;
  } else {
    console.log(
      `No matching text found ${field.searchDirection} of keyword "${field.keyword}"`
    );
    return 'No match found';
  }
};

export const extractText = (items: TextItem[], start: number, end: number) =>
  items
    .slice(start, end)
    .map((s) => s.str)
    .join('')
    .replace(/\s/g, '');
