interface Token {
  text: string;
  x: number;
  y: number;
}

interface TextContent {
  items: Token[];
  viewport?: {
    width: number;
    height: number;
  };
}

const VIEWPORT = {
  width: 595.28,
  height: 841.89,
  rotation: 0
};

/**
 * Extracts text from a specified area based on field position.
 *
 * @param textContent - The text content with items and viewport information
 * @param tfMatrix - Transformation matrix [scaleX, skewX, skewY, scaleY, translateX, translateY]
 * @param width - Width of the selection area
 * @param height - Height of the selection area
 * @returns The extracted text with whitespace removed
 */
export const extractTextFromArea = (
  textContent: TextContent,
  tfMatrix: number[],
  width: number,
  height: number
): string => {
  const [, , , , rectX, rectY] = tfMatrix; // Extract translation (x, y) from the transformation matrix

  // Invert the Y-coordinate to match the PDF coordinate system
  const invertedRectY = VIEWPORT.height - rectY;

  console.log('Viewport:', VIEWPORT);
  console.log('Transformation Matrix:', tfMatrix);
  console.log('Original Y:', rectY, 'Inverted Y:', invertedRectY);

  // Filter text items that fall within the specified area
  const extractedText = textContent.items
    .filter((textToken) => {
      const textX = textToken.x; // X-coordinate of the text item
      const textY = VIEWPORT.height - textToken.y; // Invert the Y-coordinate of the text item

      console.log(
        'Text Token:',
        textToken.text,
        'X:',
        textX,
        'Inverted Y:',
        textY
      );

      // Check if the text item is within the field area
      const isWithinX = textX >= rectX && textX <= rectX + width;
      const isWithinY =
        textY >= invertedRectY - height && textY <= invertedRectY;

      console.log(
        'X Bounds:',
        rectX,
        'to',
        rectX + width,
        'Is Within X:',
        isWithinX
      );
      console.log(
        'Y Bounds:',
        invertedRectY - height,
        'to',
        invertedRectY,
        'Is Within Y:',
        isWithinY
      );

      return isWithinX && isWithinY;
    })
    .map((item) => item.text) // Extract the text string
    .join(' ') // Join text items with a space
    .trim(); // Remove leading/trailing whitespace

  return extractedText;
};
