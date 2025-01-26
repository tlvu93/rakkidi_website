// Components
export {
  TemplateCreator,
  PdfViewer,
  PropertiesTable,
  TemplateManagement
} from './components/template';

// Contexts
export {
  TemplateProvider,
  useTemplate,
  TemplateManagementProvider,
  useTemplateManagement,
  type TemplateContextProps
} from './contexts';

// Hooks
export {
  useTemplateForm,
  useTemplateStorage,
  type UseTemplateFormProps,
  type UseTemplateFormReturn,
  type UseTemplateStorageProps
} from './hooks';

// Utils
export {
  CoordinateTransformer,
  visualizeCoordinates,
  logCoordinateAnalysis,
  type DebugVisualization
} from './utils';

// Interfaces
export type {
  ExtractionField,
  PDFExtractTemplate,
  PdfTransformationMatrix,
  PageDimensions,
  RectProps
} from './interfaces';
export type { TemplateCsvData } from './interfaces/template-csv-data';

// PDF Utils
export { getTextTokenFromPdfFile } from './utils/pdf-extract';
export { extractFieldsFromTemplate } from './utils/template-extractor';
