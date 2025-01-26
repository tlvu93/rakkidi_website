import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridSlots,
  GridRenderCellParams
} from '@mui/x-data-grid';
import { TextContent } from 'pdfjs-dist/types/src/display/api';
import * as React from 'react';
import { useCallback, useMemo } from 'react';

declare global {
  interface Window {
    __pdfTextContent: TextContent | undefined;
  }
}

import { useTemplate } from 'features/pdf-extractor';
import {
  ExtractionField,
  ExtractionFieldType
} from 'features/pdf-extractor/interfaces';

import Toolbar from './PropertyTableToolbar';

interface FieldRow {
  id: string;
  name: string;
  page: number;
  type: ExtractionFieldType;
  keyword?: string;
  searchDirection?: 'right' | 'below';
  maxDistance?: number;
  extractedText?: string;
}

type CustomRenderCellParams = GridRenderCellParams<FieldRow, string | number>;

export default function PropertiesTable(): React.ReactElement {
  const {
    template,
    extractedText,
    deleteExtractionField,
    updateExtractionField,
    updateExtractedText
  } = useTemplate();

  const rows = useMemo<FieldRow[]>(
    () =>
      template.extractionFields.map((field) => ({
        id: field.id,
        name: field.name,
        page: field.page || 1,
        type: field.type,
        ...(field.type === ExtractionFieldType.Keyword && {
          keyword: field.keyword,
          searchDirection: field.searchDirection,
          maxDistance: field.maxDistance
        }),
        extractedText: extractedText[field.name] || ''
      })),
    [template.extractionFields, extractedText]
  );

  const handleDeleteClick = useCallback(
    (id: string): void => {
      deleteExtractionField(id);
    },
    [deleteExtractionField]
  );

  const handleUpdateRow = useCallback(
    (data: FieldRow): FieldRow => {
      const updateData: Partial<ExtractionField> = {
        id: data.id,
        name: data.name,
        page: data.page
      };

      if (data.type === ExtractionFieldType.Keyword) {
        Object.assign(updateData, {
          keyword: data.keyword,
          searchDirection: data.searchDirection,
          maxDistance: data.maxDistance
        });
      }

      updateExtractionField(updateData);

      // Re-extract text after field update
      const textContent = window.__pdfTextContent;
      if (textContent) {
        // Let the context compute extraction from current template state
        updateExtractedText(textContent);
      }

      return data;
    },
    [updateExtractionField, updateExtractedText]
  );

  const columns = useMemo<GridColDef<FieldRow>[]>(
    () => [
      {
        field: 'name',
        headerName: 'Name',
        editable: true,
        flex: 1
      },
      {
        field: 'type',
        headerName: 'Type',
        width: 100,
        renderCell: (params: CustomRenderCellParams): string =>
          params.value === ExtractionFieldType.Rectangle
            ? 'Rectangle'
            : 'Keyword'
      },
      {
        field: 'page',
        headerName: 'Page',
        type: 'number',
        width: 70,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params: CustomRenderCellParams): string | number =>
          params.value ?? 1
      },
      {
        field: 'keyword',
        headerName: 'Keyword',
        width: 120,
        editable: true,
        renderCell: (params: CustomRenderCellParams): string =>
          params.row.type === ExtractionFieldType.Keyword
            ? (params.value as string)
            : '-'
      },
      {
        field: 'searchDirection',
        headerName: 'Direction',
        width: 100,
        editable: true,
        type: 'singleSelect',
        valueOptions: ['right', 'below'],
        renderCell: (params: CustomRenderCellParams): string =>
          params.row.type === ExtractionFieldType.Keyword
            ? (params.value as string)
            : '-'
      },
      {
        field: 'maxDistance',
        headerName: 'Max Distance',
        type: 'number',
        width: 100,
        editable: true,
        renderCell: (params: CustomRenderCellParams): string | number =>
          params.row.type === ExtractionFieldType.Keyword
            ? params.value ?? 200
            : '-',
        renderEditCell: (params): React.ReactElement => (
          <TextField
            type="number"
            value={params.value ?? 200}
            onChange={(e) => {
              const value = Number(e.target.value);
              params.api.setEditCellValue(
                {
                  id: params.id,
                  field: params.field,
                  value: value
                },
                true
              );
            }}
            inputProps={{
              step: 50,
              min: 0,
              style: {
                padding: '0 16px',
                height: '100%'
              }
            }}
            variant="standard"
            sx={{
              width: '100%',
              '& .MuiInput-root': {
                height: '100%'
              },
              '& .MuiInput-input': {
                height: '100%',
                '&::-webkit-inner-spin-button': {
                  opacity: 1,
                  marginLeft: '8px'
                }
              }
            }}
          />
        )
      },
      {
        field: 'extractedText',
        headerName: 'Extracted Text',
        width: 200,
        renderCell: (params: CustomRenderCellParams): string =>
          String(params.value || '-')
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        cellClassName: 'actions',
        headerAlign: 'right',
        flex: 1,
        renderCell: (
          params: GridRenderCellParams<FieldRow>
        ): React.ReactElement => (
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
        },
        '& .MuiDataGrid-footerContainer': {
          justifyContent: 'center'
        },
        '& .MuiDataGrid-cell': {
          padding: '0 16px'
        },
        '& .MuiDataGrid-cell:focus': {
          outline: 'none'
        },
        '& .MuiDataGrid-cell.Mui-selected': {
          padding: '0 16px'
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
      />
    </Box>
  );
}
