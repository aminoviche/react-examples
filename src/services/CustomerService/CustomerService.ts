import { CustomerControllerApi, UpdateCustomerRequest } from './api/apis/CustomerControllerApi';
import { CustomerRequest } from './api/models/index';

export class CustomerService {
  private customerApi: CustomerControllerApi;

  constructor() {
    this.customerApi = new CustomerControllerApi();
  }

  // Fetch all customers
  async fetchAllCustomers() {
    try {
      const response = await this.customerApi.findAll();
      return response; // Return the customer data
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }

  // Fetch a single customer by ID
  async fetchCustomerById(customerId: string) {
    try {
      const response = await this.customerApi.findById({ customerId });
      return response; // Return the customer data
    } catch (error) {
      console.error('Error fetching customer by ID:', error);
      throw error;
    }
  }

  // Create a new customer
  async createCustomer(customerRequest: CustomerRequest) {
    try {
      const response = await this.customerApi.createCustomer({ customerRequest });
      return response; // Return the newly created customer data
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  }

    // Create a new customer
    async updateCustomer(updateCustomerRequest: UpdateCustomerRequest) {
        try {
          const response = await this.customerApi.updateCustomer(updateCustomerRequest);
          return response; // Return the newly created customer data
        } catch (error) {
          console.error('Error updating customer:', error);
          throw error;
        }
      }
    

  // Delete a customer by ID
  async deleteCustomer(customerId: string) {
    try {
      await this.customerApi._delete({ customerId });
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  }
}

export default CustomerService;  // <-- Use default export