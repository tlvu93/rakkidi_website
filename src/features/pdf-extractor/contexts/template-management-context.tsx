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

import { PDFExtractTemplate } from 'features/pdf-extractor/interfaces';

import { updateTemplatesList } from '../hooks/useTemplateStorage';

export interface TemplateManagementContextProps {
  templates: PDFExtractTemplate[];
  selectedTemplate: PDFExtractTemplate | null;
  setTemplate: (template: PDFExtractTemplate) => void;
  addTemplate: (template: PDFExtractTemplate) => Promise<void>;
  deleteTemplate: (template: PDFExtractTemplate) => void;
  selectTemplate: (template: PDFExtractTemplate) => void;
  updateTemplate: (template: PDFExtractTemplate) => Promise<void>;
  isLoading: boolean;
}

const TemplateManagementContext = createContext<
  TemplateManagementContextProps | undefined
>(undefined);

const TEMPLATE_STORAGE_KEY = 'templates';

const loadTemplatesFromStorage = (): PDFExtractTemplate[] => {
  try {
    const storedTemplates = localStorage.getItem(TEMPLATE_STORAGE_KEY);
    return storedTemplates ? JSON.parse(storedTemplates) : [];
  } catch (error) {
    console.error('Error loading templates:', error);
    return [];
  }
};

const saveTemplatesToStorage = (templates: PDFExtractTemplate[]): void => {
  try {
    localStorage.setItem(TEMPLATE_STORAGE_KEY, JSON.stringify(templates));
  } catch (error) {
    console.error('Error saving templates:', error);
  }
};

export const TemplateManagementProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const [templates, setTemplates] = useState<PDFExtractTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] =
    useState<PDFExtractTemplate | null>(null);
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

  const addTemplate = useCallback(async (template: PDFExtractTemplate) => {
    setTemplates((prevTemplates) => {
      const newTemplates = [...prevTemplates, template];
      localStorage.setItem(TEMPLATE_STORAGE_KEY, JSON.stringify(newTemplates));
      return newTemplates;
    });
    // Update the templates list only when explicitly saving
    updateTemplatesList(template);
  }, []);

  const setTemplate = useCallback((template: PDFExtractTemplate) => {
    setSelectedTemplate(template);
  }, []);

  const selectTemplate = useCallback((template: PDFExtractTemplate) => {
    setSelectedTemplate(template);
  }, []);

  const deleteTemplate = useCallback(
    (template: PDFExtractTemplate) => {
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
    async (template: PDFExtractTemplate) => {
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
