import { useForm, FieldErrors } from 'react-hook-form';

import { InvoiceExtractTemplate, ExtractionField } from '../interfaces';

const defaultTemplate: InvoiceExtractTemplate = {
  name: 'New Template',
  description: 'New Template',
  extractionFields: []
};

export interface UseTemplateFormProps {
  selectedTemplate: InvoiceExtractTemplate | null;
  onSubmit: (template: InvoiceExtractTemplate) => void;
  currentFields: ExtractionField[];
}

export type UseTemplateFormReturn = ReturnType<
  typeof useForm<InvoiceExtractTemplate>
>;

export const useTemplateForm = ({
  selectedTemplate,
  onSubmit,
  currentFields
}: UseTemplateFormProps) => {
  const methods = useForm<InvoiceExtractTemplate>({
    defaultValues: selectedTemplate ?? defaultTemplate,
    mode: 'onChange'
  });

  const onSubmitHandler = (data: InvoiceExtractTemplate) => {
    const updatedTemplate = {
      ...data,
      extractionFields: currentFields
    };
    onSubmit(updatedTemplate);
  };

  return methods;
};
