import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState  } from 'react';

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
  {
    field: 'image',
    headerName: 'Image',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 100,
    renderCell: (params) => <img width={50} src={params.value} />
  },
];
export default function ProductList() {
  const [productList, setProductList] = useState([]);
  

  useEffect(()=>{
      fetch('https://fakestoreapi.com/products')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject('Error');
      })
      .then((response) => setProductList(response))
      .catch((error) => setErrors(error));
      console.log(productList);

  }, []);

  return (
    <>
    <h1>Product List </h1>
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={productList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        //checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    </>
  );
}

