import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'Title',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'category',
    headerName: 'Category',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160
  },
];
export default function ProductList() {
  const rows  = [
    { id: 1, title: "Item 1", description: "This is item 1", price: 10.99, category: "Category A" },
    { id: 2, title: "Item 2", description: "This is item 2", price: 20.49, category: "Category B" },
    { id: 3, title: "Item 3", description: "This is item 3", price: 15.99, category: "Category C" },
    { id: 4, title: "Item 4", description: "This is item 4", price: 5.99, category: "Category A" } ,
  ];
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

