import React, { useEffect, useRef } from 'react';
import { Rect, Transformer } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Transformer as KonvaTransformer } from 'konva/lib/shapes/Transformer';
import { Rect as KonvaRect } from 'konva/lib/shapes/Rect';

interface RectangleProps {
  shapeProps: {
    x: number;
    y: number;
    width: number;
    height: number;
    [key: string]: any;
  };
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: Partial<RectangleProps['shapeProps']>) => void;
}

const Rectangle: React.FC<RectangleProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange
}) => {
  const shapeRef = useRef<KonvaRect>(null);
  const trRef = useRef<KonvaTransformer>(null);

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current?.nodes([shapeRef.current!]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    onChange({
      ...shapeProps,
      x: e.target.x(),
      y: e.target.y()
    });
  };

  const handleTransformEnd = (e: KonvaEventObject<Event>) => {
    const node = shapeRef.current!;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);
    onChange({
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY)
    });
  };

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        stroke="blue"
        strokeWidth={0.5}
        {...shapeProps}
        draggable
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          rotateEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Rectangle;
