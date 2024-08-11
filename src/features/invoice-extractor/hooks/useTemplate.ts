import { useState } from 'react';
import { InvoiceExtractTemplate } from '../interfaces';

export const useTemplate = () => {
  const [template, setTemplate] = useState<InvoiceExtractTemplate | null>(null);

  const handleSetTemplate = (template: InvoiceExtractTemplate) => {
    setTemplate(template);
  };

  return { template, setTemplate: handleSetTemplate };
};
