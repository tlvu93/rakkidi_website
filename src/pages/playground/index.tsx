import { useEffect, useState } from 'react';
import { extractTextFromArea } from './extract-utils';

// Sample tokenized text from a PDF
const tokenizedText = [
  {
    text: 'A',
    x: 56.69292,
    y: 767.845
  },
  {
    text: ' ',
    x: 69.36592,
    y: 767.845
  },
  {
    text: 'B',
    x: 522.242320000001,
    y: 767.845
  },
  {
    text: '',
    x: 56.69292,
    y: 63.84505
  },
  {
    text: 'C',
    x: 56.69292,
    y: 63.84505
  },
  {
    text: ' ',
    x: 70.41092,
    y: 63.84505
  },
  {
    text: 'D',
    x: 524.9935199999996,
    y: 63.84505
  }
];

const templateObject = {
  name: 'New Template',
  description: '',
  extractionFields: [
    {
      id: '90d30eae-185b-4d33-86ce-035a4248925c',
      name: 'Field 1',
      tfMatrix: [1, 0, 0, 1, 42.342290132670634, 45.823403321456624],
      width: 16.876649306190366,
      height: 16.876649306190373,
      page: null
    },
    {
      id: '79e97b38-3236-488c-8b39-47e0d7820756',
      name: 'Field 2',
      tfMatrix: [1, 0, 0, 1, 413.29253751338507, 44.36414464793369],
      width: 17.281109719848544,
      height: 17.28110971984857,
      page: null
    },
    {
      id: 'e13dc6d0-ec2e-49f4-b097-00e822ee72fd',
      name: 'Field 3',
      tfMatrix: [1, 0, 0, 1, 42.808225079273626, 605.9791827294308],
      width: 18.377967950139976,
      height: 18.37796795013991,
      page: null
    },
    {
      id: '6425b759-06bc-45bd-a324-edcfac3c9d2c',
      name: 'Field 4',
      tfMatrix: [1, 0, 0, 1, 414.6678748389532, 603.8339483858099],
      width: 22.469776279648798,
      height: 22.46977627964877,
      page: null
    }
  ]
};

const PlaygroundPage = () => {
  const [extractedData, setExtractedData] = useState<any>(null);

  useEffect(() => {
    // Extract data when component mounts
    extractData();
  }, []);

  const extractData = () => {
    try {
      // Calculate page dimensions from token coordinates
      const pageHeight = Math.max(...tokenizedText.map((t) => t.y)) + 100;
      const pageWidth = Math.max(...tokenizedText.map((t) => t.x)) + 100;

      // Create text content object with tokens
      const textContent = {
        items: tokenizedText,
        viewport: {
          width: pageWidth,
          height: pageHeight
        }
      };

      // Extract text for each field
      const extractedFields = templateObject.extractionFields.map((field) => {
        return {
          name: field.name,
          text:
            field.name === 'Field 1'
              ? extractTextFromArea(
                  textContent,
                  field.tfMatrix,
                  field.width,
                  field.height
                )
              : 'nope',
          coordinates: {
            field: {
              x: field.tfMatrix[4],
              y: field.tfMatrix[5]
            },
            viewport: textContent.viewport
          }
        };
      });

      setExtractedData({
        fields: extractedFields,
        debug: {
          textContent,
          template: templateObject
        }
      });
    } catch (error) {
      console.error('Error extracting data:', error);
      setExtractedData({ error: 'Failed to extract data' });
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>PDF Extract Playground</h1>

      {/* Input Data */}
      <div style={{ marginTop: '2rem' }}>
        <h2>Input Data</h2>

        <h3>Tokenized Text</h3>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '2rem'
          }}
        >
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th
                style={{
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  textAlign: 'left'
                }}
              >
                Text
              </th>
              <th
                style={{
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  textAlign: 'left'
                }}
              >
                X
              </th>
              <th
                style={{
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  textAlign: 'left'
                }}
              >
                Y
              </th>
            </tr>
          </thead>
          <tbody>
            {tokenizedText.map((token, index) => (
              <tr key={index}>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                  {token.text || '(empty)'}
                </td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                  {token.x.toFixed(2)}
                </td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                  {token.y.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Template Fields</h3>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '2rem'
          }}
        >
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th
                style={{
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  textAlign: 'left'
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  textAlign: 'left'
                }}
              >
                X
              </th>
              <th
                style={{
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  textAlign: 'left'
                }}
              >
                Y
              </th>
              <th
                style={{
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  textAlign: 'left'
                }}
              >
                Width
              </th>
              <th
                style={{
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  textAlign: 'left'
                }}
              >
                Height
              </th>
            </tr>
          </thead>
          <tbody>
            {templateObject.extractionFields.map((field) => (
              <tr key={field.id}>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                  {field.name}
                </td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                  {field.tfMatrix[4].toFixed(2)}
                </td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                  {field.tfMatrix[5].toFixed(2)}
                </td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                  {field.width}
                </td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                  {field.height}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Extracted Results */}
        <h2>Extracted Results</h2>
        {extractedData && !extractedData.error ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #ddd',
                    textAlign: 'left'
                  }}
                >
                  Field
                </th>
                <th
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #ddd',
                    textAlign: 'left'
                  }}
                >
                  Extracted Text
                </th>
              </tr>
            </thead>
            <tbody>
              {extractedData?.fields?.map((field: any) => (
                <tr key={field.name}>
                  <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                    {field.name}
                  </td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                    {field.text}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ color: 'red' }}>
            {extractedData?.error || 'No data extracted'}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaygroundPage;
