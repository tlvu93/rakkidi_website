import { useEffect } from 'react';

import { InvoiceExtractTemplate, ExtractionField } from '../interfaces';

const DEFAULT_FIELD_DIMENSIONS = {
  width: 50,
  height: 50
};

export interface UseTemplateStorageProps {
  template: InvoiceExtractTemplate;
  setTemplate: (template: InvoiceExtractTemplate) => void;
  initialTemplate: InvoiceExtractTemplate | null;
}

export const useTemplateStorage = ({
  template,
  setTemplate,
  initialTemplate
}: UseTemplateStorageProps) => {
  // Load template from localStorage on mount, but only if no initialTemplate was provided
  useEffect(() => {
    if (typeof window === 'undefined' || initialTemplate) {
      return;
    }

    try {
      const savedTemplate = localStorage.getItem('current-template');
      if (!savedTemplate) {
        return;
      }

      const parsed = JSON.parse(savedTemplate);
      const migratedTemplate = migrateTemplate(parsed);
      setTemplate(migratedTemplate);

      // Update templates list
      updateTemplatesList(migratedTemplate);
    } catch (error) {
      console.error('Error loading template from storage:', error);
    }
  }, [initialTemplate, setTemplate]);

  // Save current template to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem('current-template', JSON.stringify(template));
      updateTemplatesList(template);
    } catch (error) {
      console.error('Error saving template to storage:', error);
    }
  }, [template]);
};

// Helper function to migrate a template to include width and height
const migrateTemplate = (
  template: InvoiceExtractTemplate
): InvoiceExtractTemplate => {
  return {
    ...template,
    extractionFields: template.extractionFields.map(migrateField)
  };
};

// Helper function to migrate a single extraction field
const migrateField = (field: ExtractionField): ExtractionField => {
  return {
    ...field,
    width: field.width || DEFAULT_FIELD_DIMENSIONS.width,
    height: field.height || DEFAULT_FIELD_DIMENSIONS.height
  };
};

// Helper function to update the templates list in localStorage
const updateTemplatesList = (currentTemplate: InvoiceExtractTemplate) => {
  try {
    const storedTemplates = localStorage.getItem('templates');
    let templates = storedTemplates ? JSON.parse(storedTemplates) : [];

    // Migrate all stored templates
    templates = templates.map(migrateTemplate);

    // Update or add current template
    const index = templates.findIndex(
      (t: InvoiceExtractTemplate) => t.name === currentTemplate.name
    );

    if (index >= 0) {
      templates[index] = currentTemplate;
    } else {
      templates.push(currentTemplate);
    }

    localStorage.setItem('templates', JSON.stringify(templates));
  } catch (error) {
    console.error('Error updating templates list:', error);
  }
};
