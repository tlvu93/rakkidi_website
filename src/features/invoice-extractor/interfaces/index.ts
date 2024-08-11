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

export interface ElementTransformation {
  tfStart: TransformationMatrix;
  tfEnd?: TransformationMatrix;
}

export type TemplateComponent = {
  name: string;
  elementTF: ElementTransformation;
};

export type InvoiceExtractTemplate = {
  name: string;
  description: string;
  templateComponents: TemplateComponent[];
};

const exampleTemplate: InvoiceExtractTemplate = {
  name: 'Example Template',
  description: 'This is an example template',
  templateComponents: [
    {
      name: 'Feld1',
      elementTF: {
        tfStart: [7.2, 0, 0, 7.2, 495.57, 654.441],
        tfEnd: [7.2, 0, 0, 7.2, 536.9963999999997, 654.441]
      }
    },
    {
      name: 'Feld2',
      elementTF: {
        tfStart: [7.2, 0, 0, 7.2, 502.271, 614.441],
        tfEnd: [7.2, 0, 0, 7.2, 536.99659999, 614.441]
      }
    }
  ]
};
