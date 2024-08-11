import { useState } from 'react';
import { InvoiceExtractTemplate } from '../interfaces';

export const useTemplateSelector = () => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<InvoiceExtractTemplate | null>(null);

  const selectTemplate = (template: InvoiceExtractTemplate) => {
    setSelectedTemplate(template);
  };

  return { selectedTemplate, selectTemplate };
};
