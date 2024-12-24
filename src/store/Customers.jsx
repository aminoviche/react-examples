import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CustomerControllerApi } from '../services/CustomerService/apis/CustomerControllerApi';
import { CustomerRequest } from '../services/CustomerService/models/index';
import CreateCustomerModal from './CreateCustomerModal';
import CustomerService from '../services/CustomerService/CustomerService';
const customersService = new CustomerService();

const Customers = () => {
  const [customersFiltered, setCustomersFiltred] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [shouldFetchCustomers, setShouldFetchCustomers] = useState(false);

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      const customers = await customersService.fetchAllCustomers();
      setCustomersFiltred(customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  // Fetch customer details by ID
  const fetchCustomerById = async (customerId: string) => {
    try {
      const customer = await customersService.fetchCustomerById(customerId);
      console.log(customer);
    } catch (error) {
      console.error('Error fetching customer by ID:', error);
    }
  };
  useEffect(() => {
    fetchCustomers();
    setShouldFetchCustomers(false); // Reset the state after fetching
  }, [shouldFetchCustomers]);

  // Fetch customer details by ID
  useEffect(() => {
    const customerId ='2';
    fetchCustomerById(customerId);
  }, []);

  // Handle adding a new customer
  const handleAddCustomer = async (newCustomer: CustomerRequest) => {
    try {
      const customerApi = new CustomerControllerApi();
      const response = await customerApi.createCustomer({
        customerRequest: newCustomer, // Pass the customer request
      });
      setShouldFetchCustomers(true); // Trigger a refresh of the customer list
      console.log(`Customer created successfully with ID: ${response}`);
    } catch (err) {
      console.error('Failed to create customer:', err);
    }
  };

  // Handle deleting a customer
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

  // Data grid columns definition
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstname', headerName: 'First Name', width: 200 },
    { field: 'lastname', headerName: 'Last Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      {/* Button to open modal */}
      <Button variant="contained" onClick={() => setOpenModal(true)} style={{ marginBottom: '16px' }}>
        Add New Customer
      </Button>

      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={customersFiltered}
          columns={columns}
          pagination
          pageSize={5}
          pageSizeOptions={[5]}
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
};

export default Customers;
