import React, { useRef, useState } from 'react';
import { Layer, Stage, Text } from 'react-konva';
import { useTemplate } from '../../context/TemplateContext';
import Rectangle from './rectangle';
import {
  PageDimensions,
  TransformationMatrix,
  RectProps
} from 'features/invoice-extractor/interfaces';

type Props = {
  pageDimensions: PageDimensions;
  zoom: number;
};

const PdfCanvasLayer = ({ pageDimensions, zoom }: Props) => {
  const { template, updateExtractionField } = useTemplate();
  const [selectedId, selectShape] = useState<string | null>(null);
  const stageRef = useRef<any>(null);

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleSelect = (id: string) => {
    selectShape(id);
  };

  const handleChange = (id: string, newAttrs: Partial<RectProps>) => {
    // Convert RectProps back to tfMatrix
    const updatedTfMatrix: TransformationMatrix = [
      newAttrs.width! / zoom, // FontHeight (scale factor for width)
      0,
      0,
      newAttrs.height! / zoom, // FontWidth (scale factor for height)
      newAttrs.x! / zoom, // X position
      newAttrs.y! / zoom // Y position
    ];

    updateExtractionField({
      id,
      tfMatrix: updatedTfMatrix
    });
  };

  return (
    <Stage
      width={pageDimensions.width * zoom}
      height={pageDimensions.height * zoom}
      ref={stageRef}
      style={{ position: 'absolute', top: 0, left: 0 }}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {template.extractionFields.map((field) => {
          const [fontHeight, , , fontWidth, x, y] = field.tfMatrix;

          return (
            <React.Fragment key={field.id}>
              <Text
                text={field.name}
                x={x * zoom}
                y={y * zoom - 12 * zoom}
                fontSize={12 * zoom}
                fill="black"
              />
              <Rectangle
                shapeProps={{
                  id: field.id,
                  name: field.name,
                  x: x * zoom,
                  y: y * zoom,
                  width: fontHeight * zoom,
                  height: fontWidth * zoom,
                  fill: 'rgba(128, 128, 128, 0.8)'
                }}
                isSelected={field.id === selectedId}
                onSelect={() => handleSelect(field.id)}
                onChange={(newAttrs) => handleChange(field.id, newAttrs)}
              />
            </React.Fragment>
          );
        })}
      </Layer>
    </Stage>
  );
};

export default PdfCanvasLayer;
