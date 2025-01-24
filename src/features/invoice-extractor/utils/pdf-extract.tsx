import { DocumentInitParameters } from 'react-pdf/node_modules/pdfjs-dist/types/src/display/api';

import { TextContent, TextItem } from 'pdfjs-dist/types/src/display/api';

import { pdfjs } from 'react-pdf';
import {
  PdfTransformationMatrix,
  TransformIndex
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

/**
 * Extracts text from a PDF document within a specified rectangular area.
 *
 * @param text - The TextContent object representing the text in the PDF document.
 * @param tf - An ElementTransformation object defining the rectangular area to extract text from.
 * @returns The extracted text as a string, with all whitespace removed.
 */
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

  // Sort items by their position to maintain reading order
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

/**
 * Finds the index of the first text item in the given `TextContent` that matches the provided `keyword` array.
 *
 * The function searches through the `TextItem` objects in the `TextContent` and returns the index of the first text item that matches the first element of the `keyword` array, and the next text item matches the second element of the `keyword` array.
 *
 * @param text - The `TextContent` object containing the text items to search.
 * @param keyword - An array of two strings representing the keyword to search for.
 * @returns The index of the first text item that matches the keyword, or `undefined` if the keyword is not found.
 */
export const getIndexFromKeyword = (
  text: TextContent,
  keyword: string[]
): number | undefined => {
  const textItems = text.items as TextItem[];
  for (let i = 0; i < textItems.length - 1; i++) {
    if (
      textItems[i].str === keyword[0] &&
      textItems[i + 1].str === keyword[1]
    ) {
      return i;
    }
  }
  return undefined;
};

/**
 * Extracts the text content from a list of `TextItem` objects, removing any whitespace.
 *
 * @param items - An array of `TextItem` objects containing the text content.
 * @param start - The starting index of the text items to extract.
 * @param end - The ending index of the text items to extract.
 * @returns The extracted text content with all whitespace removed.
 *
 * Note: Is used when exact index of the text is known. Useful to be paired with getIndexFromKeyword()
 */
export const extractText = (items: TextItem[], start: number, end: number) =>
  items
    .slice(start, end)
    .map((s) => s.str)
    .join('')
    .replace(/\s/g, '');
