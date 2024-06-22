import { ICustomer } from './Customer.interface';
import { Customer } from './Customer.modal';

const createCustomer = async (CustomerService: ICustomer) => {
  return await Customer.create(CustomerService);
};

const findeCustomerById = async (CustomerId: string) => {
  return await Customer.findById(CustomerId);
};

const getAllCustomers = async () => {
  return await Customer.find();
};

const updateCustomerById = async (
  CustomerId: string,
  payload: Partial<ICustomer>,
) => {
  const result = await Customer.findByIdAndUpdate(CustomerId, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCustomerById = async (CustomerId: string) => {
  const result = await Customer.findByIdAndDelete(CustomerId);

  return result;
};

export const ServiceOfCustomer = {
  createCustomer,
  getAllCustomers,
  updateCustomerById,
  deleteCustomerById,
  findeCustomerById,
};
