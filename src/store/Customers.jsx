import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState  } from 'react';
import { CustomerControllerApi} from '../services/CustomerService/apis/CustomerControllerApi';
import { CustomerRequest } from '../services/CustomerService/models/index'; 
import  CreateCustomerModal  from './CreateCustomerModal'; 



export default function Customers (){
     const [customersFiltred, setCustomersFiltred] = useState([]);
     const [openModal, setOpenModal] = useState(false);
     const [fetchCustomers, setFetchCustomers] = useState(false);

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
            setFetchCustomers(false);
          }, [fetchCustomers]);

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

const handleAddCustomer= async (newCustomer) => {

  try {
    console.log(newCustomer);
    const customerRequest: CustomerRequest = newCustomer

    const customerApi = new CustomerControllerApi(); // Initialize API
    const response = await customerApi.createCustomer({
      customerRequest,  // Pass the request body
    });
    setFetchCustomers(true);
    console.log(`Customer created successfully with ID: ${response}`)
    //setSuccess(`Customer created successfully with ID: ${response}`);
} catch (err) {
   // setError('Failed to create customer');
    console.error(err);
}
};

 // Delete customer
 const handleDelete = async (id: number) => {
  try {
    const customerApi = new CustomerControllerApi();
    await customerApi._delete({ customerId: id });
    setCustomersFiltred((prev) => prev.filter((customer) => customer.id !== id));
    console.log(`Customer with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting customer with ID ${id}:`, error);
  }
};

/** 
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
*/

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 400 },
  {field: 'firstname', headerName: 'firstname', width: 200, editable: false,},
  {field: 'lastname', headerName: 'lastname', width: 200, editable: false,},
  {field: 'email', headerName: 'email', width: 200, editable: false},
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="error"
        onClick={() => handleDelete(params.row.id)}
      >
        Delete
      </Button>
    )}

];



return (
  <> 
      {/* Button to Open Modal */}
      <Button variant="contained" onClick={() => setOpenModal(true)} style={{ marginBottom: '16px' }}>
          Add New Customer
        </Button>

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
     {/* Create Customer Modal */}
     {openModal && (
        <CreateCustomerModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={(newCustomer) => {
            handleAddCustomer(newCustomer);
            setOpenModal(false);
          }}
        />
      )}

  </>
        );
}