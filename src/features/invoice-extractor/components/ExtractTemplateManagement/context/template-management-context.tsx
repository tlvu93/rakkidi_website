import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo
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

  useEffect(() => {
    const storedTemplates = localStorage.getItem(TEMPLATE_STORAGE_KEY);
    if (storedTemplates) {
      setTemplates(JSON.parse(storedTemplates));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TEMPLATE_STORAGE_KEY, JSON.stringify(templates));
  }, [templates]);

  const addTemplate = useCallback((template: InvoiceExtractTemplate) => {
    setTemplates((prevTemplates) => [...prevTemplates, template]);
  }, []);

  const setTemplate = useCallback((template: InvoiceExtractTemplate) => {
    setSelectedTemplate(template);
  }, []);

  const selectTemplate = useCallback(
    (templateName: string) => {
      setSelectedTemplate(
        templates.find((template) => template.name === templateName) || null
      );
    },
    [templates]
  );

  const contextValue = useMemo(
    () => ({
      templates,
      selectedTemplate,
      setTemplate,
      addTemplate,
      selectTemplate
    }),
    [templates, selectedTemplate, setTemplate, addTemplate, selectTemplate]
  );

  return (
    <TemplateManagementContext.Provider value={contextValue}>
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
