import { PdfTransformationMatrix } from '../interfaces';

export interface Coordinates {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TransformOptions {
  zoom: number;
}

export class CoordinateTransformer {
  /**
   * Converts screen coordinates to PDF coordinates
   */
  static screenToPdf(
    coords: Coordinates,
    options: TransformOptions
  ): Coordinates {
    const { zoom } = options;
    return {
      x: coords.x / zoom,
      y: coords.y / zoom,
      width: coords.width / zoom,
      height: coords.height / zoom
    };
  }

  /**
   * Converts PDF coordinates to screen coordinates
   */
  static pdfToScreen(
    coords: Coordinates,
    options: TransformOptions
  ): Coordinates {
    const { zoom } = options;
    return {
      x: coords.x * zoom,
      y: coords.y * zoom,
      width: coords.width * zoom,
      height: coords.height * zoom
    };
  }

  /**
   * Creates a PDF transformation matrix from coordinates
   */
  static createTransformMatrix(coords: Coordinates): PdfTransformationMatrix {
    return [
      1.0, // scaleX - unit scale
      0, // skewY
      0, // skewX
      1.0, // scaleY - unit scale
      coords.x, // x position
      coords.y // y position
    ];
  }

  /**
   * Extracts coordinates from a PDF transformation matrix
   */
  static getCoordinatesFromMatrix(
    matrix: PdfTransformationMatrix,
    width: number,
    height: number
  ): Coordinates {
    return {
      x: matrix[4], // x position is at index 4
      y: matrix[5], // y position is at index 5
      width,
      height
    };
  }

  /**
   * Validates if coordinates are within page boundaries
   */
  static validateCoordinates(
    coords: Coordinates,
    pageWidth: number,
    pageHeight: number
  ): boolean {
    return (
      coords.x >= 0 &&
      coords.y >= 0 &&
      coords.x + coords.width <= pageWidth &&
      coords.y + coords.height <= pageHeight
    );
  }
}
