import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { PDFExtractTemplate } from '../interfaces';

const defaultTemplate: PDFExtractTemplate = {
  name: 'New Template',
  description: 'New Template',
  extractionFields: []
};

export interface UseTemplateFormProps {
  /** Template being edited, or `null` when creating a new one. */
  selectedTemplate: PDFExtractTemplate | null;
}

export type UseTemplateFormReturn = ReturnType<
  typeof useForm<PDFExtractTemplate>
>;

/**
 * Wraps react-hook-form for the template name/description fields and keeps the
 * form in sync when the edited template changes.
 */
export const useTemplateForm = ({
  selectedTemplate
}: UseTemplateFormProps): UseTemplateFormReturn => {
  const methods = useForm<PDFExtractTemplate>({
    defaultValues: selectedTemplate ?? defaultTemplate,
    mode: 'onChange'
  });

  const { reset } = methods;

  useEffect(() => {
    reset(selectedTemplate ?? defaultTemplate);
  }, [selectedTemplate, reset]);

  return methods;
};
