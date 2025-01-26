import Konva from 'konva';
import { TextContent, TextItem } from 'pdfjs-dist/types/src/display/api';
import React, { useRef, useState, useCallback } from 'react';
import { Layer, Stage, Text, Rect } from 'react-konva';

import { useTemplate } from 'features/pdf-extractor';
import {
  PageDimensions,
  RectProps,
  ExtractionFieldType
} from 'features/pdf-extractor/interfaces';
import { CoordinateTransformer } from 'features/pdf-extractor/utils/coordinate-transform';

import Rectangle from './rectangle';

type Props = {
  pageDimensions: PageDimensions;
  zoom: number;
  textContent: TextContent | null;
  showTokens: boolean;
};

const PdfCanvasLayer: React.FC<Props> = ({
  pageDimensions,
  zoom,
  textContent,
  showTokens
}): React.ReactElement => {
  const { template, updateExtractionField, updateExtractedText } =
    useTemplate();

  const isTextItem = (item: TextContent['items'][0]): item is TextItem => {
    return 'str' in item && 'transform' in item;
  };

  const [selectedId, selectShape] = useState<string | null>(null);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const stageRef = useRef<Konva.Stage>(null);

  const handleTokenClick = useCallback(
    (item: TextItem) => {
      // Use the selected field if it's a keyword field, otherwise find the first keyword field
      const keywordField = template.extractionFields.find(
        (field) =>
          field.type === ExtractionFieldType.Keyword &&
          (field.id === selectedFieldId || !selectedFieldId)
      );

      if (keywordField) {
        updateExtractionField({
          id: keywordField.id,
          keyword: item.str
        });
        // Update selected field to the one we just modified
        setSelectedFieldId(keywordField.id);
      }
    },
    [template.extractionFields, updateExtractionField, selectedFieldId]
  );

  const checkDeselect = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ): void => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
      setSelectedFieldId(null);
    }
  };

  const handleSelect = useCallback((id: string): void => {
    selectShape(id);
    setSelectedFieldId(id);
  }, []);

  const handleChange = useCallback(
    (id: string, newAttrs: Partial<RectProps>): void => {
      if (!textContent) return;
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
        { zoom, pageHeight: pageDimensions.height }
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

      // Update extracted text after modifying the rectangle
      updateExtractedText(textContent);
    },
    [zoom, updateExtractionField, textContent, updateExtractedText]
  );

  // Function to render the extraction area for a keyword field
  const renderExtractionArea = (item: TextItem, field: any) => {
    const screenCoords = CoordinateTransformer.pdfToScreen(
      {
        x: item.transform[4],
        y: item.transform[5],
        width: item.width,
        height: item.height || 10
      },
      { zoom, pageHeight: pageDimensions.height }
    );

    let areaProps = {
      x: screenCoords.x,
      y: screenCoords.y,
      width: 0,
      height: screenCoords.height
    };

    // Adjust area based on search direction
    switch (field.searchDirection) {
      case 'right':
        areaProps.width = field.maxDistance * zoom;
        break;
      case 'left':
        areaProps.x -= field.maxDistance * zoom;
        areaProps.width = field.maxDistance * zoom;
        break;
      case 'up':
        areaProps.y -= field.maxDistance * zoom;
        areaProps.height = field.maxDistance * zoom;
        areaProps.width = screenCoords.width;
        break;
      case 'down':
        areaProps.height = field.maxDistance * zoom;
        areaProps.width = screenCoords.width;
        break;
    }

    return (
      <Rect
        {...areaProps}
        fill="rgba(255, 165, 0, 0.2)"
        stroke="orange"
        strokeWidth={1}
        dash={[5, 5]}
      />
    );
  };

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
        {showTokens &&
          textContent?.items.filter(isTextItem).map((item, index) => {
            const screenCoords = CoordinateTransformer.pdfToScreen(
              {
                x: item.transform[4],
                y: item.transform[5],
                width: item.width,
                height: item.height || 10
              },
              { zoom, pageHeight: pageDimensions.height }
            );

            // Find if this token matches any selected keyword field
            const selectedField = template.extractionFields.find(
              (field) =>
                field.id === selectedFieldId &&
                field.type === ExtractionFieldType.Keyword &&
                field.keyword === item.str
            );

            return (
              <React.Fragment key={`token-${index}`}>
                <Rectangle
                  shapeProps={{
                    id: `token-${index}`,
                    x: screenCoords.x,
                    y: screenCoords.y,
                    width: screenCoords.width,
                    height: screenCoords.height,
                    fill: 'rgba(0, 128, 255, 0.2)',
                    stroke: 'rgba(0, 128, 255, 0.5)',
                    strokeWidth: 1
                  }}
                  isSelected={false}
                  onSelect={() => handleTokenClick(item)}
                  onChange={() => {}}
                  aria-label={`Text token: ${item.str}`}
                />
                {selectedField && renderExtractionArea(item, selectedField)}
              </React.Fragment>
            );
          })}
        {template.extractionFields.map((field) => {
          if (field.type === ExtractionFieldType.Rectangle && field.tfMatrix) {
            // Convert PDF coordinates to screen coordinates for rectangle fields
            const pdfCoords = CoordinateTransformer.getCoordinatesFromMatrix(
              field.tfMatrix,
              field.width || 0,
              field.height || 0
            );
            const screenCoords = CoordinateTransformer.pdfToScreen(pdfCoords, {
              zoom,
              pageHeight: pageDimensions.height
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
            // For keyword fields, show a visual indicator with selection state
            const isSelected = field.id === selectedFieldId;
            return (
              <React.Fragment key={field.id}>
                <Text
                  text={`🔍 ${field.name} (${
                    field.keyword || 'No keyword set'
                  })`}
                  x={10}
                  y={10 + template.extractionFields.indexOf(field) * 20 * zoom}
                  fontSize={12 * zoom}
                  fill={isSelected ? 'red' : 'blue'}
                  onClick={() => handleSelect(field.id)}
                  onTap={() => handleSelect(field.id)}
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
