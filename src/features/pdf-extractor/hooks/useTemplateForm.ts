import { useForm } from 'react-hook-form';

import { PDFExtractTemplate, ExtractionField } from '../interfaces';

const defaultTemplate: PDFExtractTemplate = {
  name: 'New Template',
  description: 'New Template',
  extractionFields: []
};

export interface UseTemplateFormProps {
  selectedTemplate: PDFExtractTemplate | null;
  onSubmit: (template: PDFExtractTemplate) => void;
  currentFields: ExtractionField[];
}

export type UseTemplateFormReturn = ReturnType<
  typeof useForm<PDFExtractTemplate>
>;

export const useTemplateForm = ({
  selectedTemplate
}: UseTemplateFormProps): UseTemplateFormReturn => {
  const methods = useForm<PDFExtractTemplate>({
    defaultValues: selectedTemplate ?? defaultTemplate,
    mode: 'onChange'
  });

  return methods;
};
