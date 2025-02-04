import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CustomerService from '../../services/CustomerService/CustomerService';
import CreateCustomerModal from './CreateCustomerModal';
import { useContext } from 'react';
import { AppContext } from '../../context/AppProvider';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const customerService = new CustomerService();
 // const { state, setState, toggleTheme} = useContext(AppContext); 


  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const customers = await customerService.fetchAllCustomers();
      setCustomers(customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Handle adding or updating a customer
  const handleAddCustomer = async (customerRequest) => {
    try {
      setLoading(true);
      if (customerRequest.id) {
        const updateCustomerRequest = {
          id: customerRequest.id,
          firstname: customerRequest.firstname,
          lastname: customerRequest.lastname,
          email: customerRequest.email,
          address: {
            street: "",
            houseNumber: "",
            zipCode: "",
          },
        };
      
        await customerService.updateCustomer({
          customerRequest: updateCustomerRequest, // Pass the customer request
        });
        console.log(`Customer updated successfully with ID: ${customerRequest.id}`);
      } else {
        await customerService.createCustomer(customerRequest);
        console.log('Customer created successfully.');
      }
      fetchCustomers();
    } catch (error) {
      console.error('Failed to add/update customer:', error);
    } finally {
      setOpenModal(false);
      setLoading(false);
    }
  };

  // Handle deleting a customer
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;
    try {
      setLoading(true);
      await customerService.deleteCustomer({ customerId: id });
      setCustomers((prev) => prev.filter((customer) => customer.id !== id));
      console.log(`Customer with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting customer with ID ${id}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const fillModal = (editedCustomer) => {
    setCustomerToEdit(editedCustomer);
    setOpenModal(true);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstname', headerName: 'First Name', width: 200 },
    { field: 'lastname', headerName: 'Last Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 500,
      renderCell: (params) => (
        <>
          <Button variant="contained" onClick={() => fillModal(params.row)}>
            EDIT
          </Button>
          <Button variant="contained" color="error" onClick={() => handleDelete(params.row.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];


  //console.log(state);
  return (
    <>
      <Button   className='dark' variant="contained" onClick={() => setOpenModal(true)} style={{ marginBottom: '16px' }}>
        Add New Customer
      </Button>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={customers}
          columns={columns}
          loading={loading}
          pageSize={5}
          disableRowSelectionOnClick
        />
      </Box>
      {openModal && (
        <CreateCustomerModal
          customerToEdit={customerToEdit}
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={handleAddCustomer}
        />
      )}
    </>
  );
};

export default Customers;