import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { CustomerValidation } from './Customer.validation';
import { CustomerController } from './Customer.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(CustomerValidation.createCustomerValidationSchema),
  CustomerController.createCustomer,
);
router.get('/', CustomerController.getAllCustomers);
router.get('/:id', CustomerController.findeCustomerById);
router.patch('/:id', CustomerController.updateCustomerById);
router.delete('/:id', CustomerController.deleteCustomerById);

export const CustomerRouter = router;
