import { TextContent, TextItem } from 'pdfjs-dist/types/src/display/api';

import { getIndexFromKeyword, getTextFromAreaTemplate } from './pdf-extract';
import { WmdCsvData } from 'features/invoice-extractor/interfaces/wmd-csv-data';
import { PdfTransformationMatrix } from 'features/invoice-extractor/interfaces';

const WMD_TEMPLATE_CONFIG = {
  rechnungsNummerAT: [
    7.2, 0, 0, 7.2, 495.57, 654.441
  ] as PdfTransformationMatrix,
  rechnungsDatumAT: [
    7.2, 0, 0, 7.2, 502.271, 614.441
  ] as PdfTransformationMatrix,
  rechnungsBetragBruttoKeywords: ['Rechnungsbetrag', 'brutto:'],
  rechnungsBetragBruttoWordLength: 4,
  bestellNummerKeywords: ['Bestellnummer:', 'Order number:'],
  bestellNummerWordLength: 1
};

const extractFieldByKeyword = (
  text: TextContent,
  keywords: string[],
  wordLength: number,
  fieldName: string
): string => {
  const index = getIndexFromKeyword(text, keywords);
  if (index !== undefined) {
    const items = text.items as TextItem[];
    const item = items[index + wordLength];
    if (item) {
      return item.str;
    } else {
      console.warn(`${fieldName} not found at expected index`);
    }
  } else {
    console.warn(`Keywords for ${fieldName} not found`);
  }
  return '';
};

export const wmdExtractFields = (text: TextContent): WmdCsvData => {
  const RechnungsNummer =
    getTextFromAreaTemplate(text, WMD_TEMPLATE_CONFIG.rechnungsNummerAT) || '';
  const RechnungsDatum =
    getTextFromAreaTemplate(text, WMD_TEMPLATE_CONFIG.rechnungsDatumAT) || '';

  const index = getIndexFromKeyword(
    text,
    WMD_TEMPLATE_CONFIG.rechnungsBetragBruttoKeywords
  );

  let RechnungsBetragBrutto = '';

  if (index !== undefined) {
    const items = text.items as TextItem[];
    const bruttoItem =
      items[index + WMD_TEMPLATE_CONFIG.rechnungsBetragBruttoWordLength];
    RechnungsBetragBrutto = bruttoItem?.str || '';
    if (!RechnungsBetragBrutto) {
      console.warn('RechnungsBetragBrutto not found at expected index');
    }
  } else {
    console.warn('Keywords for RechnungsBetragBrutto not found');
  }

  const bestellNummerIndex = getIndexFromKeyword(
    text,
    WMD_TEMPLATE_CONFIG.bestellNummerKeywords
  );
  let BestellNummer = '';
  if (bestellNummerIndex !== undefined) {
    const items = text.items as TextItem[];
    BestellNummer =
      items[bestellNummerIndex + WMD_TEMPLATE_CONFIG.bestellNummerWordLength]
        ?.str || '';
    if (!BestellNummer) {
      console.warn('BestellNummer not found at expected index');
    }
  } else {
    console.warn('BestellNummer keywords not found');
  }

  return {
    BestellNummer,
    RechnungsNummer,
    RechnungsDatum,
    RechnungsBetragBrutto
  };
};
