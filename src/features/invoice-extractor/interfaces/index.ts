export type PdfTransformationMatrix = [
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

// Interface for rectangle properties
export interface RectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  id: string;
  name: string;
}

// Interface for page dimensions
export interface PageDimensions {
  width: number;
  height: number;
  scale: number;
}

// Interface for extraction fields within a template
export interface ExtractionField {
  id: string;
  page: number | null;
  name: string;
  tfMatrix: PdfTransformationMatrix;
}

// Interface for the overall invoice extraction template
export interface InvoiceExtractTemplate {
  name: string;
  description: string;
  extractionFields: ExtractionField[];
}
