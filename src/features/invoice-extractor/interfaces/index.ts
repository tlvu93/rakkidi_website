export interface RectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  id: string;
  name: string;
}

export interface PageDimensions {
  width: number;
  height: number;
  scale: number;
}

export type TransformationMatrix = [
  number,
  number,
  number,
  number,
  number,
  number
];

export enum TransformIndex {
  FontHeight = 0,
  FontWidth = 1,
  Rotation = 2,
  Skew = 3,
  X = 4,
  Y = 5
}

export type ExtractionField = {
  id: string;
  name: string;
  tfMatrix: TransformationMatrix;
};

export type InvoiceExtractTemplate = {
  name: string;
  description: string;
  extractionFields: ExtractionField[];
};

const exampleTemplate: InvoiceExtractTemplate = {
  name: 'Example Template',
  description: 'This is an example template',
  extractionFields: [
    {
      id: '1',
      name: 'Feld1',
      tfMatrix: [7.2, 0, 0, 7.2, 495.57, 654.441]
    },
    {
      id: '2',
      name: 'Feld2',
      tfMatrix: [7.2, 0, 0, 7.2, 502.271, 614.441]
    }
  ]
};
