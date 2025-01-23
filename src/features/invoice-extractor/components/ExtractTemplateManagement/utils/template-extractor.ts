import { TextContent } from 'pdfjs-dist/types/src/display/api';
import { getTextFromAreaTemplate } from './pdf-extract';
import { InvoiceExtractTemplate } from 'features/invoice-extractor/interfaces';

export const extractFieldsFromTemplate = (
  text: TextContent,
  template: InvoiceExtractTemplate
): Record<string, string> => {
  const extractedData: Record<string, string> = {};

  // Extract data for each field defined in the template
  template.extractionFields.forEach((field) => {
    if (field.tfMatrix && field.name) {
      const extractedValue =
        getTextFromAreaTemplate(
          text,
          field.tfMatrix,
          field.width,
          field.height
        ) || '';
      extractedData[field.name] = extractedValue;
    }
  });

  return extractedData;
};
