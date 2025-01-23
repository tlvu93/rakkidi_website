import { DocumentInitParameters } from 'react-pdf/node_modules/pdfjs-dist/types/src/display/api';

import { TextContent, TextItem } from 'pdfjs-dist/types/src/display/api';

import { pdfjs } from 'react-pdf';
import {
  PdfTransformationMatrix,
  TransformIndex
} from 'features/invoice-extractor/interfaces';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const getTextContentFromPDF = async (
  file: string | URL | ArrayBuffer | DocumentInitParameters | null
) => {
  try {
    const loadingTask = pdfjs.getDocument(file as DocumentInitParameters);
    const loadedPDF = await loadingTask.promise;
    const firstPage = await loadedPDF.getPage(1);
    const textContent = await firstPage.getTextContent();
    return textContent;
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
export const getTextFromAreaTemplate = (
  text: TextContent,
  tf: PdfTransformationMatrix,
  width?: number,
  height?: number
): string => {
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

  // Calculate the boundaries based on position and dimensions
  const xStart = x;
  const xEnd = x + rectWidth;
  const yStart = y;
  const yEnd = y + rectHeight;

  const TOLERANCE = 1; // 1 point tolerance for slight positioning variations

  const isInRange = (
    item: TextItem,
    start: number,
    end: number,
    index: TransformIndex
  ): boolean => {
    const pos = item.transform[index];
    const width = index === TransformIndex.X ? item.width || 0 : 0;

    // Check if any part of the text item overlaps with the selection area
    return (
      (pos >= start - TOLERANCE && pos <= end + TOLERANCE) || // Text starts within range
      (pos + width >= start - TOLERANCE && pos + width <= end + TOLERANCE) || // Text ends within range
      (pos <= start && pos + width >= end) // Text spans the entire range
    );
  };

  // Filter text items that overlap with the selection area
  const selectedItems = textItems.filter(
    (item) =>
      isInRange(item, xStart, xEnd, TransformIndex.X) &&
      isInRange(item, yStart, yEnd, TransformIndex.Y)
  );

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
