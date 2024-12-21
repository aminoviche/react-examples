import React from 'react';
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState  } from 'react';
import useFetch from '../hooks/useFetch';

const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstname', headerName: 'firstname', width: 150, editable: false,
    },
    {
      field: 'lastname', headerName: 'lastname', width: 500, editable: false,
    },
    {
      field: 'email',
      headerName: 'email',
      type: 'number',
      width: 50,
      editable: false,
    }
  ];

export default function Customers (){

        const { data: customers} = useFetch('http://localhost:8090/api/v1/customers');
        const [customersFiltred, setCustomersFiltred] = useState([]);
       
        useEffect(() => {
          setCustomersFiltred(customers);
          console.log(customers);
        }, [customers]);
      


        return (
        <>
            <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={customersFiltred}
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