import React from 'react';
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState  } from 'react';
import useFetch from '../hooks/useFetch';
import { CustomerControllerApi} from '../services/CustomerService/apis/CustomerControllerApi';
import { CustomerRequest } from '../services/CustomerService/models/index'; // Adjust path for the CustomerRequest model



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
   
     const [customersFiltred, setCustomersFiltred] = useState([]);
    
        useEffect(() => {
            const fetchCustomers = async () => {
              try {
                const customerApi = new CustomerControllerApi();
                const response = await customerApi.findAll();
                setCustomersFiltred(response);
              } catch (error) {
                console.error('Error fetching customers:', error);
              }
            };
        
            fetchCustomers();

          }, []);

          // Fetch customer details by ID
        useEffect(() => {
            const customerId= 1;
              const fetchCustomerById = async () => {
            try {
                const customerApi = new CustomerControllerApi();  // Initialize the API
                const response = await customerApi.findById({ customerId });  // Call findById method
                //setCustomer(response);  // Set the customer data
                console.log(response);
            } catch (err) {
                //setError('Failed to fetch customer data');
                console.error(err);
            } finally {
               // setLoading(false);  // Set loading to false when done
            }
        };

        if (customerId) {
            fetchCustomerById();
        }
    }, []); // Dependency array to refetch when customerId changes

 /*   if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!customer) {
        return <div>No customer found</div>;
    }
*/
useEffect(() => {
    // Define an async function inside the useEffect hook
    const createCustomer = async () => {
        const customerRequest: CustomerRequest = {
            firstname: 'firstName',
            lastname: 'lastName',
            email: 'email@a.com',
        };

        try {
            const customerApi = new CustomerControllerApi(); // Initialize API
            const response = await customerApi.createCustomer({
                customerRequest,  // Pass the request body
            });
            console.log(`Customer created successfully with ID: ${response}`)
            //setSuccess(`Customer created successfully with ID: ${response}`);
        } catch (err) {
           // setError('Failed to create customer');
            console.error(err);
        }
    };

    // Call the function
    createCustomer();
}, []);  // Empty dependency array means this will run once when the component mounts






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