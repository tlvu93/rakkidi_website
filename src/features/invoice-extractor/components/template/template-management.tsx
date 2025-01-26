import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { useTemplateManagement } from '../../contexts/template-management-context';
import { InvoiceExtractTemplate } from '../../interfaces';

const TemplateManagement = (): React.ReactElement => {
  const {
    templates,
    selectedTemplate,
    selectTemplate,
    deleteTemplate,
    addTemplate,
    updateTemplate,
    isLoading
  } = useTemplateManagement();

  const router = useRouter();

  const handleCreateClick = () => {
    router.push('/invoice-extractor/template/new');
  };

  const handleEditClick = (template: InvoiceExtractTemplate) => {
    router.push(
      `/invoice-extractor/template/${encodeURIComponent(template.name)}`
    );
  };

  const handleTemplateClick = (template: InvoiceExtractTemplate): void => {
    selectTemplate(template);
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
        <Button variant="contained" color="primary" onClick={handleCreateClick}>
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
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(template);
                  }}
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
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
              </>
            }
          >
            <ListItemText
              primary={template.name}
              secondary={template.description}
            />
          </ListItem>
        ))}
      </List>

      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : templates.length === 0 ? (
        <Typography variant="body2" color="text.secondary" align="center">
          No templates yet. Create one to get started.
        </Typography>
      ) : null}
    </Box>
  );
};

export default TemplateManagement;
