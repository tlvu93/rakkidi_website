import { Box, IconButton, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigationDirection } from 'features/invoice-extractor/hooks/useNavigationDirection';

import TemplateCreator from 'features/invoice-extractor/components/template/template-creator';
import { TemplateProvider } from 'features/invoice-extractor/contexts/TemplateContext';
import { useTemplateManagement } from 'features/invoice-extractor';
import InvoiceExtractorLayout from 'features/invoice-extractor/components/layout/invoice-extractor-layout';

const TemplatePageContent = (): React.ReactElement => {
  const router = useRouter();
  const { id } = router.query;
  const { templates, addTemplate, updateTemplate } = useTemplateManagement();

  const selectedTemplate = React.useMemo(() => {
    if (!id || id === 'new') return null;
    return templates.find((t) => t.name === id) ?? null;
  }, [id, templates]);

  const [isSaving, setIsSaving] = React.useState(false);

  const handleSubmit = async (template: any) => {
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

  const handleCancel = () => {
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

const TemplatePage = (): React.ReactElement => {
  return (
    <InvoiceExtractorLayout>
      <TemplatePageContent />
    </InvoiceExtractorLayout>
  );
};

export default TemplatePage;
