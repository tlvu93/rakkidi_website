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
  const loadingTask = pdfjs.getDocument(file as DocumentInitParameters);
  const loadedPDF = await loadingTask.promise;
  const firstPage = await loadedPDF.getPage(1);
  const textContent = await firstPage.getTextContent();
  return textContent;
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
  tf: PdfTransformationMatrix
): string => {
  const textItems = text.items as TextItem[];

  // Extract the necessary values from the TransformationMatrix
  const [fontHeight, , , fontWidth, x, y] = tf;

  // Calculate the boundaries based on the transformation matrix
  const xStart = x;
  const xEnd = x + fontHeight; // Assuming fontHeight corresponds to the width
  const yStart = y;
  const yEnd = y + fontWidth; // Assuming fontWidth corresponds to the height

  const isInRange = (
    item: TextItem,
    start: number,
    end: number,
    index: TransformIndex
  ) => item.transform[index] >= start && item.transform[index] <= end;

  return textItems
    .filter(
      (item) =>
        isInRange(item, xStart, xEnd, TransformIndex.X) &&
        isInRange(item, yStart, yEnd, TransformIndex.Y)
    )
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
  for (let i = 0; i < textItems.length; i++) {
    if (
      textItems[i].str === keyword[0] &&
      (textItems[i + 1]?.str === keyword[1] ||
        textItems[i + 2]?.str === keyword[1])
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
