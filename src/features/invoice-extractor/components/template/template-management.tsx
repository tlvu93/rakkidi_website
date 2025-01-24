import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTemplateManagement } from '../../contexts/template-management-context';
import { TemplateCreatorModal } from './template-creator';
import { InvoiceExtractTemplate } from '../../interfaces';

const TemplateManagement = () => {
  const {
    templates,
    selectedTemplate,
    selectTemplate,
    deleteTemplate,
    addTemplate,
    updateTemplate
  } = useTemplateManagement();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [templateToEdit, setTemplateToEdit] =
    useState<InvoiceExtractTemplate | null>(null);

  const handleCreateTemplate = (template: InvoiceExtractTemplate) => {
    addTemplate(template);
    setIsCreateModalOpen(false);
  };

  const handleEditTemplate = (template: InvoiceExtractTemplate) => {
    updateTemplate(template);
    setIsEditModalOpen(false);
    setTemplateToEdit(null);
  };

  const handleTemplateClick = (template: InvoiceExtractTemplate) => {
    if (selectedTemplate?.name === template.name) {
      setTemplateToEdit(template);
      setIsEditModalOpen(true);
    } else {
      selectTemplate(template);
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Templates</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Template
        </Button>
      </Box>

      <List>
        {templates.map((template) => (
          <ListItem
            key={template.name}
            disablePadding
            sx={{
              cursor: 'pointer',
              bgcolor:
                selectedTemplate?.name === template.name
                  ? 'action.selected'
                  : 'inherit'
            }}
            onClick={() => handleTemplateClick(template)}
          >
            <ListItemText
              primary={template.name}
              secondary={template.description}
            />
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={(e) => {
                e.stopPropagation();
                deleteTemplate(template);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {templates.length === 0 && (
        <Typography variant="body2" color="text.secondary" align="center">
          No templates yet. Create one to get started.
        </Typography>
      )}

      <TemplateCreatorModal
        open={isCreateModalOpen}
        close={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTemplate}
        selectedTemplate={null}
      />

      <TemplateCreatorModal
        open={isEditModalOpen}
        close={() => {
          setIsEditModalOpen(false);
          setTemplateToEdit(null);
        }}
        onSubmit={handleEditTemplate}
        selectedTemplate={templateToEdit}
      />
    </Box>
  );
};

export default TemplateManagement;
