import { TextContent } from 'pdfjs-dist/types/src/display/api';
import { getTextFromTemplate } from './pdf-extract';
import { InvoiceExtractTemplate } from 'features/invoice-extractor/interfaces';

export const extractFieldsFromTemplate = async (
  text: TextContent,
  template: InvoiceExtractTemplate
): Promise<Record<string, string>> => {
  const extractedData: Record<string, string> = {};

  // Extract data for each field defined in the template
  await Promise.all(
    template.extractionFields.map(async (field) => {
      if (field.name) {
        try {
          const extractedValue = await getTextFromTemplate(text, field);
          extractedData[field.name] = extractedValue || '';
        } catch (error) {
          console.error(`Error extracting field ${field.name}:`, error);
          extractedData[field.name] = '';
        }
      }
    })
  );

  return extractedData;
};
