import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import { InvoiceExtractTemplate } from 'features/invoice-extractor/interfaces';

interface TemplateManagementContextProps {
  templates: InvoiceExtractTemplate[];
  selectedTemplate: InvoiceExtractTemplate | null;
  setTemplate: (template: InvoiceExtractTemplate) => void;
  addTemplate: (template: InvoiceExtractTemplate) => void;
  selectTemplate: (templateName: string) => void;
}

const TemplateManagementContext = createContext<
  TemplateManagementContextProps | undefined
>(undefined);

const TEMPLATE_STORAGE_KEY = 'templates';

export const TemplateManagementProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [templates, setTemplates] = useState<InvoiceExtractTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] =
    useState<InvoiceExtractTemplate | null>(null);

  // Load templates from localStorage on component mount
  useEffect(() => {
    console.log('Loading templates from localStorage');
    const storedTemplates = localStorage.getItem(TEMPLATE_STORAGE_KEY);
    if (storedTemplates) {
      setTemplates(JSON.parse(storedTemplates));
    }
  }, []);

  // Save templates to localStorage whenever the templates array changes
  useEffect(() => {
    console.log('Saving templates to localStorage');
    if (templates.length > 0) {
      localStorage.setItem(TEMPLATE_STORAGE_KEY, JSON.stringify(templates));
    }
  }, [templates]);

  const addTemplate = (template: InvoiceExtractTemplate) => {
    setTemplates((prevTemplates) => [...prevTemplates, template]);
  };

  const setTemplate = (template: InvoiceExtractTemplate) => {
    setSelectedTemplate(template);
  };

  const selectTemplate = (templateName: string) => {
    const selected =
      templates.find((template) => template.name === templateName) || null;
    setSelectedTemplate(selected);
  };

  return (
    <TemplateManagementContext.Provider
      value={{
        templates,
        selectedTemplate,
        setTemplate,
        addTemplate,
        selectTemplate
      }}
    >
      {children}
    </TemplateManagementContext.Provider>
  );
};

export const useTemplateManagement = (): TemplateManagementContextProps => {
  const context = useContext(TemplateManagementContext);
  if (!context) {
    throw new Error(
      'useTemplateManagement must be used within a TemplateManagementProvider'
    );
  }
  return context;
};
