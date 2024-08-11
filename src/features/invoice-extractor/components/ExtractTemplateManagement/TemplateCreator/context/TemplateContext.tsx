import React, { createContext, useState, useContext, ReactNode } from 'react';
import {
  ExtractionField,
  InvoiceExtractTemplate
} from 'features/invoice-extractor/interfaces';
import { faker } from '@faker-js/faker';

interface TemplateContextProps {
  template: InvoiceExtractTemplate;
  addExtractionField: () => void;
  deleteExtractionField: (id: string) => void;
  updateExtractionField: (updateField: Partial<ExtractionField>) => void;
  updateExtractionFields: (fields: ExtractionField[]) => void;
  updateTemplate: (newTemplate: Partial<InvoiceExtractTemplate>) => void;
}

const TemplateContext = createContext<TemplateContextProps | undefined>(
  undefined
);

export const TemplateProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [template, setTemplate] = useState<InvoiceExtractTemplate>({
    name: 'New Template',
    description: '',
    extractionFields: [] // Rename here
  });

  const addExtractionField = () => {
    const newField: ExtractionField = {
      id: faker.string.uuid(),
      name: `field${template.extractionFields.length + 1}`,
      tfMatrix: [50, 0, 0, 50, 100, 100],
      page: null
    };

    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      extractionFields: [...prevTemplate.extractionFields, newField] // Rename here
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
      extractionFields: updatedFields // Rename here
    }));
  };

  const updateExtractionField = (updateField: Partial<ExtractionField>) => {
    if (!updateField.id) {
      console.error('Update must contain an id');
      return;
    }
    setTemplate((prev) => ({
      ...prev,
      extractionFields: prev.extractionFields.map((field) =>
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

  return (
    <TemplateContext.Provider
      value={{
        template,
        addExtractionField,
        deleteExtractionField,
        updateExtractionField,
        updateExtractionFields,
        updateTemplate
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
