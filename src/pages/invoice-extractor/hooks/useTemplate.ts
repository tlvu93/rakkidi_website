import { useState } from 'react';
import { InvoiceExtractTemplate } from '../types';

export const useTemplate = () => {
  const [template, setTemplate] = useState<InvoiceExtractTemplate | null>(null);

  const handleSetTemplate = (template: InvoiceExtractTemplate) => {
    setTemplate(template);
  };

  return { template, setTemplate: handleSetTemplate };
};
