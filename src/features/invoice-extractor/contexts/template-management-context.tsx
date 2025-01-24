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

export interface TemplateManagementContextProps {
  templates: InvoiceExtractTemplate[];
  selectedTemplate: InvoiceExtractTemplate | null;
  setTemplate: (template: InvoiceExtractTemplate) => void;
  addTemplate: (template: InvoiceExtractTemplate) => void;
  deleteTemplate: (template: InvoiceExtractTemplate) => void;
  selectTemplate: (template: InvoiceExtractTemplate) => void;
  updateTemplate: (template: InvoiceExtractTemplate) => void;
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

  const selectTemplate = useCallback((template: InvoiceExtractTemplate) => {
    setSelectedTemplate(template);
  }, []);

  const deleteTemplate = useCallback(
    (template: InvoiceExtractTemplate) => {
      setTemplates((prevTemplates) =>
        prevTemplates.filter((t) => t.name !== template.name)
      );
      if (selectedTemplate?.name === template.name) {
        setSelectedTemplate(null);
      }
    },
    [selectedTemplate]
  );

  const updateTemplate = useCallback(
    (template: InvoiceExtractTemplate) => {
      setTemplates((prevTemplates) =>
        prevTemplates.map((t) => (t.name === template.name ? template : t))
      );
      if (selectedTemplate?.name === template.name) {
        setSelectedTemplate(template);
      }
    },
    [selectedTemplate]
  );

  const value = useMemo(
    () => ({
      templates,
      selectedTemplate,
      setTemplate,
      addTemplate,
      deleteTemplate,
      selectTemplate,
      updateTemplate
    }),
    [
      templates,
      selectedTemplate,
      setTemplate,
      addTemplate,
      deleteTemplate,
      selectTemplate,
      updateTemplate
    ]
  );

  return (
    <TemplateManagementContext.Provider value={value}>
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
