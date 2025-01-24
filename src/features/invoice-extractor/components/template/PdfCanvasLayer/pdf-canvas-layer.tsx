import React, { useRef, useState, useCallback } from 'react';
import { Layer, Stage, Text } from 'react-konva';

import Rectangle from './rectangle';
import {
  PageDimensions,
  RectProps,
  ExtractionFieldType
} from 'features/invoice-extractor/interfaces';
import Konva from 'konva';
import { CoordinateTransformer } from 'features/invoice-extractor/utils/coordinate-transform';
import { useTemplate } from 'features/invoice-extractor';

type Props = {
  pageDimensions: PageDimensions;
  zoom: number;
};

const PdfCanvasLayer = ({ pageDimensions, zoom }: Props) => {
  const { template, updateExtractionField } = useTemplate();
  const [selectedId, selectShape] = useState<string | null>(null);
  const stageRef = useRef<Konva.Stage>(null);

  const checkDeselect = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleSelect = useCallback((id: string) => {
    selectShape(id);
  }, []);

  const handleChange = useCallback(
    (id: string, newAttrs: Partial<RectProps>) => {
      // Ensure all required properties are present
      if (
        typeof newAttrs.x !== 'number' ||
        typeof newAttrs.y !== 'number' ||
        typeof newAttrs.width !== 'number' ||
        typeof newAttrs.height !== 'number'
      ) {
        return; // Skip update if any required property is missing
      }

      // Convert screen coordinates to PDF coordinates
      const pdfCoords = CoordinateTransformer.screenToPdf(
        {
          x: newAttrs.x,
          y: newAttrs.y,
          width: newAttrs.width,
          height: newAttrs.height
        },
        { zoom }
      );

      // Create transformation matrix from PDF coordinates
      const updatedTfMatrix =
        CoordinateTransformer.createTransformMatrix(pdfCoords);

      // Update the extraction field
      updateExtractionField({
        id,
        tfMatrix: updatedTfMatrix,
        width: pdfCoords.width,
        height: pdfCoords.height
      });
    },
    [zoom, updateExtractionField]
  );

  return (
    <Stage
      width={pageDimensions.width * zoom}
      height={pageDimensions.height * zoom}
      ref={stageRef}
      style={{ position: 'absolute', top: 0, left: 0 }}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
      aria-label="PDF Canvas Layer"
    >
      <Layer>
        {template.extractionFields.map((field) => {
          if (field.type === ExtractionFieldType.Rectangle && field.tfMatrix) {
            // Convert PDF coordinates to screen coordinates for rectangle fields
            const pdfCoords = CoordinateTransformer.getCoordinatesFromMatrix(
              field.tfMatrix,
              field.width || 0,
              field.height || 0
            );
            const screenCoords = CoordinateTransformer.pdfToScreen(pdfCoords, {
              zoom
            });

            return (
              <React.Fragment key={field.id}>
                <Text
                  text={field.name}
                  x={screenCoords.x}
                  y={screenCoords.y - 12 * zoom}
                  fontSize={12 * zoom}
                  fill="black"
                  aria-label={`Field name: ${field.name}`}
                />
                <Rectangle
                  shapeProps={{
                    id: field.id,
                    name: field.name,
                    x: screenCoords.x,
                    y: screenCoords.y,
                    width: screenCoords.width,
                    height: screenCoords.height,
                    fill: 'rgba(128, 128, 128, 0.8)'
                  }}
                  isSelected={field.id === selectedId}
                  onSelect={() => handleSelect(field.id)}
                  onChange={(newAttrs) => handleChange(field.id, newAttrs)}
                  aria-label={`Extraction field: ${field.name}`}
                />
              </React.Fragment>
            );
          } else if (field.type === ExtractionFieldType.Keyword) {
            // For keyword fields, show a visual indicator
            return (
              <React.Fragment key={field.id}>
                <Text
                  text={`🔍 ${field.name} (${
                    field.keyword || 'No keyword set'
                  })`}
                  x={10}
                  y={10 + template.extractionFields.indexOf(field) * 20 * zoom}
                  fontSize={12 * zoom}
                  fill="blue"
                  aria-label={`Keyword field: ${field.name}`}
                />
              </React.Fragment>
            );
          }
          return null;
        })}
      </Layer>
    </Stage>
  );
};

export default PdfCanvasLayer;
