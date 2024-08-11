import * as React from 'react';
import Box from '@mui/material/Box';

import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowEditStopReasons,
  GridSlots
} from '@mui/x-data-grid';
import { useTemplate } from '../../context/TemplateContext';
import { Toolbar } from './toolbar';

export default function PropertiesTable() {
  const { template, updateExtractionFields, deleteExtractionField } =
    useTemplate(); // Get the template and update function from context
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const rows = template.extractionFields.map((field, index) => ({
    id: index + 1,
    name: field.name,
    page: 1
  }));

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    console.log(id);
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
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

      renderCell: (params) => (
        <Box display="flex" justifyContent="flex-end" width="100%">
          <GridActionsCellItem
            key={`delete-${params.id}`}
            icon={<DeleteIcon sx={{ fontSize: '1.2rem' }} />}
            label="Delete"
            onClick={handleDeleteClick(params.id)}
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
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        slots={{
          toolbar: Toolbar as GridSlots['toolbar']
        }}
      />
    </Box>
  );
}
