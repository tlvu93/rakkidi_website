import * as React from 'react';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridSlots,
  GridRenderCellParams
} from '@mui/x-data-grid';
import { useTemplate } from '../../context/TemplateContext';
import Toolbar from './toolbar';
import { ExtractionField } from 'features/invoice-extractor/interfaces';

type CustomRenderCellParams = GridRenderCellParams<
  Partial<ExtractionField>,
  string | number,
  string
>;

export default function PropertiesTable() {
  const { template, deleteExtractionField, updateExtractionField } =
    useTemplate();

  const rows = template.extractionFields.map((field) => ({
    id: field.id,
    name: field.name,
    page: field.page || 1
  }));

  const handleDeleteClick = (id: string) => {
    deleteExtractionField(id);
  };

  const handleUpdateRow = (data: Partial<ExtractionField>) => {
    updateExtractionField(data);
    return data;
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', editable: true, width: 100 },
    {
      field: 'page',
      headerName: 'Page',
      type: 'number',
      editable: true,
      width: 100
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      cellClassName: 'actions',
      headerAlign: 'right',
      flex: 1,
      renderCell: (params: CustomRenderCellParams) => (
        <Box display="flex" justifyContent="flex-end" width="100%">
          <GridActionsCellItem
            key={`delete-${params.id}`}
            icon={<DeleteIcon sx={{ fontSize: '1.2rem' }} />}
            label="Delete"
            onClick={() => handleDeleteClick(params.row.id as string)}
            color="inherit"
          />
        </Box>
      )
    }
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary'
        },
        '& .textPrimary': {
          color: 'text.primary'
        }
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        processRowUpdate={handleUpdateRow}
        slots={{
          toolbar: Toolbar as GridSlots['toolbar']
        }}
      />
    </Box>
  );
}
