import React, { useRef, useState } from 'react';
import { Layer, Stage, Text } from 'react-konva';
import {
  PageDimensions,
  RectProps
} from 'features/invoice-extractor/interfaces';
import Rectangle from './rectangle';

type Props = {
  pageDimensions: PageDimensions;
  zoom: number;
};

const generateRandomName = (index: number) => `rect${index + 1}`;

const PdfCanvasLayer = ({ pageDimensions, zoom }: Props) => {
  const [rectangles, setRectangles] = useState<RectProps[]>([
    {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      fill: 'rgba(128, 128, 128, 0.5)',
      id: '1',
      name: generateRandomName(0)
    }
  ]);
  const [selectedId, selectShape] = useState<string | null>(null);
  const stageRef = useRef<any>(null);

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleSelect = (rect: RectProps) => {
    selectShape(rect.id);
  };

  const handleChange = (index: number, newAttrs: any) => {
    // Store the rectangle's state in logical coordinates (unzoomed)
    const rects = rectangles.slice();
    rects[index] = {
      ...newAttrs,
      x: newAttrs.x / zoom,
      y: newAttrs.y / zoom,
      width: newAttrs.width / zoom,
      height: newAttrs.height / zoom,
      name: rects[index].name
    };
    setRectangles(rects);
  };

  return (
    <Stage
      width={pageDimensions.width * zoom} // adjust width according to zoom level
      height={pageDimensions.height * zoom} // adjust height according to zoom level
      ref={stageRef}
      style={{ position: 'absolute', top: 0, left: 0 }}
      onMouseDown={(e) => {
        checkDeselect(e);

        // Adjust mouse position according to zoom level
        const mousePos = stageRef.current.getPointerPosition();
        const adjustedX = mousePos.x / zoom;
        const adjustedY = mousePos.y / zoom;

        console.log('Mouse position adjusted for zoom:', adjustedX, adjustedY);
      }}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {rectangles.map((rect, index) => (
          <React.Fragment key={rect.id}>
            <Text
              text={rect.name}
              x={rect.x * zoom} // apply zoom to x position
              y={rect.y * zoom - 12} // apply zoom to y position, adjust for text height
              fontSize={12 * zoom} // scale font size
              fill="black"
            />
            <Rectangle
              shapeProps={{
                ...rect,
                x: rect.x * zoom, // apply zoom to x position for rendering
                y: rect.y * zoom, // apply zoom to y position for rendering
                width: rect.width * zoom, // apply zoom to width for rendering
                height: rect.height * zoom // apply zoom to height for rendering
              }}
              isSelected={rect.id === selectedId}
              onSelect={() => handleSelect(rect)}
              onChange={(newAttrs) => handleChange(index, newAttrs)}
            />
          </React.Fragment>
        ))}
      </Layer>
    </Stage>
  );
};

export default PdfCanvasLayer;
