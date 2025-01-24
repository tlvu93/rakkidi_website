import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect
} from 'react';
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
  canAddExtractionField: boolean;
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

  // Load template from localStorage on mount, but only if no initialTemplate was provided
  useEffect(() => {
    if (typeof window !== 'undefined' && !initialTemplate) {
      const savedTemplate = localStorage.getItem('current-template');
      if (savedTemplate) {
        try {
          const parsed = JSON.parse(savedTemplate);
          // Migrate existing fields to include width and height if they don't have them
          if (parsed.extractionFields) {
            parsed.extractionFields = parsed.extractionFields.map(
              (field: ExtractionField) => ({
                ...field,
                width: field.width || 50, // Default width if not present
                height: field.height || 50 // Default height if not present
              })
            );
          }
          setTemplate(parsed);

          // Also add to templates list if not already present
          const storedTemplates = localStorage.getItem('templates');
          if (storedTemplates) {
            const templates = JSON.parse(storedTemplates);
            // Migrate all stored templates
            const migratedTemplates = templates.map(
              (t: InvoiceExtractTemplate) => ({
                ...t,
                extractionFields: t.extractionFields.map(
                  (field: ExtractionField) => ({
                    ...field,
                    width: field.width || 50,
                    height: field.height || 50
                  })
                )
              })
            );

            // Add current template if not present
            if (
              !migratedTemplates.some(
                (t: InvoiceExtractTemplate) => t.name === parsed.name
              )
            ) {
              migratedTemplates.push(parsed);
            }

            localStorage.setItem(
              'templates',
              JSON.stringify(migratedTemplates)
            );
          } else {
            localStorage.setItem('templates', JSON.stringify([parsed]));
          }
        } catch (error) {
          console.error('Error parsing saved template:', error);
        }
      }
    }
  }, []);

  // Save current template to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('current-template', JSON.stringify(template));

      // Update template in templates list if it exists
      const storedTemplates = localStorage.getItem('templates');
      if (storedTemplates) {
        const templates = JSON.parse(storedTemplates);
        const index = templates.findIndex(
          (t: InvoiceExtractTemplate) => t.name === template.name
        );
        if (index >= 0) {
          templates[index] = template;
          localStorage.setItem('templates', JSON.stringify(templates));
        }
      }
    }
  }, [template]);

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

  return (
    <TemplateContext.Provider
      value={{
        template,
        addExtractionField,
        deleteExtractionField,
        updateExtractionField,
        updateExtractionFields,
        updateTemplate,
        canAddExtractionField
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
