import { TextContent, TextItem } from 'pdfjs-dist/types/src/display/api';

import { getIndexFromKeyword, getTextFromAreaTemplate } from './pdf-extract';
import { WmdCsvData } from 'features/invoice-extractor/interfaces/wmd-csv-data';
import { PdfTransformationMatrix } from 'features/invoice-extractor/interfaces';

const rechnungsNummerAT: PdfTransformationMatrix = [
  7.2, 0, 0, 7.2, 495.57, 654.441
];

const rechnungsDatumAT: PdfTransformationMatrix = [
  7.2, 0, 0, 7.2, 502.271, 614.441
];

export const wmdExtractFields = (text: TextContent): WmdCsvData => {
  const RechnungsNummer = getTextFromAreaTemplate(text, rechnungsNummerAT);
  const RechnungsDatum = getTextFromAreaTemplate(text, rechnungsDatumAT);

  const index = getIndexFromKeyword(text, ['Rechnungsbetrag', 'brutto:']);

  let RechnungsBetragBrutto = '';
  const RechnungsBetragBruttoWordLength = 4;

  if (index !== undefined) {
    const items = text.items as TextItem[];
    RechnungsBetragBrutto =
      items[index + RechnungsBetragBruttoWordLength]?.str || '';
  }

  const BestellNummer = ''; // You may want to extract this value similarly to other fields

  return {
    BestellNummer,
    RechnungsNummer,
    RechnungsDatum,
    RechnungsBetragBrutto
  };
};
