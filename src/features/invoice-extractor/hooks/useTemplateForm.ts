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

export interface UseTemplateFormReturn {
  register: ReturnType<typeof useForm<InvoiceExtractTemplate>>['register'];
  handleSubmit: (e: React.FormEvent) => void;
  errors: FieldErrors<InvoiceExtractTemplate>;
  isValid: boolean;
}

export const useTemplateForm = ({
  selectedTemplate,
  onSubmit,
  currentFields
}: UseTemplateFormProps): UseTemplateFormReturn => {
  const {
    register,
    handleSubmit: handleRHFSubmit,
    formState: { errors, isValid }
  } = useForm<InvoiceExtractTemplate>({
    defaultValues: selectedTemplate ?? defaultTemplate,
    mode: 'onChange'
  });

  const handleFormSubmit = (data: InvoiceExtractTemplate) => {
    // Include the current extraction fields from the template context
    const updatedTemplate = {
      ...data,
      extractionFields: currentFields
    };
    onSubmit(updatedTemplate);
  };

  return {
    register,
    handleSubmit: handleRHFSubmit(handleFormSubmit),
    errors,
    isValid
  };
};
