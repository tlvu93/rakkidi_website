export type PdfTransformationMatrix = [
  number,
  number,
  number,
  number,
  number,
  number
];

export enum TransformIndex {
  ScaleX = 0,
  SkewY = 1,
  SkewX = 2,
  ScaleY = 3,
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

// Enum for extraction field types
export enum ExtractionFieldType {
  Rectangle = 'rectangle',
  Keyword = 'keyword'
}

// Interface for extraction fields within a template
export interface ExtractionField {
  id: string;
  page: number | null;
  name: string;
  type: ExtractionFieldType;
  // For rectangle type
  tfMatrix?: PdfTransformationMatrix;
  width?: number;
  height?: number;
  // For keyword type
  keyword?: string;
  searchDirection?: 'right' | 'below';
  maxDistance?: number; // Maximum distance to search from keyword in pixels
}

// Interface for the overall PDF extraction template
export interface PDFExtractTemplate {
  name: string;
  description: string;
  extractionFields: ExtractionField[];
}
