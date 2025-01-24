import React, { createContext, useState, useContext, ReactNode } from 'react';
import {
  ExtractionField,
  InvoiceExtractTemplate
} from 'features/invoice-extractor/interfaces';
import { faker } from '@faker-js/faker';
import { useTemplateStorage } from 'features/invoice-extractor/hooks/useTemplateStorage';

export interface TemplateContextProps {
  template: InvoiceExtractTemplate;
  addExtractionField: () => void;
  deleteExtractionField: (id: string) => void;
  updateExtractionField: (updateField: Partial<ExtractionField>) => void;
  updateExtractionFields: (fields: ExtractionField[]) => void;
  updateTemplate: (newTemplate: Partial<InvoiceExtractTemplate>) => void;
  canAddExtractionField: boolean;
  exportTemplate: () => void;
  importTemplate: (file: File) => Promise<void>;
}

const TemplateContext = createContext<TemplateContextProps | undefined>(
  undefined
);

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

  // Use the template storage hook
  useTemplateStorage({ template, setTemplate, initialTemplate });

  const addExtractionField = () => {
    const newField: ExtractionField = {
      id: faker.string.uuid(),
      name: `Field ${template.extractionFields.length + 1}`,
      tfMatrix: [1.0, 0, 0, 1.0, 100, 100], // unit scale transformation matrix
      width: 50, // default width
      height: 50, // default height
      page: null
    };

    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      extractionFields: [...prevTemplate.extractionFields, newField]
    }));
  };

  const deleteExtractionField = (id: string) => {
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      extractionFields: prevTemplate.extractionFields.filter(
        (field) => field.id !== id
      )
    }));
  };

  const updateExtractionFields = (updatedFields: ExtractionField[]) => {
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      extractionFields: updatedFields
    }));
  };

  const updateExtractionField = (updateField: Partial<ExtractionField>) => {
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

  const updateTemplate = (newTemplate: Partial<InvoiceExtractTemplate>) => {
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

  const exportTemplate = () => {
    const jsonString = JSON.stringify(template, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.replace(/\s+/g, '_')}_template.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importTemplate = async (file: File) => {
    try {
      const text = await file.text();
      const importedTemplate = JSON.parse(text) as InvoiceExtractTemplate;

      // Validate the imported template structure
      if (
        !importedTemplate.name ||
        !Array.isArray(importedTemplate.extractionFields)
      ) {
        throw new Error('Invalid template format');
      }

      setTemplate(importedTemplate);
    } catch (error) {
      throw new Error('Failed to import template: ' + (error as Error).message);
    }
  };

  return (
    <TemplateContext.Provider
      value={{
        template,
        addExtractionField,
        deleteExtractionField,
        updateExtractionField,
        updateExtractionFields,
        updateTemplate,
        canAddExtractionField,
        exportTemplate,
        importTemplate
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
