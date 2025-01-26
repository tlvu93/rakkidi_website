import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, IconButton, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { ReactElement, useMemo, useState, Suspense } from 'react';

import { useTemplateManagement } from 'features/pdf-extractor';
import { ErrorBoundary } from 'features/pdf-extractor/components/ErrorBoundary/error-boundary';
import PDFExtractorLayout from 'features/pdf-extractor/components/layout/pdf-extractor-layout';
import TemplateCreator from 'features/pdf-extractor/components/template/template-creator';
import { TemplateProvider } from 'features/pdf-extractor/contexts/TemplateContext';
import { useNavigationDirection } from 'features/pdf-extractor/hooks/useNavigationDirection';
import { PDFExtractTemplate } from 'features/pdf-extractor/interfaces';

const TemplatePageContent = (): ReactElement => {
  const router = useRouter();
  const { id } = router.query;
  const { templates, addTemplate, updateTemplate, isLoading } =
    useTemplateManagement();

  const selectedTemplate = useMemo(() => {
    if (!id || id === 'new' || isLoading) return null;
    const template = templates.find((t) => t.name === id);
    if (!template && !isLoading) {
      // Template not found after loading completed
      router.push('/pdf-extractor');
      return null;
    }
    return template ?? null;
  }, [id, templates, isLoading, router]);

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (template: PDFExtractTemplate): Promise<void> => {
    try {
      setIsSaving(true);
      if (id === 'new') {
        await addTemplate(template);
      } else {
        await updateTemplate(template);
      }
      router.push('/pdf-extractor');
    } catch (error) {
      console.error('Error saving template:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = (): void => {
    router.push('/pdf-extractor');
  };

  const direction = useNavigationDirection();

  const variants = useMemo(
    () => ({
      initial: { x: direction === 'forward' ? '100%' : '-100%' },
      animate: { x: 0 },
      exit: { x: direction === 'forward' ? '-100%' : '100%' }
    }),
    [direction]
  );

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Box sx={{ p: 3, height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={handleCancel} sx={{ mr: 2 }} aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4">
            {id === 'new' ? 'Create Template' : 'Edit Template'}
          </Typography>
        </Box>

        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="80%"
          >
            <CircularProgress />
          </Box>
        ) : (
          <ErrorBoundary>
            <Suspense
              fallback={
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="80%"
                >
                  <CircularProgress />
                </Box>
              }
            >
              <TemplateProvider initialTemplate={selectedTemplate}>
                <TemplateCreator
                  selectedTemplate={selectedTemplate}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                  isSaving={isSaving}
                />
              </TemplateProvider>
            </Suspense>
          </ErrorBoundary>
        )}
      </Box>
    </motion.div>
  );
};

const TemplatePage = (): ReactElement => {
  return (
    <PDFExtractorLayout>
      <TemplatePageContent />
    </PDFExtractorLayout>
  );
};

export default TemplatePage;
