import React, { useRef, useState, useCallback } from 'react';
import { Layer, Stage, Text } from 'react-konva';
import { useTemplate } from '../../context/TemplateContext';
import Rectangle from './rectangle';
import {
  PageDimensions,
  PdfTransformationMatrix,
  RectProps
} from 'features/invoice-extractor/interfaces';
import Konva from 'konva';

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
      // Convert RectProps back to tfMatrix
      // Create proper PDF transformation matrix
      const updatedTfMatrix: PdfTransformationMatrix = [
        1.0, // scaleX - unit scale
        0, // skewY
        0, // skewX
        1.0, // scaleY - unit scale
        newAttrs.x! / zoom, // x position
        newAttrs.y! / zoom // y position
      ];

      // Store width and height in the extraction field
      updateExtractionField({
        id,
        tfMatrix: updatedTfMatrix,
        width: newAttrs.width! / zoom,
        height: newAttrs.height! / zoom
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
          const [, , , , x, y] = field.tfMatrix;
          const width = field.width || 0;
          const height = field.height || 0;

          return (
            <React.Fragment key={field.id}>
              <Text
                text={field.name}
                x={x * zoom}
                y={y * zoom - 12 * zoom}
                fontSize={12 * zoom}
                fill="black"
                aria-label={`Field name: ${field.name}`}
              />
              <Rectangle
                shapeProps={{
                  id: field.id,
                  name: field.name,
                  x: x * zoom,
                  y: y * zoom,
                  width: width * zoom,
                  height: height * zoom,
                  fill: 'rgba(128, 128, 128, 0.8)'
                }}
                isSelected={field.id === selectedId}
                onSelect={() => handleSelect(field.id)}
                onChange={(newAttrs) => handleChange(field.id, newAttrs)}
                aria-label={`Extraction field: ${field.name}`}
              />
            </React.Fragment>
          );
        })}
      </Layer>
    </Stage>
  );
};

export default PdfCanvasLayer;
