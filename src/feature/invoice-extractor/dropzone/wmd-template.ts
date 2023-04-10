import { TextContent, TextItem } from 'pdfjs-dist/types/src/display/api';
import { CSVData } from './dropzone';

type Transform = [number, number, number, number, number, number];

interface ElementTF {
  tfStart: Transform;
  tfEnd?: Transform;
}

// const rechnungsNummerLabel: ElementTF = {
//   tfStart: [7.5, 0, 0, 7.5, 439.36500000000007, 674.441]
// };

const rechnungsNummerAT: ElementTF = {
  tfStart: [7.2, 0, 0, 7.2, 495.57, 654.441],
  tfEnd: [7.2, 0, 0, 7.2, 536.9963999999997, 654.441]
};

// const rechnungsDatumLabel: ElementTF = {
//   tfStart: [7.5, 0, 0, 7.5, 381, 614.441]
// };

const rechnungsDatumAT: ElementTF = {
  tfStart: [7.2, 0, 0, 7.2, 502.271, 614.441],
  tfEnd: [7.2, 0, 0, 7.2, 536.9965999999997, 614.441]
};

const getTextFromAreaTemplate = (text: TextContent, area: ElementTF) => {
  const textItems = text.items as TextItem[];
  const isInXRange = (item: TextItem) =>
    item.transform[4] >= area.tfStart[4] && item.transform[4] <= area.tfEnd![4];
  const isInYRange = (item: TextItem) =>
    item.transform[5] >= area.tfStart[5] && item.transform[5] <= area.tfEnd![5];

  return textItems
    .filter((item) => isInXRange(item) && isInYRange(item))
    .map((s) => {
      return s.str;
    })
    .join('')
    .replace(/ /g, '');
};

const getIndexFromKeyword = (text: TextContent, keyword: string[]) => {
  const textItems = text.items as TextItem[];

  for (let i = 0; i < textItems.length; i++) {
    if (textItems[i].str === keyword[0]) {
      if (
        textItems[i + 1].str === keyword[1] ||
        textItems[i + 2].str === keyword[1]
      ) {
        return i;
      }
    }
  }
};

export const filterArea = (text: TextContent) => {
  const Rechnungsnummer = getTextFromAreaTemplate(text, rechnungsNummerAT);
  const Rechnungsdatum = getTextFromAreaTemplate(text, rechnungsDatumAT);

  const index = getIndexFromKeyword(text, ['Rechnungsbetrag', 'brutto:']);

  let RechnungsbetragBrutto;
  if (index) {
    const items = text.items as TextItem[];
    RechnungsbetragBrutto = items[index + 4].str;
  } else {
    RechnungsbetragBrutto = '';
  }

  return { Rechnungsnummer, Rechnungsdatum, RechnungsbetragBrutto } as CSVData;
};

const tokenizedTextToCSV = (text: TextContent) => {
  const items = text.items as TextItem[];
  const bestellnr = items
    .slice(18, 37)
    .map((s) => {
      return s.str;
    })
    .join('')
    .replace(/ /g, '');
  const rechnungsDatum = items
    .slice(106, 125)
    .map((s) => {
      return s.str;
    })
    .join('')
    .replace(/ /g, '');
  const rechnungsBetragBrutto = items
    .slice(180, 181)
    .map((s) => {
      return s.str;
    })
    .join('')
    .replace(/ /g, '');

  return {
    Bestellnr: bestellnr,
    buffer1: '',
    buffer2: '',
    Rechnungs_Datum: rechnungsDatum,
    Rechnungsbetrag_Brutto: rechnungsBetragBrutto
  };
};

export default tokenizedTextToCSV;
