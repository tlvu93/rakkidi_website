import {
  PageDimensions,
  RectProps
} from 'features/invoice-extractor/interfaces';
import React, { useRef, useState } from 'react';
import { Layer, Rect, Stage, Text } from 'react-konva';
import Rectangle from './rectangle';

type Props = {
  pageDimensions: PageDimensions;
};

const generateRandomName = (index: number) => `rect${index + 1}`;

const PdfCanvasLayer = ({ pageDimensions }: Props) => {
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
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  return (
    <Stage
      width={pageDimensions.width}
      height={pageDimensions.height}
      ref={stageRef}
      style={{ position: 'absolute', top: 0, left: 0 }}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {rectangles.map((rect, index) => (
          <React.Fragment key={rect.id}>
            <Text
              text={rect.name}
              x={rect.x}
              y={rect.y - 12}
              fontSize={12}
              fill="black"
            />
            <Rectangle
              shapeProps={rect}
              isSelected={rect.id === selectedId}
              onSelect={() => {
                selectShape(rect.id);
              }}
              onChange={(newAttrs) => {
                const rects = rectangles.slice();
                rects[index] = { ...newAttrs, name: rects[index].name };
                setRectangles(rects);
              }}
            />
          </React.Fragment>
        ))}
      </Layer>
    </Stage>
  );
};

export default PdfCanvasLayer;
