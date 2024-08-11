import { TemplateProvider } from '../../context/TemplateContext';
import PDFViewer from './pdf-viewer';

export default {
  component: PDFViewer,
  title: 'TemplateCreator/PDFViewer',
  tags: ['autodocs']
};

export const Default = {
  decorators: [
    (Story: React.ComponentType) => (
      <TemplateProvider>
        <Story />
      </TemplateProvider>
    )
  ]
};
