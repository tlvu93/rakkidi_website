import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
  FC
} from 'react';

import { InvoiceExtractTemplate } from 'features/invoice-extractor/interfaces';

import { updateTemplatesList } from '../hooks/useTemplateStorage';

export interface TemplateManagementContextProps {
  templates: InvoiceExtractTemplate[];
  selectedTemplate: InvoiceExtractTemplate | null;
  setTemplate: (template: InvoiceExtractTemplate) => void;
  addTemplate: (template: InvoiceExtractTemplate) => Promise<void>;
  deleteTemplate: (template: InvoiceExtractTemplate) => void;
  selectTemplate: (template: InvoiceExtractTemplate) => void;
  updateTemplate: (template: InvoiceExtractTemplate) => Promise<void>;
  isLoading: boolean;
}

const TemplateManagementContext = createContext<
  TemplateManagementContextProps | undefined
>(undefined);

const TEMPLATE_STORAGE_KEY = 'templates';

const loadTemplatesFromStorage = (): InvoiceExtractTemplate[] => {
  try {
    const storedTemplates = localStorage.getItem(TEMPLATE_STORAGE_KEY);
    return storedTemplates ? JSON.parse(storedTemplates) : [];
  } catch (error) {
    console.error('Error loading templates:', error);
    return [];
  }
};

const saveTemplatesToStorage = (templates: InvoiceExtractTemplate[]): void => {
  try {
    localStorage.setItem(TEMPLATE_STORAGE_KEY, JSON.stringify(templates));
  } catch (error) {
    console.error('Error saving templates:', error);
  }
};

export const TemplateManagementProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const [templates, setTemplates] = useState<InvoiceExtractTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] =
    useState<InvoiceExtractTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load templates on mount
  useEffect(() => {
    const loadTemplates = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const loadedTemplates = loadTemplatesFromStorage();
        setTemplates(loadedTemplates);
      } finally {
        setIsLoading(false);
      }
    };
    loadTemplates();
  }, []);

  const addTemplate = useCallback(async (template: InvoiceExtractTemplate) => {
    setTemplates((prevTemplates) => {
      const newTemplates = [...prevTemplates, template];
      localStorage.setItem(TEMPLATE_STORAGE_KEY, JSON.stringify(newTemplates));
      return newTemplates;
    });
    // Update the templates list only when explicitly saving
    updateTemplatesList(template);
  }, []);

  const setTemplate = useCallback((template: InvoiceExtractTemplate) => {
    setSelectedTemplate(template);
  }, []);

  const selectTemplate = useCallback((template: InvoiceExtractTemplate) => {
    setSelectedTemplate(template);
  }, []);

  const deleteTemplate = useCallback(
    (template: InvoiceExtractTemplate) => {
      setTemplates((prevTemplates) => {
        const newTemplates = prevTemplates.filter(
          (t) => t.name !== template.name
        );
        saveTemplatesToStorage(newTemplates);
        return newTemplates;
      });
      if (selectedTemplate?.name === template.name) {
        setSelectedTemplate(null);
      }
    },
    [selectedTemplate]
  );

  const updateTemplate = useCallback(
    async (template: InvoiceExtractTemplate) => {
      setTemplates((prevTemplates) => {
        const newTemplates = prevTemplates.map((t) =>
          t.name === template.name ? template : t
        );
        localStorage.setItem(
          TEMPLATE_STORAGE_KEY,
          JSON.stringify(newTemplates)
        );
        return newTemplates;
      });
      if (selectedTemplate?.name === template.name) {
        setSelectedTemplate(template);
      }
      // Update the templates list only when explicitly saving
      updateTemplatesList(template);
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
      updateTemplate,
      isLoading
    }),
    [
      templates,
      selectedTemplate,
      setTemplate,
      addTemplate,
      deleteTemplate,
      selectTemplate,
      updateTemplate,
      isLoading
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
