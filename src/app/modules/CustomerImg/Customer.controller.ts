import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ServiceOfCustomer } from './Customer.service';


const createCustomer = catchAsync(async (req, res) => {
  const result = await ServiceOfCustomer.createCustomer(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Service created Successfully',
    data: result,
  });
});

const findeCustomerById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceOfCustomer.findeCustomerById(id);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Successfully retrive single Customer',
    success: true,
    data: result,
  });
});

const getAllCustomers = catchAsync(async (req, res) => {
  const result = await ServiceOfCustomer.getAllCustomers();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Successfully retrived All Customer',
    success: true,
    data: result,
  });
});

const updateCustomerById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceOfCustomer.updateCustomerById(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully update Service',
    data: result,
  });
});
const deleteCustomerById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceOfCustomer.deleteCustomerById(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully update Service',
    data: result,
  });
});

export const CustomerController = {
  createCustomer,
  getAllCustomers,
  findeCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
