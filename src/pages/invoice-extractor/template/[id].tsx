import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, IconButton, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { ReactElement, useMemo, useState } from 'react';


import { useTemplateManagement } from 'features/invoice-extractor';
import InvoiceExtractorLayout from 'features/invoice-extractor/components/layout/invoice-extractor-layout';
import TemplateCreator from 'features/invoice-extractor/components/template/template-creator';
import { TemplateProvider } from 'features/invoice-extractor/contexts/TemplateContext';
import { useNavigationDirection } from 'features/invoice-extractor/hooks/useNavigationDirection';
import { InvoiceExtractTemplate } from 'features/invoice-extractor/interfaces';

const TemplatePageContent = (): ReactElement => {
  const router = useRouter();
  const { id } = router.query;
  const { templates, addTemplate, updateTemplate } = useTemplateManagement();

  const selectedTemplate = useMemo(() => {
    if (!id || id === 'new') return null;
    return templates.find((t) => t.name === id) ?? null;
  }, [id, templates]);

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (
    template: InvoiceExtractTemplate
  ): Promise<void> => {
    try {
      setIsSaving(true);
      if (id === 'new') {
        await addTemplate(template);
      } else {
        await updateTemplate(template);
      }
      router.push('/invoice-extractor');
    } catch (error) {
      console.error('Error saving template:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = (): void => {
    router.push('/invoice-extractor');
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

        <TemplateProvider initialTemplate={selectedTemplate}>
          <TemplateCreator
            selectedTemplate={selectedTemplate}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSaving={isSaving}
          />
        </TemplateProvider>
      </Box>
    </motion.div>
  );
};

const TemplatePage = (): ReactElement => {
  return (
    <InvoiceExtractorLayout>
      <TemplatePageContent />
    </InvoiceExtractorLayout>
  );
};

export default TemplatePage;
