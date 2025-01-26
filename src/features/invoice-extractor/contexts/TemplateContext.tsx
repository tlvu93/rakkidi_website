import { faker } from '@faker-js/faker';
import React, { createContext, useState, useContext, ReactNode } from 'react';

import { useTemplateStorage } from 'features/invoice-extractor/hooks/useTemplateStorage';
import {
  ExtractionField,
  ExtractionFieldType,
  InvoiceExtractTemplate
} from 'features/invoice-extractor/interfaces';
import { TextContent } from 'pdfjs-dist/types/src/display/api';
import { extractFieldsFromTemplate } from '../utils/template-extractor';

export interface TemplateContextProps {
  template: InvoiceExtractTemplate;
  extractedText: Record<string, string>;
  addExtractionField: (type?: ExtractionFieldType) => void;
  deleteExtractionField: (id: string) => void;
  updateExtractionField: (updateField: Partial<ExtractionField>) => void;
  updateExtractionFields: (fields: ExtractionField[]) => void;
  updateTemplate: (newTemplate: Partial<InvoiceExtractTemplate>) => void;
  canAddExtractionField: boolean;
  exportTemplate: (formName?: string) => void;
  importTemplate: (file: File, newName?: string) => Promise<void>;
  updateExtractedText: (textContent: TextContent) => Promise<void>;
}

const TemplateContext = createContext<TemplateContextProps | undefined>(
  undefined
);

interface ExtractedTextState {
  [key: string]: string;
}

interface TemplateProviderProps {
  children: ReactNode;
  initialTemplate: InvoiceExtractTemplate | null;
}

export const TemplateProvider: React.FC<TemplateProviderProps> = ({
  children,
  initialTemplate
}) => {
  const [template, setTemplate] = useState<InvoiceExtractTemplate>(
    initialTemplate ?? {
      name: 'New Template',
      description: '',
      extractionFields: []
    }
  );
  const [extractedText, setExtractedText] = useState<ExtractedTextState>({});

  // Use the template storage hook
  useTemplateStorage({ template, setTemplate, initialTemplate });

  const addExtractionField = (
    type: ExtractionFieldType = ExtractionFieldType.Rectangle
  ): void => {
    const baseField = {
      id: faker.string.uuid(),
      name: `Field ${template.extractionFields.length + 1}`,
      type,
      page: null
    };

    const newField: ExtractionField =
      type === ExtractionFieldType.Rectangle
        ? {
            ...baseField,
            tfMatrix: [1.0, 0, 0, 1.0, 100, 100], // unit scale transformation matrix
            width: 50, // default width
            height: 50 // default height
          }
        : {
            ...baseField,
            keyword: '',
            searchDirection: 'right' as const,
            maxDistance: 100 // default max distance in pixels
          };

    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      extractionFields: [...prevTemplate.extractionFields, newField]
    }));
  };

  const deleteExtractionField = (id: string): void => {
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      extractionFields: prevTemplate.extractionFields.filter(
        (field) => field.id !== id
      )
    }));
  };

  const updateExtractionFields = (updatedFields: ExtractionField[]): void => {
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      extractionFields: updatedFields
    }));
  };

  const updateExtractionField = (
    updateField: Partial<ExtractionField>
  ): void => {
    if (!updateField.id) {
      console.error('Update must contain an id');
      return;
    }
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      extractionFields: prevTemplate.extractionFields.map((field) =>
        field.id === updateField.id ? { ...field, ...updateField } : field
      )
    }));
  };

  const updateTemplate = (
    newTemplate: Partial<InvoiceExtractTemplate>
  ): void => {
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      ...newTemplate
    }));
  };

  // New constant for maximum allowed extraction fields
  const MAX_EXTRACTION_FIELDS = 20; // Adjust this number as needed

  // New computed property
  const canAddExtractionField =
    template.extractionFields.length < MAX_EXTRACTION_FIELDS;

  const exportTemplate = (formName?: string): void => {
    // Use form name if provided, otherwise use template name
    const name = formName?.trim() || template.name.trim();

    // Ensure we have a valid name
    if (!name || name === 'New Template') {
      console.error('Please provide a name for the template');
      return;
    }

    // Create a copy of the template with the current state and name
    const templateToExport = {
      ...template,
      name // Use the provided or current name
    };

    const jsonString = JSON.stringify(templateToExport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    // Use template name for the file name, replacing spaces and special characters with underscores
    const fileName = templateToExport.name.replace(/[^a-zA-Z0-9]/g, '_');
    a.download = `${fileName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importTemplate = async (
    file: File,
    newName?: string
  ): Promise<void> => {
    try {
      const text = await file.text();
      const importedTemplate = JSON.parse(text) as InvoiceExtractTemplate;

      // Validate the imported template structure
      if (!Array.isArray(importedTemplate.extractionFields)) {
        throw new Error('Invalid template format');
      }

      // Allow overriding the template name
      const templateToImport = {
        ...importedTemplate,
        name: newName?.trim() || importedTemplate.name || 'Imported Template'
      };

      setTemplate(templateToImport);
    } catch (error) {
      throw new Error('Failed to import template: ' + (error as Error).message);
    }
  };

  const updateExtractedText = async (
    textContent: TextContent
  ): Promise<void> => {
    const extracted = await extractFieldsFromTemplate(textContent, template);
    setExtractedText(extracted);
  };

  return (
    <TemplateContext.Provider
      value={{
        template,
        extractedText,
        addExtractionField,
        deleteExtractionField,
        updateExtractionField,
        updateExtractionFields,
        updateTemplate,
        canAddExtractionField,
        exportTemplate,
        importTemplate,
        updateExtractedText
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplate = (): TemplateContextProps => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
};
