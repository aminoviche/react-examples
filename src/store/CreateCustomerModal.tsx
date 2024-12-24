import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
} from "@mui/material";
import { CustomerRequest } from "../services/CustomerService/models/index";

interface CreateCustomerModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (newCustomer: CustomerRequest) => void;
}

const CreateCustomerModal: React.FC<CreateCustomerModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [customer, setCustomer] = useState<CustomerRequest>({
    firstname: "",
    lastname: "",
    email: "",
    address: { street: "", houseNumber: "", zipCode: "" },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const handleSubmit = () => {
    onSubmit(customer);
    onClose(); // Close the modal after submitting
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Create Customer</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              name="firstname"
              fullWidth
              value={customer.firstname}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="lastname"
              fullWidth
              value={customer.lastname}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={customer.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Street"
              name="street"
              fullWidth
              value={customer.address?.street || ""}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="House Number"
              name="houseNumber"
              fullWidth
              value={customer.address?.houseNumber || ""}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Postal Code"
              name="zipCode"
              fullWidth
              value={customer.address?.zipCode || ""}
              onChange={handleAddressChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCustomerModal;
