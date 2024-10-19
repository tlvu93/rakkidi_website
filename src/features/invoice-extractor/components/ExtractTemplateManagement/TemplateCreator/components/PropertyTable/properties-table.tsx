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
import Toolbar from './PropertyTableToolbar';
import { ExtractionField } from 'features/invoice-extractor/interfaces';
import { useCallback, useMemo } from 'react';

type CustomRenderCellParams = GridRenderCellParams<
  Partial<ExtractionField>,
  string | number,
  string
>;

export default function PropertiesTable() {
  const { template, deleteExtractionField, updateExtractionField } =
    useTemplate();

  const rows = useMemo(
    () =>
      template.extractionFields.map((field) => ({
        id: field.id,
        name: field.name,
        page: field.page || 1
      })),
    [template.extractionFields]
  );

  const handleDeleteClick = useCallback(
    (id: string) => {
      deleteExtractionField(id);
    },
    [deleteExtractionField]
  );

  const handleUpdateRow = useCallback(
    (data: Partial<ExtractionField>) => {
      updateExtractionField(data);
      return data;
    },
    [updateExtractionField]
  );

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Name',
        width: 100,
        renderCell: (params: CustomRenderCellParams) => (
          <div>{params.value}</div>
        )
      },
      {
        field: 'page',
        headerName: 'Page',
        type: 'number',
        width: 100,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params: CustomRenderCellParams) => (
          <div>{params.value}</div>
        )
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
    ],
    [handleDeleteClick]
  );

  return (
    <Box
      sx={{
        height: '100%',
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
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            }
          }
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        disableColumnSorting
        disableColumnMenu
        sx={{
          '& .MuiDataGrid-footerContainer': {
            justifyContent: 'center'
          }
        }}
      />
    </Box>
  );
}
